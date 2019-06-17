import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as auth from '../../store/reducers/auth.reducer'
import { Store } from '@ngrx/store';
import { AppState, selectUserState } from 'src/app/store/app.states';
import { UserService } from 'src/app/service/user.service';
import { LoginSuccess, Logout, SetActiveUsers } from 'src/app/store/actions/auth.action';
import { SocketService } from 'src/app/service/socket.service';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public authState: auth.State;

  public user: any = ''

  public subscriptions: Subscription[] = [];

  constructor(public store: Store<AppState>, public userService: UserService, public socketService: SocketService) { }

  ngOnInit() {
    this.userService.currentUser().subscribe(user => {
      if(user) {
        let userState = {
          user: user,
          isAuthenticated: true
        }
        this.user = user
        this.store.dispatch(new LoginSuccess(userState))
        let key = "ACTIVE_USERS_LIST"
        this.socketService.socket.on(key, users => {
          let activeUsers = []
          users.map(user => {
            if (user._id !== this.user._id) {
              activeUsers.push(user)
            }
          })
          this.store.dispatch(new SetActiveUsers(activeUsers))
        });
      }
    });
    // let authState: Observable<auth.State> = this.store.select(selectUserState);
    // let subscripeAuth = authState.subscribe(authState => {
    //   this.authState = authState;
    //   if (authState.user)
    //     this.user = authState.user
    //   console.log(this.user)
    // });
    // this.subscriptions.push(subscripeAuth);
  }
  
  ngOnDestroy(): void {
    this.subscriptions.map(subscription => subscription.unsubscribe())
  }

  logout() {
    this.store.dispatch(new Logout(null))
  }

}
