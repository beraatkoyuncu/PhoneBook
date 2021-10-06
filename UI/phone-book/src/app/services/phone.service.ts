import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/list-response-model';
import { Phone } from '../models/phone';
import { ResponseModel } from '../models/response-model';


@Injectable({
  providedIn: 'root'
})
export class PhoneService {
  apiUrl = "https://localhost:44317/api/";

  constructor(private httpClient: HttpClient) {}

  getPhones() : Observable<ListResponseModel<Phone>>{
    let newPath = this.apiUrl + "phones/getall"
    return this.httpClient.get<ListResponseModel<Phone>>(newPath);
  }

  add(phone:Phone):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"phones/add",phone)
  }

  update(phone:Phone):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"phones/update",phone)
  }

  delete(phone:Phone):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"phones/delete",phone)
  }

}
