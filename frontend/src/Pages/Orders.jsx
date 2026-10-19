import React, { useContext, useEffect, useState } from 'react';
import LayOut from '../../Component/LayOut/LayOut';
import { DataContext } from '../../Component/DataProvider/DataProvider';
import { db } from '../../Utility/firebase';
import ProductCard from '../../Component/Product/ProductCard';
import CurrencyFormat from '../../Component/CurrencyFormat/CurrencyFormat';

const Orders = () => {
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
      <div style={{ maxWidth: '1500px', margin: '20px auto', padding: '20px', background: 'white' }}>
        <h2>Your Orders</h2>
        {orders?.length === 0 ? (
          <p style={{ padding: '20px 0' }}>You have no orders yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
            {orders?.map((order) => (
              <div key={order.id} style={{ border: '1px solid lightgray', padding: '20px', borderRadius: '8px', background: '#fcfcfc' }}>
                <div style={{ background: '#f0f2f2', padding: '12px 15px', borderRadius: '4px', marginBottom: '15px' }}>
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p style={{ color: '#555', fontSize: '12px', marginTop: '2px' }}>
                    <strong>Order Date:</strong> {new Date(order.data.created * 1000).toLocaleString()}
                  </p>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
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

                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px', fontSize: '18px', fontWeight: '700', marginTop: '15px', paddingTop: '15px', borderTop: '1px dashed lightgray' }}>
                  <span>Total Order:</span>
                  <CurrencyFormat amount={order.data.amount / 100} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </LayOut>
  );
};

export default Orders;