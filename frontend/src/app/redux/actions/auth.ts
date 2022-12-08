import { Dispatch } from 'redux';
import axios from 'axios';
import { AUTH_GET_DATA_SUCCESS, AUTH_GET_DATA_FAIL ,REGISTER_GET_DATA_SUCCESS,REGISTER_GET_DATA_FAIL} from 'app/redux/reduxTypes';

const base_url = `http://localhost:8000`;
export function authApiData({ email, password }: any) {
  return (dispatch: Dispatch) => {
    const body = {
      email: email,
      password: password
    };
    axios
      .post(`${base_url}/users/login`, body)
      .then((json) => {
        localStorage.setItem("@auth",JSON.stringify(json?.data))
        dispatch({
          type: AUTH_GET_DATA_SUCCESS,
          payload: {
            loginData: json?.data
          }
        });
      })
      .catch((err) => {
        dispatch({
          type: AUTH_GET_DATA_FAIL,
          payload: err
        });
      });
  };
}
export function authRegisterApiData({ email, password ,name}: any) {
  return (dispatch: Dispatch) => {
    const body = {
      email: email,
      password: password,
      name:name
    };
    axios
      .post(`${base_url}/users/register`, body)
      .then((json) => {
        localStorage.setItem("@auth",JSON.stringify(json?.data))
        dispatch({
          type: REGISTER_GET_DATA_SUCCESS,
          payload: {
            registerData: json?.data
          }
        });
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_GET_DATA_FAIL,
          payload: err
        });
      });
  };
}
