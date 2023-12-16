import React, { useEffect, useState } from 'react';
import productService from '../../services/productService';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const [EntertainmentProducts, setEntertainmentProducts] = useState({ });
  const [LearnProducts, setLearnProducts] = useState({ });

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        setEntertainmentProducts(await productService.getAllProductsByCategoryByPage({ page: 1, size: 10, categoryname: 'Giải trí' }));
        setLearnProducts( await productService.getAllProductsByCategoryByPage({ page: 1, size: 10, categoryname: 'học tập' }));
        // console.log(data);
        
        //  await productService.getAllProductsByCategoryByPage({ page: 1, size: 10, categoryname: 'Giải trí' });
        // // console.log(data);
        // setEntertainmentProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">Giải trí</h2>
      <div className="grid grid-cols-6 gap-4">
        {EntertainmentProducts?.items?.map((item) => (
          <Link to={`/product/${item?.product?.id}`}>

            <div key={item?.product?.id} className="border p-4">
<<<<<<< HEAD
              <img src={item?.product?.image} alt={item.product.name} className="mb-2 rounded-md" />
=======
              <img src={item?.product?.image} alt={item.product.name} className="mb-2" />
>>>>>>> 79902f3a1394406acf659bf62439a1c304624056
              <p className="font-bold">{item?.product?.name}</p>
              {item?.subscriptionPlans?.length > 1 ? (<p className='text-xl font-bold text-gray-900'> {VND.format(item?.subscriptionPlans[0]?.price)}-{VND.format(item?.subscriptionPlans[item?.subscriptionPlans.length - 1].price)}</p>) : (<p>Giá: {VND.format(item.subscriptionPlans[0]?.price)}</p>)}

              {item?.subscriptionPlans?.discount && (
                <p>Giảm giá: {item?.subscriptionPlans?.discount}%</p>
              )}
              <p>Đã bán: {item?.totalSold}</p>
              <p>sao: {item?.rating}</p>
            </div>
          </Link>
        ))}
      </div>
      <h2 className="text-2xl font-bold mb-4">Học tập</h2>
      <div className="grid grid-cols-6 gap-4">
        {LearnProducts?.items?.map((item) => (
          <Link to={`/product/${item?.product?.id}`}>

            <div key={item?.product?.id} className="border p-4">
              <img src={item?.product?.image} alt={item.product.name} className="mb-2 rounded-md" />
              <p className="font-bold">{item?.product?.name}</p>
              {item?.subscriptionPlans?.length > 1 ? (<span className='text-xl font-bold text-gray-900 '> {VND.format(item?.subscriptionPlans[0]?.price)}-{VND.format(item?.subscriptionPlans[item?.subscriptionPlans.length - 1].price)}</span>) : (<p>Giá: {VND.format(item.subscriptionPlans[0]?.price)}</p>)}

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

export default FeaturedProducts;
