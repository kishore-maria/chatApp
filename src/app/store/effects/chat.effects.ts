import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, empty } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { MessageService } from 'src/app/service/message.service'
import { SocketService } from '../../service/socket.service';
import { Store } from '@ngrx/store';
import { AppState, getMessages } from '../app.states';
import { ChatActionTypes, GetMessages, GetMessagesSuccess, SendMessage, SendMessageSuccess } from '../actions/chat.action';
import { ChatService } from 'src/app/service/chat.service';

@Injectable()
export class ChatEffects {

  constructor(public actions: Actions, public messageService: MessageService, public socketService: SocketService, private router: Router, public store: Store<AppState>, public chatService: ChatService) {
  }

  @Effect({dispatch: false})
  GetMessages: Observable<any> = this.actions.pipe(
    ofType(ChatActionTypes.GET_MESSAGES),
    map((action: GetMessages) => action.payload),
    switchMap( (userId) => {
      return this.chatService.getMessages(userId).pipe(
        map((messages) => {
          return this.store.dispatch(new GetMessagesSuccess({messages: messages, userId: userId}))
        }),
        catchError((error) => {
          return empty();
        })
      );
      return empty()
    })
  )

  @Effect({dispatch: false})
  SendMessage: Observable<any> = this.actions.pipe(
    ofType(ChatActionTypes.SEND_MESSAGES),
    map((action: SendMessage) => action.payload),
    switchMap( (payload) => {
      return this.chatService.sendMessage(payload).pipe(
        map((message) => {
          let newMessages = []
          this.store.select(getMessages).subscribe(messages => {
            newMessages = messages
            newMessages.push(message)
            new SendMessageSuccess(newMessages)
            return
          })
          // return empty()
        }),
        catchError((error) => {
          console.log(error);
          return empty();
        })
      );
      return empty()
    })
  )

}