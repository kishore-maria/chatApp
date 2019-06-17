import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { Signup } from 'src/app/store/actions/auth.action';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpUserForm: FormGroup;

  public isAgreed: Boolean = false

  constructor(public formBuilder: FormBuilder, public store: Store<AppState>) { }

  ngOnInit() {
    this.signUpUserForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }
  
  signUp() {
    this.store.dispatch(new Signup(this.signUpUserForm));
  }

  agree() {
    this.isAgreed = !this.isAgreed
  }

}
