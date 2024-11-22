import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDeviceId } from '../../store/slices/deviceSlice';
import './DevicePage.scss';
import Loader from '../loader/Loader';

const DevicePage = () => {
  const { id } = useParams();
  const { selectedDeviceID, isLoading, error } = useSelector((state) => state.devices);
  console.log(selectedDeviceID);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDeviceId(id));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return error;
  }

  return (
    <div className="device-page">
      {selectedDeviceID && (
        <div className="device-detail">
          <img src={selectedDeviceID.imgUrl} alt={selectedDeviceID.name} />
          <div className="device-info">
            <h1 className="device-name">{selectedDeviceID.name}</h1>
            <p className="device-price">Price: ${selectedDeviceID.price}</p>
            <p className="device-description">{selectedDeviceID.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevicePage;
