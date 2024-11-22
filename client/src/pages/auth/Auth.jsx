import React, { useState } from 'react';
import './Auth.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../../utils/consts';
import { useDispatch } from 'react-redux';
import { login, registration } from '../../store/slices/authSlice';

const Auth = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    if (isLogin) {
      const resultAction = await dispatch(login(userData));
      if (login.fulfilled.match(resultAction)) {
        navigate(SHOP_ROUTE);
      }
    } else {
      const resultAction = await dispatch(registration(userData));
      if (registration.fulfilled.match(resultAction)) {
        navigate(LOGIN_ROUTE);
      }
    }
  };
  return (
    <div className="register-form-container">
      <h2>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
      <form className="register-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Имя пользователя"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isLogin ? 'Войти' : 'Регистрация'}</button>
        <div>
          {isLogin ? (
            <p className="text">
              Нет аккаунта? <Link to={REGISTRATION_ROUTE}>Зарегистрироваться</Link>
            </p>
          ) : (
            <p className="text">
              Есть аккаунт? <Link to={LOGIN_ROUTE}>Войти</Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Auth;
