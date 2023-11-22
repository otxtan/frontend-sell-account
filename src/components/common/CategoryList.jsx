import React, { useEffect, useState } from 'react';
import productService from '../../services/productService';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch danh sách danh mục và sản phẩm từ API hoặc service của bạn
        const data = await productService.getAllCategories();
        console.log(data)
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      {categories.map((category) => (
        
        <div key={category.id} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
          <div className="grid grid-cols-3 gap-4">
            {category.products.map((product) => (
              <div key={product.id} className='rounded-md bg-gray-200'>
                <img src={product.image} alt={product.name} className='rounded-md' />
                <p className="font-bold">{product.name}</p>
                <p>Giá: ${product.price}</p>
                {product.discount && (
                  <p>Giảm giá: {product.discount}%</p>
                )}
                <p>Đã bán: {product.soldQuantity}</p>
                <p>Số sao: {product.rating}</p>
              </div>
            ))}
          </div>
          <button className="mx-auto bg-orange-500 text-white px-4 py-2 rounded-md">Xem Thêm</button>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
