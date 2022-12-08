import React, { useState, useEffect } from 'react';
import { authApiData } from 'app/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import style from './login.css';

export const LoginPage = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { authData, error } = useSelector((data: any) => data.authDataList);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(authApiData({ email, password }));
  };
  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);
  useEffect(() => {
    if (authData?.data) {
      history.push('/todo');
    }
  }, [authData]);
  return (
    <>
      <div className={style.loginWarpper}>
        <div className={style.loginBox}>
          <h1>Login</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              name="email"
              placeholder="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className={style.loginbtn}>Login</button>
            <p>Already login? <a href="/register">Register</a></p>
          </form>
        </div>
      </div>
    </>
  );
};
