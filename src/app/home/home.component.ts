import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  name: string;
  message: string;
  constructor(public auth: AuthService, public chat: ChatService) {
    auth.isLoggingIn = false;
  }
  onMessageSend(form){
    console.log('form submit: ', form);
    this.chat.items$.push(form);
    this.message = '';
  }
  removeChat(chat_key){
    this.chat.items$.remove(chat_key);
  }
}
