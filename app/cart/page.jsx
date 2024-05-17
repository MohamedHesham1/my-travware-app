'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
    <div className='p-10'>
      <h2 className='text-2xl font-bold mb-4'>Shopping Cart</h2>
      <ul className='list-none'>
        {cartItems.map((item) => (
          <li key={item.id} className='mb-4'>
            <div className='card bg-base-100 shadow-xl '>
              <div className='card-body p-4 flex flex-col md:flex-row'>
                <Image
                  src={item.image}
                  alt={item.name}
                  className='w-full md:w-1/3 h-auto object-cover'
                  width={200}
                  height={200}
                />
                <div className='md:ml-4 flex-grow'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <p className='font-semibold text-lg'>{item.name}</p>
                      <p className='text-sm text-gray-600'>
                        ${item.price} x {item.quantity}
                      </p>
                    </div>
                    <div className='flex items-center flex-wrap space-x-2'>
                      <button
                        className='btn btn-error btn-sm'
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </button>
                      <input
                        type='number'
                        value={item.quantity}
                        min='1'
                        max={item.inStock}
                        className='input input-bordered input-sm w-[70px] text-center'
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className='flex gap-6 items-center mt-8'>
        <p className='font-bold text-2xl'>Total: ${total.toFixed(2)}</p>
        <button className='btn btn-primary text-lg' onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}
