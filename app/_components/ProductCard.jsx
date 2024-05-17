import Image from 'next/image';

export default function ProductCard({ onAddToCart, ...product }) {
  return (
    <div className='card max-w-[500px] h-[500px] bg-base-100 shadow-xl transform transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105'>
      <figure className='overflow-hidden'>
        <Image
          src={product.image}
          alt={product.name}
          className='transition duration-500 ease-in-out transform hover:scale-100 w-auto h-auto'
          width={500}
          height={500}
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>
          {product.name}
          <div className='badge badge-secondary text-nowrap'>
            $ {product.price}
          </div>
        </h2>
        <p>{product.description}</p>
        <div className='card-actions justify-end'>
          <button className='btn btn-primary' onClick={onAddToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
