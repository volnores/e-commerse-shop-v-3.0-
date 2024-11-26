import React from 'react';
import './NavBar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';

const NavBar = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate(LOGIN_ROUTE);
  };
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">
        DEVICE SHOP
      </a>

      <div className="right-nav">
        <div onClick={() => navigate(BASKET_ROUTE)}>
          {user && <button className="cart-btn">Корзина</button>}
        </div>
        {user === null ? (
          <nav>
            <a href="">
              <button onClick={() => navigate(REGISTRATION_ROUTE)} className="button">
                войти
              </button>
            </a>
          </nav>
        ) : (
          <nav>
            <a href="" style={{ marginRight: '20px' }}>
              <button onClick={() => navigate(ADMIN_ROUTE)} className="button">
                админ панель
              </button>
            </a>
            <a href="">
              <button onClick={handleLogout} className="logout-button">
                выйти
              </button>
            </a>
          </nav>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
