import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class ChatService {
  chat_list$: Observable<any>;
  items$: FirebaseListObservable<any>;
  constructor(public af: AngularFire) {
    this.items$ = af.database.list('/items', {
      query: { limitToLast: 15, orderByKey: true}
    });
    this.chat_list$ = this.items$.map(chats => {
      console.log('chats: ', chats);
      return chats.map(chat => {
        if ( chat.sender !== af.database.object(`users/${chat.uid}`) ) {
          chat.sender = af.database.object(`users/${chat.uid}`);
        }
        return chat;
      });
    });
  }
}