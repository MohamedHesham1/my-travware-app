'use client';
import { useEffect, useState } from 'react';
import products from './_data/products.json';
import { useSearch } from './_context/SearchContext';
import ProductCard from './_components/ProductCard';
import { useCart } from './_context/CartContext';

export default function Home() {
  const { search } = useSearch();
  const { cart, setCart } = useCart();
  const [items, setItems] = useState(products);
  const [filteredItems, setFilteredItems] = useState(products);
  const [sortOrder, setSortOrder] = useState('');
  const [maxPrice, setMaxPrice] = useState(100);
  const [priceRange, setPriceRange] = useState(100);

  useEffect(() => {
    // Determine the maximum price from the product list
    const maxProductPrice = Math.max(...products.map((item) => item.price));
    setMaxPrice(maxProductPrice);
    setPriceRange(maxProductPrice);
  }, [products]);

  useEffect(() => {
    filterItems(search, sortOrder, priceRange);
  }, [search, sortOrder, priceRange]);

  const handleSort = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    filterItems(search, order, priceRange);
  };

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
    filterItems(search, sortOrder, value);
  };

  const handleAddToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: Math.min(cartItem.quantity + 1, cartItem.inStock),
              }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const filterItems = (searchQuery, order, range) => {
    let filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery) && item.price <= range
    );

    if (order === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (order === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (order === 'name-asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === 'name-desc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredItems(filtered);
  };

  return (
    <main className='p-4'>
      <div className='flex flex-col md:flex-row md:justify-between mb-4'>
        <div className='form-control mb-4 md:mb-0'>
          <label className='label'>
            <span className='label-text'>Sort by:</span>
          </label>
          <select
            onChange={handleSort}
            className='select select-bordered w-full md:w-auto'
          >
            <option value=''>Select an option</option>
            <option value='price-asc'>Price: Low to High</option>
            <option value='price-desc'>Price: High to Low</option>
            <option value='name-asc'>Name: A to Z</option>
            <option value='name-desc'>Name: Z to A</option>
          </select>
        </div>

        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>Filter by price:</span>
          </label>
          <input
            type='range'
            min='0'
            max={maxPrice}
            value={priceRange}
            className='range range-primary'
            onChange={(e) => handlePriceRangeChange(Number(e.target.value))}
          />
          <div className='text-center mt-2'>
            <span className='badge badge-primary'>Up to ${priceRange}</span>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-6'>
        {filteredItems.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>
    </main>
  );
}
