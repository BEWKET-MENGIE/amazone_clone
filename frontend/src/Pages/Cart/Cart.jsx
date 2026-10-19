import React, { useContext } from 'react';
import LayOut from '../../Component/LayOut/LayOut';
import { DataContext } from '../../Component/DataProvider/DataProvider';
import ProductCard from '../../Component/Product/ProductCard';
import CurrencyFormat from '../../Component/CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';
import classes from './Cart.module.css';
import { Type } from '../../Utility/action.type';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const Cart = () => {
  const [{ basket }, dispatch] = useContext(DataContext);

  const total = basket?.reduce((amount, item) => {
    return amount + (item.price * (item.amount || 1));
  }, 0) || 0;

  const totalItems = basket?.reduce((amount, item) => {
    return amount + (item.amount || 1);
  }, 0) || 0;

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Your Shopping Basket</h2>
          <hr />
          {basket?.length === 0 ? (
            <p>Oops! No items in your cart.</p>
          ) : (
            basket?.map((item, i) => (
              <section key={item.id || i} className={classes.cart_product}>
                <ProductCard
                  product={item}
                  renderDescription={true}
                  flex={true}
                  renderAdd={false}
                />
                <div className={classes.btn_container}>
                  <button className={classes.btn} onClick={() => increment(item)}>
                    <IoIosArrowUp size={20} />
                  </button>
                  <span>{item.amount || 1}</span>
                  <button className={classes.btn} onClick={() => decrement(item.id)}>
                    <IoIosArrowDown size={20} />
                  </button>
                </div>
              </section>
            ))
          )}
        </div>

        {basket?.length > 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({totalItems} items):</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payment">Proceed to Checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
};

export default Cart;