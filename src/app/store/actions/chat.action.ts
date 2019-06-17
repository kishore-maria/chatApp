import { Action } from '@ngrx/store';

export enum ChatActionTypes {
  GET_ALL_CHATS = '[Users] Get all users',
  //   GET_ALL_USERS_SUCCESS = '[Users] Get all users success',
  GET_MESSAGES = '[Messages] Get particular messages',
  GET_MESSAGES_SUCCESS = '[Messages] Get particular message success',
  SEND_MESSAGES = '[Messages] Send message',
  SEND_MESSAGES_SUCCESS = '[Messages] Send message success',
}

export class getAllChats implements Action {
  readonly type = ChatActionTypes.GET_ALL_CHATS;
  constructor() { }
}

// export class GetAllUsersSuccess implements Action {
//   readonly type = UserActionTypes.GET_ALL_USERS_SUCCESS;
//   constructor(public payload: any) {}
// }

export class GetMessages implements Action {
  readonly type = ChatActionTypes.GET_MESSAGES;
  constructor(public payload: String) { }
}

export class GetMessagesSuccess implements Action {
  readonly type = ChatActionTypes.GET_MESSAGES_SUCCESS;
  constructor(public payload: any) {}
}

export class SendMessage implements Action {
  readonly type = ChatActionTypes.SEND_MESSAGES;
  constructor(public payload: any) { }
}

export class SendMessageSuccess implements Action {
  readonly type = ChatActionTypes.SEND_MESSAGES_SUCCESS;
  constructor(public payload: any) {}
}

export type All = getAllChats | GetMessages | GetMessagesSuccess | SendMessage | SendMessageSuccess;