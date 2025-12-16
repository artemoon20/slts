import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { BASE_API_URL } from '../shared/constants/app-constants';
import { ResponseModel } from '../shared/types';

import UserModel from '../models/user-model';
import { CreateClientRequest, ClientFormModel } from '../models/client-form.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  constructor(private http: HttpClient) {}

  fetchAllClients() {
    return this.http.get<ResponseModel<UserModel[]>>(`${BASE_API_URL}/clients/get/all`);
  }

  fetchClientById(clientId: string) {
    return this.http.get<ResponseModel<UserModel>>(`${BASE_API_URL}/clients/get/${clientId}`);
  }

  createClient(clientData: Partial<ClientFormModel>) {
    const payload = this.transformToBackendFormat(clientData);
    return this.http.post<ResponseModel<UserModel>>(`${BASE_API_URL}/clients/create`, payload);
  }

  updateClient(clientId: string, clientData: Partial<ClientFormModel>) {
    const payload = this.transformToBackendFormat(clientData);
    return this.http
      .put<ResponseModel<UserModel>>(`${BASE_API_URL}/clients/update/${clientId}`, payload)
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

  private transformToBackendFormat(
    formData: Partial<ClientFormModel>
  ): Partial<CreateClientRequest> {
    const payload: Partial<CreateClientRequest> = {};

    if (formData.firstName !== undefined) payload.first_name = formData.firstName;
    if (formData.lastName !== undefined) payload.last_name = formData.lastName || null;
    if (formData.phone !== undefined) payload.phone = formData.phone || null;
    if (formData.email !== undefined) payload.email = formData.email || null;
    if (formData.birthday !== undefined) payload.birthday = formData.birthday || null;
    if (formData.address !== undefined) payload.address = formData.address || null;
    if (formData.status !== undefined) payload.status = formData.status;
    if (formData.gender !== undefined) payload.gender = formData.gender || null;
    if (formData.source !== undefined) payload.source = formData.source || null;
    if (formData.priority !== undefined) payload.priority = formData.priority;
    if (formData.notes !== undefined) payload.notes = formData.notes || null;
    if (formData.managerId !== undefined) payload.manager_id = formData.managerId || null;

    return payload;
  }
}
