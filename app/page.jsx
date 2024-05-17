'use client';
import { useEffect, useState } from 'react';
import Navbar from './_components/Navbar';
import ProductCard from './_components/ProductCard';
import products from './_data/products.json';

export default function Home() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  useEffect(() => {
    setItems(products);
    setFilteredItems(products);
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    filterItems(query, sortOrder, priceRange);
  };

  const handleSort = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    filterItems(search, order, priceRange);
  };

  const handlePriceRange = (e) => {
    const [min, max] = e.target.value.split('-').map(Number);
    setPriceRange([min, max]);
    filterItems(search, sortOrder, [min, max]);
  };

  const filterItems = (searchQuery, order, range) => {
    let filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery) &&
        item.price >= range[0] &&
        item.price <= range[1]
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
    <main>
      <Navbar onChange={handleSearch} value={search} />

      <div className='form-control'>
        <select
          onChange={handleSort}
          className='input input-bordered w-24 md:w-auto'
        >
          <option value=''>Sort by</option>
          <option value='price-asc'>Price: Low to High</option>
          <option value='price-desc'>Price: High to Low</option>
          <option value='name-asc'>Name: A to Z</option>
          <option value='name-desc'>Name: Z to A</option>
        </select>
      </div>

      <div className='form-control'>
        <select
          onChange={handlePriceRange}
          className='input input-bordered w-24 md:w-auto'
        >
          <option value='0-100'>All Prices</option>
          <option value='0-10'>0 - 10</option>
          <option value='10-20'>10 - 20</option>
          <option value='20-30'>20 - 30</option>
        </select>
      </div>

      <div className='grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-4 p-4'>
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
