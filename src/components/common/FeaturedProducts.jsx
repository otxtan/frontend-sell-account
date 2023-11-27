import React, { useEffect, useState } from 'react';
import productService from '../../services/productService';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const [products, setProducts] = useState({
    "totalItems": 2,
    "items": [
        {
            "product": {
                "id": 1,
                "name": "Tài khoản spotify",
                "description": "Giảm 10% khi mua gói từ 1 năm trở lên",
                "content": "content",
                "image": "image",
                "thumbnail": "thumbnai",
                "published": true,
                "createdAt": "2023-11-12T17:35:34.000Z",
                "updatedAt": "2023-11-12T17:35:34.000Z",
                "ProductCategoryId": 1,
                "ProductTypeId": 1
            },
            "subscriptionPlans": [
                {
                    "id": 1,
                    "packed_name": "6 tháng",
                    "total": "1000",
                    "quantity_sold": "0",
                    "duration": 3,
                    "discount_percentage": 10,
                    "price": 100000,
                    "createdAt": "2023-11-12T17:36:01.000Z",
                    "updatedAt": "2023-11-12T17:36:01.000Z",
                    "ProductId": 1
                },
                {
                    "id": 2,
                    "packed_name": "3 tháng",
                    "total": "100",
                    "quantity_sold": "0",
                    "duration": 3,
                    "discount_percentage": 10,
                    "price": 100000,
                    "createdAt": "2023-11-16T08:40:37.000Z",
                    "updatedAt": "2023-11-16T08:40:37.000Z",
                    "ProductId": 1
                }
            ],
            "totalSold": 1,
            "rating": 0,
            "reviews": []
        },
        
    ],
    "totalPages": 1,
    "currentPage": 0
});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await productService.getAllProductsByPage({page:1,size:5,categoryname:'Mạng xã hội'});
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
      <h2 className="text-2xl font-bold mb-4">Sản Phẩm Nổi Bật</h2>
      <div className="grid grid-cols-3 gap-4">
        {products?.items?.map((item) => (
          <Link to={`/product/${item?.product?.id}`}>

            <div key={item?.product?.id} className="border p-4">
              <img src={item?.product?.image!=""?item?.product?.image:'https://gamikey.com/wp-content/uploads/2023/08/Banner-Kapersky.png.webp'} alt={item.product.name} className="mb-2" />
              <p className="font-bold">{item?.product?.name}</p>
              {item?.subscriptionPlans?.length>1?(<p>Giá: ${item?.subscriptionPlans[0]?.price}-{item?.subscriptionPlans[item?.subscriptionPlans.length-1].price}</p>):(<p>Giá: ${item.subscriptionPlans[0]?.price}</p>)}
              
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
