import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { BASE_API_URL } from '../shared/constants/app-constants';
import { ResponseModel } from '../shared/types';

import ClientModel from '../models/user-model';
import { ClientFormModel } from '../models/client-form.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  constructor(private http: HttpClient) {}

  fetchAllClients() {
    return this.http.get<ResponseModel<ClientModel[]>>(`${BASE_API_URL}/clients`);
  }

  fetchClientById(clientId: string) {
    return this.http.get<ResponseModel<ClientModel>>(`${BASE_API_URL}/clients/${clientId}`);
  }

  createClient(clientData: Partial<ClientFormModel>) {
    return this.http.post<ResponseModel<ClientModel>>(`${BASE_API_URL}/clients/create`, clientData);
  }

  updateClient(clientId: string, clientData: Partial<ClientFormModel>) {
    return this.http
      .put<ResponseModel<ClientModel>>(`${BASE_API_URL}/clients/update/${clientId}`, clientData)
      .pipe(
        catchError(error => {
          return throwError(() => new Error(error.message));
        })
      );
  }

  deleteClient(clientId: string) {
    return this.http.delete<ResponseModel<void>>(`${BASE_API_URL}/clients/delete/${clientId}`).pipe(
      catchError(error => {
        return throwError(() => new Error(error.message));
      })
    );
  }
}
