export default function ProductCard({ onAddToCart, ...product }) {
  return (
    <div className='card bg-base-100 shadow-xl'>
      <figure>
        <img
          src='https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'
          alt='Shoes'
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
