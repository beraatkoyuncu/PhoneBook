import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Phone } from 'src/app/models/phone';
import { PhoneService } from 'src/app/services/phone.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css'],
})
export class PhoneComponent implements OnInit {
  phones: Phone[] = [];
  dataLoaded = false;
  phoneAddForm: FormGroup;
  currentPhone: Phone;

  constructor(
    private formBuilder: FormBuilder,
    private phoneService: PhoneService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getPhones();
    this.createPhoneAddForm();
  }

  getPhones() {
    this.phoneService.getPhones().subscribe((response) => {
      this.phones = response.data;
      this.dataLoaded = true;
    });
  }

  getPhone(phone: Phone) {
    this.currentPhone = phone;
  }

  createPhoneAddForm() {
    this.phoneAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  add() {
    if (this.phoneAddForm.valid) {
      let phoneModel = Object.assign({}, this.phoneAddForm.value);
      this.phoneService.add(phoneModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
    window.location.reload();
  }

  // deletePhone() {
  //   this.phoneService.delete().subscribe((response) => {
  //     this.toastrService.success(response.message, 'Başarılı');
  //   });
  //   window.location.reload();
  // }
}
