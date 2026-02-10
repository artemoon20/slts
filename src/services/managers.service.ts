import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { BASE_API_URL } from '../shared/constants/app-constants';
import { ResponseModel } from '../shared/types';

import { ManagerModel } from '../models/user-model';
import { ManagerFormModel } from '../models/manager-form.model';

@Injectable({
  providedIn: 'root'
})
export class ManagersService {
  constructor(private http: HttpClient) {}

  fetchAllManagers() {
    return this.http.get<ResponseModel<ManagerModel[]>>(`${BASE_API_URL}/managers`).pipe(
      catchError(error => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  fetchManagerById(managerId: string) {
    return this.http.get<ResponseModel<ManagerModel>>(`${BASE_API_URL}/managers/${managerId}`).pipe(
      catchError(error => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  createManager(managerData: Partial<ManagerFormModel>) {
    console.log(managerData);

    return this.http
      .post<ResponseModel<ManagerModel>>(`${BASE_API_URL}/managers`, managerData)
      .pipe(
        catchError(error => {
          return throwError(() => new Error(error.message));
        })
      );
  }

  updateManager(managerId: string, managerData: Partial<ManagerFormModel>) {
    return this.http
      .put<ResponseModel<ManagerModel>>(`${BASE_API_URL}/managers/${managerId}`, managerData)
      .pipe(
        catchError(error => {
          return throwError(() => new Error(error.message));
        })
      );
  }

  deleteManager(managerId: string) {
    return this.http.delete<ResponseModel<void>>(`${BASE_API_URL}/managers/${managerId}`).pipe(
      catchError(error => {
        return throwError(() => new Error(error.message));
      })
    );
  }
}
