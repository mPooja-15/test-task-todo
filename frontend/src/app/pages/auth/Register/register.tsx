import React, { useState, useEffect } from 'react';
import { authRegisterApiData } from 'app/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import style from './register.css';

export const Register = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const { registerData } = useSelector((data: any) => data.registerDataList);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(authRegisterApiData({ email, password, name }));
  };
  useEffect(() => {
    if (registerData?._id) {
      history.push('/');
    }
  }, [registerData]);
  return (
    <>
      <div className={style.loginWarpper}>
        <div className={style.loginBox}>
          <h1>Register</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              name="name"
              placeholder="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <button type="submit">Register</button>
            <p>Already registered? <a href="/">Login</a></p>
          </form>
        </div>
      </div>
    </>
  );
};
