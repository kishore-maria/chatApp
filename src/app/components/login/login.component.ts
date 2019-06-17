import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppState } from 'src/app/store/app.states';
import { Store } from '@ngrx/store';
import { Login } from 'src/app/store/actions/auth.action';
import { SocketService } from 'src/app/service/socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginUserForm: FormGroup

  constructor(public store: Store<AppState>, public formBuilder: FormBuilder, private socketService: SocketService) { }

  ngOnInit() {
    this.loginUserForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
    // let key = "ACTIVE_USERS_LIST"
    // console.log(key)
    // this.socketService.socket.on(key, data => {
    //   console.log('socket data')
    //   console.log(data)
    // });
  }
  
  login() {
    this.store.dispatch(new Login(this.loginUserForm));
  }

}
