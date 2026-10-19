import React, { useContext, useEffect, useState } from 'react';
import LayOut from '../../Component/LayOut/LayOut';
import { DataContext } from '../../Component/DataProvider/DataProvider';
import { db } from '../../Utility/firebase';
import ProductCard from '../../Component/Product/ProductCard';
import CurrencyFormat from '../../Component/CurrencyFormat/CurrencyFormat';
import classes from './Order.module.css';

const Order = () => {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection('users')
        .doc(user.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.order_container}>
          <h2>Your Orders</h2>
          {orders?.length === 0 ? (
            <p style={{ padding: '20px 0' }}>You have no orders yet.</p>
          ) : (
            <div className={classes.orders_list}>
              {orders?.map((order) => (
                <div key={order.id} className={classes.order_card}>
                  <div className={classes.order_header}>
                    <div>
                      <p><strong>Order ID:</strong> {order.id}</p>
                      <p className={classes.order_date}>
                        <strong>Order Date:</strong> {new Date(order.data.created * 1000).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className={classes.order_products}>
                    {order.data.basket?.map((item) => (
                      <ProductCard
                        product={item}
                        flex={true}
                        key={item.id}
                        renderDescription={false}
                        renderAdd={false}
                      />
                    ))}
                  </div>

                  <div className={classes.order_total}>
                    <span>Total Order:</span>
                    <CurrencyFormat amount={order.data.amount / 100} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </LayOut>
  );
};

export default Order;