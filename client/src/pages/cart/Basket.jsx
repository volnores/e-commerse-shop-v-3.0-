import React from 'react';
import './Basket.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeDeviceFromCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
} from '../../store/slices/cartSlice';

const Basket = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const handleRemoveItem = (id) => {
    dispatch(removeDeviceFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const totalSum = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div className="basket">
      <h2 className="basket__title">Корзина товаров</h2>
      {cart.length > 0 ? (
        cart.map((item) => (
          <div key={item._id} className="basket__item">
            <div className="basket__item__info">
              <img src={item.img} alt={item.name} />
              <div>
                <div className="basket__item__name">{item.name}</div>
                <div className="basket__item__price">Цена: ${item.price}</div>
              </div>
            </div>
            <div className="basket__item__controls">
              <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
              <span className="basket__item__quantity">{item.quantity}</span>
              <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
              <button
                className="basket__item__remove-button"
                onClick={() => handleRemoveItem(item.id)}>
                Удалить
              </button>
            </div>
          </div>
        ))
      ) : (
        <h2 className="basket__empty">Корзина пуста</h2>
      )}
      {cart.length > 0 && (
        <>
          <br />
          <hr />
          <br />
          <div className="total-sum">
            <h4>Общая сумма</h4>
            <div>${totalSum()}</div>
          </div>
        </>
      )}

      {cart.length > 0 && (
        <button className="basket__clear-button" onClick={handleClearCart}>
          Очистить корзину
        </button>
      )}
    </div>
  );
};

export default Basket;
