import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_FAIL,
  USER_LOADED_SUCCESS,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  FIND_ID_SUCCESS,
  FIND_ID_FAIL,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  ACTIVATION_FAIL,
  ACTIVATION_SUCCESS,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  LOGOUT,
} from "../actions/types";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: {
    company: localStorage.getItem("company"),
    email: localStorage.getItem("email"),
    name: localStorage.getItem("name"),
    phonenumber: localStorage.getItem("phonenumber"),
    position: localStorage.getItem("position"),
    username: localStorage.getItem("username"),
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REFRESH_SUCCESS:
      console.log(REFRESH_SUCCESS, state);
      localStorage.setItem("access", payload.access);
      localStorage.setItem("refresh", payload.refresh);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
      };
    case AUTHENTICATED_SUCCESS:
      console.log(AUTHENTICATED_SUCCESS, state);
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGIN_SUCCESS:
      console.log(LOGIN_SUCCESS, state);
      localStorage.setItem("access", payload.access);
      localStorage.setItem("refresh", payload.refresh);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    case USER_LOADED_SUCCESS:
      console.log(USER_LOADED_SUCCESS, state);
      localStorage.setItem("company", payload.company);
      localStorage.setItem("email", payload.email);
      localStorage.setItem("name", payload.name);
      localStorage.setItem("phonenumber", payload.phonenumber);
      localStorage.setItem("position", payload.position);
      localStorage.setItem("username", payload.username);
      return {
        ...state,
        user: payload,
      };
    case REFRESH_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };
    case AUTHENTICATED_FAIL:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        isAuthenticated: false,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
      };
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
    case LOGOUT:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("company");
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      localStorage.removeItem("phonenumber");
      localStorage.removeItem("position");
      localStorage.removeItem("username");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
      };
    case FIND_ID_SUCCESS:
    case FIND_ID_FAIL:
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_FAIL:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
    case PASSWORD_RESET_CONFIRM_FAIL:
    case ACTIVATION_SUCCESS:
    case ACTIVATION_FAIL:
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
}
