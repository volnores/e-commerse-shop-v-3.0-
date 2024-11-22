import React from 'react';
import './DeviceCard.scss'; // Импортируем стили
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../../utils/consts';
import { useDispatch } from 'react-redux';
import { getDeviceId } from '../../store/slices/deviceSlice';

const DeviceCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigate = () => {
    dispatch(getDeviceId(item.id));
    navigate(`${DEVICE_ROUTE}/${item.id}`);
  };
  return (
    <div className="device-card" onClick={handleNavigate}>
      <img src={item.imgUrl} alt={item.name} />
      <h3>{item.name}</h3>
      <p>Price: ${item.price}</p>
    </div>
  );
};

export default DeviceCard;
