import { All, ChatActionTypes } from '../actions/chat.action';
import * as cloneDeep from 'lodash/fp'

export interface State {
  messages: [];
  currentChatUserId: String;
}

export const initialState: State = {
  messages: [],
  currentChatUserId: null
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case ChatActionTypes.GET_ALL_CHATS: {
      return {
        ...state,
      }
    }
    // case UserActionTypes.GET_ALL_USERS_SUCCESS: {
    //   return {
    //     ...state,
    //     allUsers: action.payload
    //   }
    // }
    case ChatActionTypes.GET_MESSAGES: {
      return {
        ...state,
      }
    }
    case ChatActionTypes.GET_MESSAGES_SUCCESS: {
      return {
        ...state,
        messages: action.payload.messages,
        currentChatUserId: action.payload.userId
      }
    }
    case ChatActionTypes.SEND_MESSAGES: {
      return {
        ...state,
      }
    }
    case ChatActionTypes.SEND_MESSAGES_SUCCESS: {
      let data = cloneDeep(action.payload)
      return {
        ...state,
        messages: data
      }
    }
    default: {
      return state
    }
  }
}