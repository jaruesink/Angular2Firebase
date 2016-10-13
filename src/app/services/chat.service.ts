import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class ChatService {
  chat_list: Array<any>;
  chat_list$: Observable<any>;
  chat_senders$: any = {};
  items$: FirebaseListObservable<any>;
  constructor(public af: AngularFire) {
    this.items$ = af.database.list('/items', {
      query: { limitToLast: 15, orderByKey: true}
    });
    this.chat_list$ = this.items$.map(chats => {
      chats.forEach(chat => {
        this.chat_senders$[chat.uid] = af.database.object(`users/${chat.uid}`);
      });
      return chats;
    });
    this.chat_list$.subscribe(chat_list => {
      this.chat_list = chat_list.map(chat => {
        this.chat_senders$[chat.uid].subscribe((sender) => {
          chat.sender = sender;
        });
        return chat;
      });
      console.log(this.chat_list);
    });
  }
}