import React from 'react';
import { useSelector } from 'react-redux';
import DeviceCard from '../../components/DeviceCard/DeviceCard';
import './Shop.scss';
import Loader from '../../components/loader/Loader';

const Shop = () => {
  const { devices, isLoading, error } = useSelector((state) => state.devices);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return error;
  }

  return (
    <div className="shop-container">
      <h1>Девайсы</h1>
      <div className="flex-container">
        {devices.length > 0 ? (
          devices.map((item) => <DeviceCard item={item} key={item._id} />)
        ) : (
          <p>Нет загруженных девайсов</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
