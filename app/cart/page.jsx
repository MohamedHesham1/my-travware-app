'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem('savedCart')
      ? JSON.parse(localStorage.getItem('savedCart'))
      : []
  );
  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem('savedCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('savedCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  const handleQuantityChange = (id, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(Math.max(quantity, 1), item.inStock) }
          : item
      )
    );
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      // Save order to localStorage
      const savedOrders = localStorage.getItem('savedOrders');
      const orders = savedOrders ? JSON.parse(savedOrders) : [];
      orders.push(cartItems);
      localStorage.setItem('savedOrders', JSON.stringify(orders));

      // Clear cart
      setCartItems([]);
      localStorage.setItem('savedCart', JSON.stringify([]));

      router.push('/orders');
    } else {
      alert(
        'Your cart is empty. Please add items to your cart before checking out.'
      );
    }
  };

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Shopping Cart</h2>
      <ul className='list-none'>
        {cartItems.map((item) => (
          <li key={item.id} className='flex justify-between items-center mb-2'>
            <div>
              <p className='font-bold'>{item.name}</p>
              <p>
                ${item.price} x {item.quantity}
              </p>
            </div>
            <div className='flex items-center'>
              <button
                className='btn btn-error mr-2'
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
              <input
                type='number'
                value={item.quantity}
                min='1'
                max={item.inStock}
                className='input input-bordered w-16'
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value))
                }
              />
            </div>
          </li>
        ))}
      </ul>
      <div className='flex justify-between items-center mt-4'>
        <p className='font-bold'>Total: ${total.toFixed(2)}</p>
        <button className='btn btn-primary' onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}
