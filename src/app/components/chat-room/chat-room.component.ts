import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/service/socket.service';
import { Store } from '@ngrx/store';
import { AppState, getActiveUsers, getAllUsers } from 'src/app/store/app.states';
import { Observable, Subscription } from 'rxjs';
import { GetAllUsers, SetActiveUsersSuccess } from 'src/app/store/actions/auth.action';
import { GetMessages } from 'src/app/store/actions/chat.action';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

  public subscriptions: Subscription[] = []

  public activeUsers: any = []

  public allUsers: any = []

  constructor(public socketService: SocketService, public store: Store<AppState>) { }

  ngOnInit() {
    let activeUserState: Observable<any> = this.store.select(getActiveUsers)
    let activeUsers = activeUserState.subscribe(users => {
      this.activeUsers = users
      if (this.allUsers) {
        this.allUsers.map((user: any) => {
          this.activeUsers.map((activeUser: any)=> {
            if (user._id === activeUser._id)
              user.active = true
            else
              user.active = false
          })
        })
      }
      if (this.socketService.socket && this.socketService.socket.on) {
        let key = "ACTIVE_USERS_LIST"
        this.socketService.socket.on(key, _users => {
          this.activeUsers = _users
          console.log(_users)
          this.store.dispatch(new SetActiveUsersSuccess(_users))
          // this.allUsers.map((user: any) => {
          //   this.activeUsers.map((activeUser: any)=> {
          //     if (user._id === activeUser._id)
          //       user.active = true
          //     else
          //       user.active = false
          //   })
          // })
        });
      }
    })
    this.subscriptions.push(activeUsers)
    this.store.dispatch(new GetAllUsers())
    let allUserState: Observable<any> = this.store.select(getAllUsers)
    let allUsers = allUserState.subscribe(users => {
      this.allUsers = users
      this.allUsers.map((user: any) => {
        this.activeUsers.map((activeUser: any)=> {
          if (user._id === activeUser._id)
            user.active = true
          else
            user.active = false
        })
      })
    })
    this.subscriptions.push(allUsers)
  }

  openChat(userId) {
    this.store.dispatch(new GetMessages(userId))
  }

  ngDestroy() {
    this.subscriptions.map(subscription => subscription.unsubscribe())
  }

}
