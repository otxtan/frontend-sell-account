import React, { useEffect, useState } from 'react';
import productService from '../../services/productService';
import { Link } from 'react-router-dom';

const ShowAllProducts = () => {
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const [products, setProducts] = useState({
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await productService.getAllProductsDetailByPage({ page: 1, size: 20,name:''});
        // console.log(data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">Tất cả sản phẩm</h2>
      <div className="grid grid-cols-6 gap-4">
        {products?.items?.map((item) => (
          <Link to={`/product/${item?.product?.id}`}>

            <div key={item?.product?.id} className="border p-4">
              <img src={item?.product?.image} alt={item.product.name} className="mb-2 rounded-md" />
              <p className="font-bold">{item?.product?.name}</p>
              {item?.subscriptionPlans?.length > 1 ? (<span className='text-xl font-bold text-gray-900 flex flex-wrap'> {VND.format(item?.subscriptionPlans[0]?.price)}-{VND.format(item?.subscriptionPlans[item?.subscriptionPlans.length - 1].price)}</span>) : (<p>Giá: {VND.format(item.subscriptionPlans[0]?.price)}</p>)}

              {item?.subscriptionPlans?.discount && (
                <p>Giảm giá: {item?.subscriptionPlans?.discount}%</p>
              )}
              <p>Đã bán: {item?.totalSold}</p>
              <p>sao: {item?.rating}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShowAllProducts;
