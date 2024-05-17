'use client';
import { useEffect, useState } from 'react';
import Navbar from './_components/Navbar';
export default function Home() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  useEffect(() => {
    setItems(products);
    setFilteredItems(products);
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    filterItems(query, sortOrder, priceRange);
  };

  return (
    <main>
      <Navbar onChange={handleSearch} value={search} />

      <div className='form-control'>
      </div>
    </main>
  );
}
