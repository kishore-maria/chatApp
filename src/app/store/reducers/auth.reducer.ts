import { All, UserActionTypes } from '../actions/auth.action';

export interface State {
  user: any;
  isAuthenticated: boolean;
  activeUsers: [];
  allUsers: []
}

export const initialState: State = {
  user: null,
  isAuthenticated: false,
  activeUsers: [],
  allUsers: []
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    // case UserActionTypes.OPEN_LOGIN_FORM: {
    //   return {
    //     ...state,
    //     user: action.payload.user,
    //   };
    // }
    // case UserActionTypes.OPEN_SIGNUP_FORM: {
    //   return {
    //     ...state,
    //     user: action.payload.user,
    //   };
    // }
    case UserActionTypes.LOGIN: {
      return {
        ...state
      }
    }
    case UserActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true
      }
    }
    case UserActionTypes.LOGIN_ERROR: {
      return {
        ...state,
        isAuthenticated: false
      }
    }
    case UserActionTypes.LOGOUT: {
      return {
        ...state
      }
    }
    case UserActionTypes.LOGOUT_SUCCESS: {
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      }
    }
    // case UserActionTypes.FIND_CURRENT_USER: {
    //   return {
    //     ...state,
    //   }
    // }
    // case UserActionTypes.FIND_CURRENT_USER_SUCCESS: {
    //   return {
    //     ...state,
    //     user: action.payload,
    //     //isAuthenticated: true
    //   }
    // }
    case UserActionTypes.SIGNUP: {
      return {
        ...state,
      }
    }
    case UserActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
      }
    }
    case UserActionTypes.SET_ACTIVE_USERS: {
      return {
        ...state,
      }
    }
    case UserActionTypes.SET_ACTIVE_USERS_SUCCESS: {
      return {
        ...state,
        activeUsers: action.payload
      }
    }
    case UserActionTypes.GET_ALL_USERS: {
      return {
        ...state,
      }
    }
    case UserActionTypes.GET_ALL_USERS_SUCCESS: {
      return {
        ...state,
        allUsers: action.payload
      }
    }
    default: {
      return state
    }
  }
}