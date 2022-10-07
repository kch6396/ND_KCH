import axios from "axios";
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
  FIND_ID_FAIL,
  FIND_ID_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  ACTIVATION_FAIL,
  ACTIVATION_SUCCESS,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  LOGOUT,
} from "./types";

export const refreshToken = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const token = JSON.stringify({ refresh: localStorage.getItem("refresh") });
    try {
      await axios
        .post(
          `http://112.221.126.139:10000/api/testing/jwt/refresh/`,
          token,
          config
        )
        .then(function (res) {
          console.log("refresh", res);
          dispatch({
            type: REFRESH_SUCCESS,
            payload: res.data,
          });
        });
    } catch (err) {
      console.log(err);
      dispatch({
        type: REFRESH_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

export const checkAuthenticated = () => async (dispatch) => {
  console.log("check");
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const body = JSON.stringify({ token: localStorage.getItem("access") });
    console.log("JSON", body);
    try {
      const res = await axios.post(
        `http://112.221.126.139:10000/api/testing/jwt/verify/`,
        body,
        config
      );
      console.log("check", res);
      if (res.data.code !== "token_not_valid") {
        console.log(res.data.code);
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `JWT ${localStorage.getItem("access")}`;
      await axios
        .get(`http://112.221.126.139:10000/api/testing/users/me/`)
        .then(function (res) {
          console.log("load_user", res);
          dispatch({
            type: USER_LOADED_SUCCESS,
            payload: res.data,
          });
        });
    } catch (err) {
      console.log(err);
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

export const login = (username, password) => async (dispatch) => {
  const config = {
    Headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    await axios
      .post("http://112.221.126.139:10000/api/testing/jwt/create/", {
        username: username,
        password: password,
        config,
      })
      .then(function (res) {
        console.log("login", res);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        dispatch(load_user());
      });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const signup =
  (
    username,
    password,
    re_password,
    phonenumber,
    company,
    position,
    name,
    email
  ) =>
  async (dispatch) => {
    try {
      await axios
        .post("http://112.221.126.139:10000/api/testing/users/", {
          username: username,
          password: password,
          re_password: re_password,
          phonenumber: phonenumber,
          company: company,
          position: position,
          name: name,
          email: email,
        })
        .then(function (res) {
          console.log(res);
          dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data,
          });
        });
    } catch (err) {
      dispatch({
        type: SIGNUP_FAIL,
      });
    }
  };

export const verify = (uid, token) => async (dispatch) => {
  const config = {
    Headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    await axios.post(
      "http://112.221.126.139:10000/api/testing/users/activation/",
      {
        uid: uid,
        token: token,
        config,
      }
    );
    dispatch({
      type: ACTIVATION_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: ACTIVATION_FAIL,
    });
  }
};

export const reset_password = (email) => async (dispatch) => {
  const config = {
    Headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    await axios.post(
      `http://112.221.126.139:10000/api/testing/users/reset_password/`,
      {
        email: email,
        config,
      }
    );

    dispatch({
      type: PASSWORD_RESET_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: PASSWORD_RESET_FAIL,
    });
  }
};

export const Find_Id = (email) => async (dispatch) => {
  const config = {
    Headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    await axios.post(
      `http://112.221.126.139:10000/api/testing/users/reset_username/`,
      {
        email: email,
        config,
      }
    );

    dispatch({
      type: FIND_ID_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: FIND_ID_FAIL,
    });
  }
};

export const reset_password_confirm =
  (uid, token, new_password, re_new_password) => async (dispatch) => {
    const config = {
      Headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.post(
        `http://112.221.126.139:10000/api/testing/users/reset_password_confirm/`,
        {
          uid: uid,
          token: token,
          new_password: new_password,
          re_new_password: re_new_password,
          config,
        }
      );

      dispatch({
        type: PASSWORD_RESET_CONFIRM_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: PASSWORD_RESET_CONFIRM_FAIL,
      });
    }
  };

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
