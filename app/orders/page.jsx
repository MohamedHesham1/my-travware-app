'use client';
import { useEffect, useState } from 'react';

export default function Checkout() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('savedOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className='mb-4'>
            <h3 className='text-xl font-semibold'>Order {index + 1}</h3>
            <ul className='list-none'>
              {order.map((item) => (
                <li
                  key={item.id}
                  className='flex justify-between items-center mb-2'
                >
                  <div>
                    <p className='font-bold'>{item.name}</p>
                    <p>
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className='flex justify-between items-center mt-4'>
              <p className='font-bold'>
                Total: $
                {order
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
