import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeviceCard from '../../components/DeviceCard/DeviceCard';
import './Shop.scss';
import Loader from '../../components/Loader/Loader';
import { setSearchByWords } from '../../store/slices/deviceSlice';
import useDebounce from '../../hooks/useDebounse';

const Shop = () => {
  const dispatch = useDispatch();
  const { devices, searchByWords, isLoading, error } = useSelector((state) => state.devices);

  const debounsedSearch = useDebounce(searchByWords, 300);

  const filteredDevices = () => {
    return devices.filter((item) =>
      item.name.toLowerCase().includes(debounsedSearch.toLowerCase()),
    );
  };

  const newFilteredDevices = filteredDevices();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return error;
  }

  return (
    <div className="shop-container">
      <h1>Девайсы</h1>
      <input
        type="text"
        placeholder="Поиск..."
        value={searchByWords}
        onChange={(e) => dispatch(setSearchByWords(e.target.value))}
      />
      <div className="flex-container">
        {newFilteredDevices.length > 0 ? (
          newFilteredDevices.map((item) => <DeviceCard item={item} key={item._id} />)
        ) : (
          <h2>Ничего не найдено</h2>
        )}
      </div>
    </div>
  );
};

export default Shop;
