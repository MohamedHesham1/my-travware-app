import Link from 'next/link';
import { useSearch } from '../_context/SearchContext';
import { useCart } from '../_context/CartContext';

export default function Navbar() {
  const { search, handleSearch } = useSearch();
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <nav className='navbar bg-base-100'>
      <div className='flex-1'>
        <Link className='btn btn-ghost normal-case text-xl' href='/'>
          TravWare
        </Link>
        <input
          type='text'
          placeholder='Search'
          value={search}
          onChange={handleSearch}
          className='input input-bordered w-full max-w-xs'
        />
      </div>
      <div className='flex-none'>
        <div className='dropdown dropdown-end'>
          <button className='btn btn-ghost btn-circle'>
            <div className='indicator'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M3 3h2l.4 2M7 13h10l1.6-8H6.4M5 21h14a2 2 0 002-2v-12H3v12a2 2 0 002 2z'
                />
              </svg>
              <span className='badge badge-sm indicator-item'>
                {totalItems}
              </span>
            </div>
          </button>
          <div
            tabIndex={0}
            className='mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow'
          >
            <div className='card-body'>
              <span className='font-bold text-lg'>{totalItems} Items</span>
              <span className='text-info'>
                Subtotal: ${totalPrice.toFixed(2)}
              </span>
              <div className='card-actions'>
                <Link href='/cart'>
                  <button className='btn btn-primary btn-block'>
                    View Cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
