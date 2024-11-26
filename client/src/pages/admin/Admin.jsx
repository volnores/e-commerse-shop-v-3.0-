import React, { useState } from 'react';
import './Admin.scss';
import { useDispatch } from 'react-redux';
import { createDevice } from '../../store/slices/deviceSlice';
import { createType } from '../../store/slices/typeSlice';
import { createBrand } from '../../store/slices/brandslice';

const Admin = () => {
  const dispatch = useDispatch();
  const [openDeviceModal, setOpenDeviceModal] = useState(false);
  const [openTypeModal, setOpenTypeModal] = useState(false);
  const [openBrandModal, setOpenBrandModal] = useState(false);
  const [deviceData, setDeviceData] = useState({
    name: '',
    price: '',
    rating: '',
    brandId: '',
    typeId: '',
    info: '',
    img: null,
  });
  const [typeData, setTypeData] = useState({
    name: '',
  });

  const [brandData, setBrandData] = useState({
    name: '',
  });

  const handleChangeDevice = (e) => {
    const { name, value } = e.target;
    setDeviceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setDeviceData((prevData) => ({
      ...prevData,
      img: e.target.files[0],
    }));
  };

  const handleSubmitDevice = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in deviceData) {
      formData.append(key, deviceData[key]);
    }

    try {
      await dispatch(createDevice(formData));
      setOpenDeviceModal((prev) => !prev);
    } catch (error) {
      console.error('Ошибка при создании устройства:', err);
    }
  };

  const handleTypeChange = (e) => {
    const { name, value } = e.target;
    setTypeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitType = (e) => {
    e.preventDefault();
    dispatch(createType(typeData));
    setOpenTypeModal((prev) => !prev);
    setTypeData({ name: '' });
  };

  const handleBrandChange = (e) => {
    const { name, value } = e.target;
    setBrandData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitBrand = (e) => {
    e.preventDefault();
    dispatch(createBrand(brandData));
    setOpenBrandModal((prev) => !prev);
    setBrandData({ name: '' });
  };

  return (
    <div className="container">
      <ul className="list">
        <li className="item">
          <button className="btn" onClick={() => setOpenDeviceModal((prev) => !prev)}>
            Добавить девайс
          </button>
          {openDeviceModal && (
            <div className="modal">
              <h2>Новый девайс</h2>
              <form onSubmit={handleSubmitDevice}>
                <input
                  type="text"
                  name="name"
                  placeholder="Название"
                  value={deviceData.name}
                  onChange={handleChangeDevice}
                  required
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Стоимость"
                  value={deviceData.price}
                  onChange={handleChangeDevice}
                  required
                />
                <input
                  type="number"
                  name="rating"
                  placeholder="Рейтинг"
                  value={deviceData.rating}
                  onChange={handleChangeDevice}
                  required
                />
                <input
                  type="text"
                  name="brandId"
                  placeholder="Id бренда"
                  value={deviceData.brandId}
                  onChange={handleChangeDevice}
                  required
                />
                <input
                  type="text"
                  name="typeId"
                  placeholder="Id типа"
                  value={deviceData.typeId}
                  onChange={handleChangeDevice}
                  required
                />
                <textarea
                  name="info"
                  placeholder="Информация"
                  value={deviceData.info}
                  onChange={handleChangeDevice}></textarea>
                <input
                  type="file"
                  name="img"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
                <div className="btn-container">
                  <button type="submit">Создать</button>
                  <button
                    type="button"
                    className="close-btn"
                    onClick={() => setOpenDeviceModal((prev) => !prev)}>
                    Закрыть
                  </button>
                </div>
              </form>
            </div>
          )}
        </li>
        <li className="item">
          <button className="btn" onClick={() => setOpenBrandModal((prev) => !prev)}>
            Добавить бренд
          </button>
          {openBrandModal && (
            <div className="modal">
              <h2>Новый бренд</h2>
              <form onSubmit={handleSubmitBrand}>
                <input
                  type="text"
                  name="name"
                  placeholder="Название"
                  value={brandData.name}
                  onChange={handleBrandChange}
                  required
                />
                <div className="btn-container">
                  <button type="submit">Создать</button>
                  <button
                    type="button"
                    className="close-btn"
                    onClick={() => setOpenBrandModal((prev) => !prev)}>
                    Закрыть
                  </button>
                </div>
              </form>
            </div>
          )}
        </li>
        <li className="item">
          <button className="btn" onClick={() => setOpenTypeModal((prev) => !prev)}>
            Добавить тип
          </button>
          {openTypeModal && (
            <div className="modal">
              <h2>Новый тип</h2>
              <form onSubmit={handleSubmitType}>
                <input
                  type="text"
                  name="name"
                  placeholder="Название"
                  value={typeData.name}
                  onChange={handleTypeChange}
                  required
                />
                <div className="btn-container">
                  <button type="submit">Создать</button>
                  <button
                    type="button"
                    className="close-btn"
                    onClick={() => setOpenTypeModal((prev) => !prev)}>
                    Закрыть
                  </button>
                </div>
              </form>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Admin;
