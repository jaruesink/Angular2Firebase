import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class ChatService {
  chat_list: Array<any>;
  chat_list$: Observable<any>;
  chat_sender_info$: any = {};
  items$: FirebaseListObservable<any>;
  constructor(public af: AngularFire) {
    this.items$ = af.database.list('/items', {
      query: { limitToLast: 15, orderByKey: true}
    });
    this.chat_list$ = this.items$.map(chats => {
      console.log('chat list updated: ', chats);
      chats.map(chat => {
        if ( this.chat_sender_info$[chat.uid] !== af.database.object(`users/${chat.uid}`) ) {
          this.chat_sender_info$[chat.uid] = af.database.object(`users/${chat.uid}`);
          this.chat_sender_info$[chat.uid].subscribe((sender) => {
            chat.sender = sender;
          });
        }
        return chat;
      });
      console.log('chat_sender_info', this.chat_sender_info$);
      return chats;
    });
  }
}
