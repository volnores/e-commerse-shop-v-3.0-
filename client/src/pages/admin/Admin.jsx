import React, { useState } from 'react';
import './Admin.scss';
import { useDispatch } from 'react-redux';
import { createDevice } from '../../store/slices/deviceSlice';

const Admin = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [deviceData, setDeviceData] = useState({
    name: '',
    price: '',
    rating: '',
    brandId: '',
    typeId: '',
    info: '',
    img: null,
  });

  const handleChange = (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in deviceData) {
      formData.append(key, deviceData[key]);
    }

    try {
      await dispatch(createDevice(formData));
      setOpenModal((prev) => !prev);
    } catch (err) {
      console.error('Ошибка при создании устройства:', err);
    }
  };

  return (
    <div className="container">
      <ul className="list">
        <li className="item">
          <button className="btn" onClick={() => setOpenModal((prev) => !prev)}>
            Добавить девайс
          </button>
          {openModal && (
            <div className="modal">
              <h2>Новый девайс</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Название"
                  value={deviceData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Стоимость"
                  value={deviceData.price}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  name="rating"
                  placeholder="Рейтинг"
                  value={deviceData.rating}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="brandId"
                  placeholder="Id бренда"
                  value={deviceData.brandId}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="typeId"
                  placeholder="Id типа"
                  value={deviceData.typeId}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="info"
                  placeholder="Информация"
                  value={deviceData.info}
                  onChange={handleChange}></textarea>
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
                    onClick={() => setOpenModal((prev) => !prev)}>
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
