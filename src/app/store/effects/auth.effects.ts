import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, empty } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { UserActionTypes, Signup, SignupSuccess, Login, LoginSuccess, Logout, LogoutSuccess, SetActiveUsersSuccess, SetActiveUsers, GetAllUsers, GetAllUsersSuccess} from '../actions/auth.action';
import { UserService } from 'src/app/service/user.service';
import { MessageService } from 'src/app/service/message.service'
import { _AuthService } from 'src/app/service/auth.service';
import { SocketService } from '../../service/socket.service';
import { Store } from '@ngrx/store';
import { AppState, getActiveUsers } from '../app.states';

@Injectable()
export class AuthEffects {

  constructor(public actions: Actions, public messageService: MessageService, public userService: UserService, public authService: _AuthService, public socketService: SocketService, private router: Router, private cookieService: CookieService, public store: Store<AppState>) {
  }
 
  @Effect()
  Login: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.LOGIN),
    map((action: Login) => action.payload),
    switchMap((payload: FormGroup) => {
      let user: any = {
        email: payload.controls.email.value,
        password: payload.controls.password.value
      }
      if (!user.email) {
        this.messageService.showError(['E-mail required.'])
        return empty();
      }
      if (payload.controls.email.invalid) {
        this.messageService.showError(['Enter valid email id.'])
        return empty();
      }
      if (!user.password) {
        this.messageService.showError(['Password required'])
        return empty();
      }
      let activeUsers = []
      this.store.select(getActiveUsers).subscribe(users => {
        activeUsers = users
      })
      return this.userService.signIn(user).pipe(
        map((result: any) => {
          let userState = {
            user: result.user,
            isAuthenticated: true,
            // activeUsers: activeUsers.push(result.user)
          }
          this.cookieService.set( 'token', result.token );
          this.router.navigateByUrl('/chatRoom')
          return new LoginSuccess(userState);
          // let key = "ACTIVE_USERS_LIST"
          // if (this.socketService.socket) {
          //   this.socketService.socket.on(key, data => {
          //     console.log('socket data')
          //     console.log(data)
          //   });
          // }
        }),
        catchError((error) => {
          let messages = this.messageService.parseError(error);
          this.messageService.showError(messages);
          return empty();
        })
      )
    })
  )

  @Effect()
  LoginSuccess: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.LOGIN_SUCCESS),
    map((action: LoginSuccess) => action.payload),
    switchMap( () => {
      this.socketService.connect()
      return empty();
    })
  )

  @Effect()
  Logout: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.LOGOUT),
    map((action: Logout) => action.payload),
    switchMap( () => {
      return this.userService.logout().pipe(
        map(() => {
          this.cookieService.delete('token');
          this.router.navigateByUrl('')
          return new LogoutSuccess();
        }),
        catchError((error) => {
          console.log(error);
          return empty();
        })
      );
    })
  )

  // @Effect()
  // FindCurrentUser: Observable<any> = this.actions.pipe(
  //   ofType(UserActionTypes.FIND_CURRENT_USER),
  //   map((action: FindCurrentUser) => action),
  //   switchMap(() => {
  //     return this.authService.currentUser().pipe(
  //       map( (user: any) => {
  //         return new FindCurrentUserSuccess(user)
  //       }),
  //       catchError((error) => {
  //         console.log(error);
  //         return empty();
  //       }) 
  //     )
  //   })
  // )

  @Effect()
  SetActiveUsers: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.SET_ACTIVE_USERS),
    map((action: SetActiveUsers) => action.payload),
    switchMap((payload) => {
      this.store.dispatch(new SetActiveUsersSuccess(payload))
      return empty()
    })
  )

  @Effect()
  GetAllUsers: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.GET_ALL_USERS),
    map((action: GetAllUsers) => action),
    switchMap(() => {
      return this.userService.getAllUsers().pipe(
        map((users) => {
          return new GetAllUsersSuccess(users);
        }),
        catchError((error) => {
          return empty();
        })
      );
    })
  )

  @Effect()
  Signup: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.SIGNUP),
    map((action: Signup) => action.payload),
    switchMap((payload: FormGroup) => {
      let user: any = {
        name: payload.controls.name.value,
        email: payload.controls.email.value,
        password: payload.controls.password.value,
        confirmPassword: payload.controls.confirmPassword.value
      }
      if (!user.name) {
        let str = ["Name required."]
        this.messageService.showError(str)
        return empty();
      }
      if (!user.email) {
        let str = ["Email required."]
        this.messageService.showError(str)
        return empty();
      }
      if (payload.controls.email.invalid) {
        let str = ["Enter valid email id."]
        this.messageService.showError(str)
        return empty();
      }
      if (!user.password) {
        let str = ["Password required."]
        this.messageService.showError(str)
        return empty();
      }
      let password = user.password
      if (password && !password.match(/[A-Z]/) || !password.match(/[a-z]/) || !password.match(/\d/) || !password.match(/[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\\/]/) || password.length < 8) {
        let str = ["Password should contains one uppercase, one lowercase, one number, one symbol and length should be greater than or equalto 8 characters."]
        this.messageService.showError(str)
        return empty()
      }
      if (payload.controls.password.invalid) {
        let str = ["Enter valid password."]
        this.messageService.showError(str)
        return empty();
      }
      if (!user.confirmPassword) {
        let str = ["Re-enter password required."]
        this.messageService.showError(str)
        return empty();
      }
      if (payload.controls.confirmPassword.invalid) {
        let str = ["Enter valid re-enter password."]
        this.messageService.showError(str)
        return empty();
      }
      if (user.password !== user.confirmPassword) {
        let str = ["Password is not match."]
        this.messageService.showError(str)
        return empty();
      }
      return this.userService.signup(user).pipe(
        map((user: any) => {
          let messages = ['Your account created successfully.']
          this.messageService.showSuccess(messages);
          this.router.navigateByUrl('')
          return new SignupSuccess(user);
        }),
        catchError((error) => {
          let messages = this.messageService.parseError(error);
          this.messageService.showError(messages);
          return empty();
        })
      )
    })
  )

}