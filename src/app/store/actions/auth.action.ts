import { Action } from '@ngrx/store';
import { FormGroup } from '@angular/forms';

export enum UserActionTypes  {
  // OPEN_LOGIN_FORM = '[User] Open Login form',
  // CLOSE_LOGIN_FORM = '[User] Close Login form',
  // OPEN_SIGNUP_FORM = '[User] Open Signup form',
  // CLOSE_SIGNUP_FORM = '[User] Close Signup form',
  LOGIN = '[User] Login',
  LOGIN_SUCCESS = '[User] Login Success',
  LOGIN_ERROR = '[User] Login Error',
  LOGOUT = '[User] Logout',
  LOGOUT_SUCCESS = '[User] Logout Success',
  // FIND_CURRENT_USER = '[User] Find Current User',
  // FIND_CURRENT_USER_SUCCESS = '[User] Find Current User Success',
  SIGNUP = '[User] Signup',
  SIGNUP_SUCCESS = '[User] Signup Success',
  SET_ACTIVE_USERS = '[Users] Set active users',
  SET_ACTIVE_USERS_SUCCESS = '[Users] Set active users success',
  GET_ALL_USERS = '[Users] Get all users',
  GET_ALL_USERS_SUCCESS = '[Users] Get all users success',
}

// export class OpenLoginFormDialog implements Action {
//   readonly type = UserActionTypes.OPEN_LOGIN_FORM;
//   constructor(public payload: {user: any, fullScreen: boolean}) {}
// }

// export class CloseLoginFormDialog implements Action {
//   readonly type = UserActionTypes.CLOSE_LOGIN_FORM;
//   constructor() {}
// }

// export class OpenSignupFormDialog implements Action {
//   readonly type = UserActionTypes.OPEN_SIGNUP_FORM;
//   constructor(public payload: {user: any, fullScreen: boolean}) {}
// }

// export class CloseSignupFormDialog implements Action {
//   readonly type = UserActionTypes.CLOSE_SIGNUP_FORM;
//   constructor() {}
// }

export class Login implements Action {
  readonly type = UserActionTypes.LOGIN;
  constructor(public payload: FormGroup) {}
}

export class Logout implements Action {
  readonly type = UserActionTypes.LOGOUT;
  constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
  readonly type = UserActionTypes.LOGIN_SUCCESS;
  constructor(public payload: {user: any, isAuthenticated: boolean}) {}
}

export class LoginError implements Action {
  readonly type = UserActionTypes.LOGIN_ERROR;
  constructor(public payload: {isAuthenticated: boolean}) {}
}

export class LogoutSuccess implements Action {
  readonly type = UserActionTypes.LOGOUT_SUCCESS;
  constructor() {}
}

// export class FindCurrentUser implements Action {
//   readonly type = UserActionTypes.FIND_CURRENT_USER;
//   constructor() {}
// }

// export class FindCurrentUserSuccess implements Action {
//   readonly type = UserActionTypes.FIND_CURRENT_USER_SUCCESS;
//   constructor(public payload: any) {}
// }

export class Signup implements Action {
  readonly type = UserActionTypes.SIGNUP;
  constructor(public payload: FormGroup) {
  }
}

export class SignupSuccess implements Action {
  readonly type = UserActionTypes.SIGNUP_SUCCESS;
  constructor(public payload: any) {}
}

export class SetActiveUsers implements Action {
  readonly type = UserActionTypes.SET_ACTIVE_USERS;
  constructor(public payload: any) {}
}

export class SetActiveUsersSuccess implements Action {
  readonly type = UserActionTypes.SET_ACTIVE_USERS_SUCCESS;
  constructor(public payload: any) {}
}


export class GetAllUsers implements Action {
  readonly type = UserActionTypes.GET_ALL_USERS;
  constructor() {}
}

export class GetAllUsersSuccess implements Action {
  readonly type = UserActionTypes.GET_ALL_USERS_SUCCESS;
  constructor(public payload: any) {}
}

// export type All = OpenLoginFormDialog | OpenSignupFormDialog |
// Login | LoginSuccess | LoginError | Logout | LogoutSuccess |
// FindCurrentUser | FindCurrentUserSuccess | Signup | SignupSuccess;

export type All = Signup | SignupSuccess | Login | LoginSuccess | LoginError | Logout | LogoutSuccess | SetActiveUsers | SetActiveUsersSuccess | GetAllUsers | GetAllUsersSuccess;