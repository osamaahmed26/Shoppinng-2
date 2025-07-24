import React, { useEffect, useState } from 'react';
import image1 from '../assets/banner_tablet_new.png';
import CategorySection from '../components/CategorySection';
import ProductSection from '../components/ProductSection';

export default function Home({ searchTerm }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark';
    setDarkMode(isDark);
  }, []);

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <img src={image1} alt="" className="img-fluid w-100" />
      <CategorySection />
      <ProductSection searchTerm={searchTerm} />
    </div>
  );
}