import * as auth from './reducers/auth.reducer';
import * as chat from './reducers/chat.reducer';

export interface AppState {
  authState: auth.State;
  chatState: chat.State
}

export const reducers = {
  authState: auth.reducer,
  chatState: chat.reducer,
};

// Auth Selectors

const getCurrentUser = (state: auth.State): boolean => state.isAuthenticated;

const _getCurrentUser = (state: auth.State): any => state.user;

const _getActiveUsers = (state: auth.State): any => state.activeUsers;

const _getAllUsers = (state: auth.State): any => state.allUsers;


export const _selectCurrentUser = (state: AppState): any => _getCurrentUser(state.authState);

export const selectCurrentUser = (state: AppState): boolean => getCurrentUser(state.authState);

export const getActiveUsers = (state: AppState): any => _getActiveUsers(state.authState);

export const selectUserState = (state: AppState): auth.State => state.authState;

export const getAllUsers = (state: AppState): any => _getAllUsers(state.authState);



const _getMessages = (state: chat.State): [] => state.messages;

const _getMessagingUser = (state: chat.State): String => state.currentChatUserId;


export const getMessages = (state: AppState): [] => _getMessages(state.chatState);

export const getMessagingUser = (state: AppState): String => _getMessagingUser(state.chatState);