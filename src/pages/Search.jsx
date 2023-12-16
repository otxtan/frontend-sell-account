import React, { useEffect, useState } from 'react';
import productService from '../services/productService';
import { Link, useLocation } from 'react-router-dom';

const SearchProduct = () => {
    const location = useLocation();
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const [products, setProducts] = useState({
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(location.state)
                const data = await productService.getAllProductsDetailByPage({ page: 1, size: 20, name: location.state.InputSearch });
                // console.log(data);
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, [location.state.InputSearch]);

    return (
        <div className="mx-20 my-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Result for: {location.state.InputSearch}</h2>
            <div className="grid grid-cols-6 gap-4">
                {products?.items?.map((item) => (
                    <Link to={`/product/${item?.product?.id}`}>

                        <div key={item?.product?.id} className="border p-4">
                            <img src={item?.product?.image} alt={item.product.name} className="mb-2 rounded-md" />
                            <p className="font-bold">{item?.product?.name}</p>
                            {item?.subscriptionPlans?.length > 1 ? (<div className=' font-bold text-gray-900 flex flex-wrap'>
                                <span>
                                    {VND.format(item?.subscriptionPlans[0]?.price)}

                                </span> -
                                <span>
                                    {VND.format(item?.subscriptionPlans[item?.subscriptionPlans.length - 1].price)}
                                </span></div>) : (<p>Giá: {VND.format(item.subscriptionPlans[0]?.price)}</p>)}

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

export default SearchProduct;
