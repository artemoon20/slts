import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationMessage, NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  message: string | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notification$.subscribe((msg: NotificationMessage) => {
      this.message = msg.message;

      setTimeout(() => this.message = null, 3000);
    });
  }
}