import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getDeviceId } from '../../store/slices/deviceSlice';
import { addToCart } from '../../store/slices/cartSlice';
import './DevicePage.scss';
import Loader from '../Loader/Loader';
import { BASKET_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts';

const DevicePage = () => {
  const { id } = useParams();
  const { selectedDeviceID, isLoading, error } = useSelector((state) => state.devices);
  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getDeviceId(id));
  }, []);

  const handleBuyNow = () => {
    if (currentUser === null) {
      alert('Для начала зарегистрируйтесь');
      navigate(REGISTRATION_ROUTE);
    } else {
      navigate(BASKET_ROUTE);
      if (selectedDeviceID) {
        dispatch(addToCart(selectedDeviceID));
      }
    }
  };

  const handleAddToCart = () => {
    if (currentUser === null) {
      alert('Для начала зарегистрируйтесь');
      navigate(REGISTRATION_ROUTE);
    } else {
      if (selectedDeviceID) {
        dispatch(addToCart(selectedDeviceID));
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return error;
  }

  return (
    <div className="device-detail">
      <img src={selectedDeviceID?.img} alt={selectedDeviceID?.name} className="device-img" />
      <div className="device-text">
        <h1 className="device-name">{selectedDeviceID?.name}</h1>
        <p className="device-price">Price: ${selectedDeviceID?.price}</p>
        <p className="device-info">{selectedDeviceID?.info}</p>
        <div className="btns">
          <button onClick={handleBuyNow}>Купить сразу</button>
          <button onClick={handleAddToCart}>В корзину</button>
        </div>
      </div>
    </div>
  );
};

export default DevicePage;
