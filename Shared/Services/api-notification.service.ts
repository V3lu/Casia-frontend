import { Injectable, signal } from '@angular/core';
import { MessageService } from 'primeng/api';

export interface AppNotification {
  severity: 'success' | 'info' | 'warn' | 'error';
  summary: string;
  detail: string;
}

@Injectable({ providedIn: 'root' })
export class ApiNotificationService {
  private readonly notifications = signal<AppNotification[]>([]);
  readonly messages = this.notifications.asReadonly();

  constructor(private readonly messageService: MessageService) {}

  success(summary: string, detail: string): void {
    this.show({ severity: 'success', summary, detail });
  }

  error(summary: string, detail: string): void {
    this.show({ severity: 'error', summary, detail });
  }

  private show(notification: AppNotification): void {
    this.notifications.update((items) => [...items, notification]);
    this.messageService.add(notification);
  }
}