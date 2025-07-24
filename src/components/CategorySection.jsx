import React from 'react';
import image1 from '../assets/clothes.jpg';
import image2 from '../assets/shoes.jpg';
import image3 from '../assets/electronics.jpg';
import image4 from '../assets/makeup.jpg';
import './CategorySection.css';

const categories = [
  { title: 'ملابس', image: image1 },
  { title: 'أحذية', image: image2 },
  { title: 'إلكترونيات', image: image3 },
  { title: 'مكياج', image: image4 },
];

export default function CategorySection() {
  return (
    <div className="category-section container my-5">
      <h2 className="text-center mb-4">تصفح الفئات</h2>
      <div className="row">
        {categories.map((cat, index) => (
          <div className="col-md-3 text-center mb-4" key={index}>
            <img src={cat.image} className="img-fluid rounded category-img" alt={cat.title} />
            <h5 className="mt-2">{cat.title}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}
