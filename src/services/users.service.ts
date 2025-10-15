import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BASE_API_URL } from '../shared/constants/app-constants';
import { ResponseModel } from '../shared/types';

import UserModel from '../models/user-model';
import { CreateClientRequest } from '../models/client-form.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<ResponseModel<UserModel[]>>(`${BASE_API_URL}/users/get-all-clients`);
  }

  getUserById(userId: string) {
    return this.http.get<ResponseModel<UserModel>>(`${BASE_API_URL}/users/get-client/${userId}`);
  }

  createClient(clientData: CreateClientRequest) {
    return this.http.post<ResponseModel<UserModel>>(`${BASE_API_URL}/users/create-client`, clientData);
  }
}
