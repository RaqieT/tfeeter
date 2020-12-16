import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: string[] = [];
  constructor(private toastr: ToastrService) {}


  add(message: string) {
    this.messages.push(message);
    this.toastr.info('Info', message);
  }

  error(message: string) {
    this.messages.push(message);
    this.toastr.error('Error', message);
  }

  clear() {
    this.messages = [];
  }
}
