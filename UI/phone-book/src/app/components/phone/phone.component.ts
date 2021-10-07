import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Phone } from 'src/app/models/phone';
import { PhoneAddModel } from 'src/app/models/phoneAddModel';
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
  currentPhone: object;
  phoneUpdateForm: FormGroup;
  phoneAddModel:any;
  

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

  createPhoneAddForm() {
    this.phoneAddForm = this.formBuilder.group({
      id:[''],
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  addPhone() {
    if (this.phoneAddForm.valid) {
      let phoneModel = Object.assign({}, this.phoneAddForm.value);
      console.log(phoneModel.id)
      console.log(phoneModel.id=='')

      if (phoneModel.id=='') {
        this.phoneAddModel={name:phoneModel.name,phoneNumber:phoneModel.phoneNumber};
        // console.log(this.phoneAddModel)
        // console.log("add")
        // console.log(this.phoneAddModel)
        this.phoneService.add(this.phoneAddModel).subscribe(
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
            }else {
              this.toastrService.error('Formunuz eksik', 'Dikkat');
            }
          }
        );
      } 
      else {
        // console.log("update")
        // console.log(phoneModel)
        this.phoneService.update(phoneModel).subscribe(
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
            }else {
              this.toastrService.error('Formunuz eksik', 'Dikkat');
            }
          }
        );
      }
    } 
    
    window.location.reload();
  }

  updatePhone(row: Data) {
    let currentPhone = Object.assign({}, row.data);
    // console.log(currentPhone.id);
    this.phoneAddForm.setValue({
      id:currentPhone.id,
      name: currentPhone.name,
      phoneNumber: currentPhone.phoneNumber,
    });
  }

  deletePhone(row: Data) {
    this.phoneService.delete(row.data).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
    });
    window.location.reload();
  }
}
