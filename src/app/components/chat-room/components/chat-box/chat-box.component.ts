import { Component, OnInit } from '@angular/core';
import { AppState, getMessages, getMessagingUser } from 'src/app/store/app.states';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { SendMessage } from 'src/app/store/actions/chat.action';
import { SocketService } from 'src/app/service/socket.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {

  public subscriptions: Subscription[] = []

  public messages = []

  public message: any =''

  public messageMap: any = {}

  public currentChattingUserId: String

  constructor(public store: Store<AppState>, public socketService: SocketService) { }

  ngOnInit() {
    let getMessageState: Observable<any> = this.store.select(getMessages)
    let _getMessages = getMessageState.subscribe(messages => {
      this.messages = messages
      this.messages.map(message => this.messageMap[message._id] = message._id)
      if (this.socketService.socket && this.socketService.socket.on) {
        let key = "GOT_MESSAGE"
        this.socketService.socket.on(key, msg => {
          if (this.currentChattingUserId && !this.messageMap[msg._id]) {
            this.messages.push(msg)
            this.messageMap[msg._id] = msg._id
          }
        });
      }
    })
    this.subscriptions.push(_getMessages)
    let getMessagingUserState: Observable<any> = this.store.select(getMessagingUser)
    let user = getMessagingUserState.subscribe(userId => {
      this.currentChattingUserId = userId
    })
    this.subscriptions.push(user)
  } 

  sendMessage(message) {
    if (!this.currentChattingUserId || !message || message === '')
      return
    let data = {
      message: message,
      userId: this.currentChattingUserId
    }
    this.message = ''
    this.store.dispatch(new SendMessage(data))
  }

  ngDestroy() {
    this.subscriptions.map(subscription => subscription.unsubscribe())
  }

}
