import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { BASE_API_URL } from '../shared/constants/app-constants';
import { ResponseModel } from '../shared/types';

import UserModel from '../models/user-model';
import { CreateClientRequest } from '../models/client-form.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  fetchAllClients() {
    return this.http.get<ResponseModel<UserModel[]>>(`${BASE_API_URL}/clients/get/all`);
  }

  fetchClientById(clientId: string) {
    return this.http.get<ResponseModel<UserModel>>(`${BASE_API_URL}/clients/get/${clientId}`);
  }

  createClient(clientData: CreateClientRequest) {
    return this.http.post<ResponseModel<UserModel>>(`${BASE_API_URL}/clients/create`, clientData);
  }

  updateClient(clientId: string, clientData: CreateClientRequest) {
    return this.http.put<ResponseModel<UserModel>>(`${BASE_API_URL}/clients/update/${clientId}`, clientData).pipe(
      catchError((error) => {
        return throwError(() => new Error(error.message));
      })
    );
  }
}
