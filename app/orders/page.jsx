'use client';
import { useEffect, useState } from 'react';

export default function Checkout() {
  const [orders, setOrders] = useState(
    localStorage.getItem('savedOrders')
      ? JSON.parse(localStorage.getItem('savedOrders'))
      : []
  );

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
          <div key={index} className='mb-8 card bg-base-200 shadow-xl'>
            <div className='card-body p-6'>
              <h3 className='text-2xl font-bold mb-4'>Order {index + 1}</h3>
              <ul className='list-none mb-4'>
                {order.map((item) => (
                  <li
                    key={item.id}
                    className='flex justify-between items-center py-2 border-b border-gray-300 last:border-b-0'
                  >
                    <div>
                      <p className='font-medium text-lg'>{item.name}</p>
                      <p className='text-sm text-gray-600'>
                        ${item.price} x {item.quantity}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className='flex justify-between items-center pt-4 border-t border-gray-300'>
                <p className='font-bold text-xl'>
                  Total: $
                  {order
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
