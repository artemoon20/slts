import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface NotificationMessage {
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<NotificationMessage>();

  notification$ = this.notificationSubject.asObservable();

  show(message: string) {
    this.notificationSubject.next({ message, type: 'info' });
  }

  showSuccess(message: string) {
    this.notificationSubject.next({ message, type: 'success' });
  }

  showError(message: string) {
    this.notificationSubject.next({ message, type: 'error' });
  }
}
