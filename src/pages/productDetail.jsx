import React, { useEffect, useState } from 'react';
import productService from '../services/productService';
import { Navigate, Outlet, useNavigate, useParams,Link } from 'react-router-dom';
import Alert from '../components/common/Alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cartService from '../services/cartService';
import { useUser } from '../context/userProvider';

const ProductDetail = (props) => {

  const { user, login, logout, cartContext, setCartContext } = useUser();
  const { id } = useParams();
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const [product, setProduct] = useState({});
  const [ProductSimilar,setProductSimilar]=useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id)
        const data = await productService.getProductDetail(id || props.value.value.id);
        console.log(data)
        setProductSimilar(await productService.getAllProductsByCategoryByPage({ page: 1, size: 10, categoryname: data.product.Product_category.product_category_name }));
        if (data.length <= 1)
          setPlanChoose(data.subscriptionPlans[0].id)
        setProduct(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [id]);
  const [activeButton, setActiveButton] = useState(null);
  const [pricePlan, setPricePlan] = useState(null);
  const [priceOldPlan, setPriceOldPlan] = useState(null);
  const [planChoose, setPlanChoose] = useState(null);
  const [discountPercentage, setDiscountPercentage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alert, setAlert] = useState('');
  const handleButtonClickQuantity = async (value) => {
    console.log(value)
    console.log(planChoose)

    if (planChoose > 0) {
      console.log(product)
      const foundProduct = product.subscriptionPlans.find(item => item.id === planChoose);

      if (foundProduct.total - foundProduct.quantity_sold < 0 || quantity + value > foundProduct.total - foundProduct.quantity_sold) {
        Alert.showMessage('Vượt quá số lượng')
        return;
      };
      if (quantity + value < 1) return;
      setQuantity(quantity + value);

    } else {
      if (product?.subscriptionPlans?.length == 1) {
        if (product?.subscriptionPlans?.total - product?.subscriptionPlans?.quantity_sold < 0 || quantity + value > product?.subscriptionPlans?.total - product?.subscriptionPlans?.quantity_sold) {
          Alert.showMessage('Vượt quá số lượng')
          return;
        };
        if (quantity + value < 1) return;
        setQuantity(quantity + value);
      }
    }
  }
  const handleButtonClick = (plan) => {
    console.log(plan)
    console.log(planChoose)
    // console.log('nội dung'+plan.price)
    if (planChoose === null) {
      setPlanChoose(plan.id);
      setActiveButton(true);
      setPriceOldPlan(plan.price);
      setDiscountPercentage(plan.discount_percentage);
      setPricePlan(plan.price - (plan.price * plan.discount_percentage / 100))
    }
    else if (plan.id !== planChoose) {
      setPlanChoose(plan.id);
      setActiveButton(true);
      setPriceOldPlan(plan.price);
      setDiscountPercentage(plan.discount_percentage);
      setPricePlan(plan.price - (plan.price * plan.discount_percentage / 100))
    } else if (plan.id === planChoose) {
      setPlanChoose(null);
      setActiveButton(false);
      setPricePlan(0);
      setPriceOldPlan(0);
      setDiscountPercentage(0);
    }

  };
  const navigate = useNavigate();
  const handleButtonClickBuyNow = () => {
    if (user) {
      if (planChoose != null) {
        navigate('/checkout', { state: { selectedItems: [{ SubscriptionPlanId: planChoose, quantity }] }, voucher: "" })
      }

      else {
        Alert.showMessage('Hãy chọn sản phẩm');
      }
    }
    else {
      Alert.showMessage('Vui lòng đăng nhập');
    }
  }
  const handleButtonClickAddToCart = async () => {
    try {

      if (user) {

        console.log(user)
        if (planChoose != null) {
          const data = await cartService.addToCart({
            UserId: user.UserId,
            SubscriptionPlanId: planChoose,
            quantity: quantity
          });
          if (data?.id) {
            Alert.showMessage('Thêm vào giỏ hàng thành công');
            const dataCart = await cartService.getCartByUser(user?.UserId || null);
            setCartContext(dataCart);


          }
        } else {
          if (product?.subscriptionPlans?.length == 1) {
            console.log()
            const data = await cartService.addToCart({
              UserId: user.UserId,
              SubscriptionPlanId: (product?.subscriptionPlans[0]?.id),
              quantity: quantity
            });
            if (data?.id) {
              Alert.showMessage('Thêm vào giỏ hàng thành công');
              const dataCart = await cartService.getCartByUser(user.UserId || null);
              setCartContext(dataCart);


            }
          }
        }
      } else {
        Alert.showMessage('Vui lòng đăng nhập');
      }


    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }


  const gridContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
  };

  const gridItemStyle = {
    width: 'calc(33.33% - 20px)',
    margin: '10px',
    boxSizing: 'border-box',
    backgroundColor: '#e0e0e0',
    padding: '20px',
    textAlign: 'center',
  };

  const responsiveGridItemStyle = {
    '@media (max-width: 767px)': {
      width: 'calc(50% - 20px)',
    },
    '@media (max-width: 479px)': {
      width: '100%',
    },
  };
  return (
    <div className="container mx-auto mt-10 p-6 bg-white rounded-md shadow-md">


      <div className="flex">
        <div className="w-1/2">
          <img src={product?.product?.image} alt={product?.product?.name} className="rounded-lg object-cover mx-auto" />
        </div>
        <div className="w-1/2 ml-6">
          <h2 className="text-2xl font-semibold mb-4">{product?.product?.name}</h2>
          <div style={gridContainerStyle}>
            <div className=''>
              <p className="font-semibold">Price:</p>
              {activeButton ? (<div>
                <div className='flex'>
                  <p className="text-3xl font-bold text-gray-900">{VND.format(pricePlan)}</p>
                  <del className="ml-2 align-super text-base font-bold text-gray-600"> {VND.format(priceOldPlan)} </del>
                </div>
                <div className="mt-3 flex items-center text-sm font-medium text-gray-600">
                  <svg className="mr-2 block h-4 w-4 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" className=""></path>
                  </svg>
                  Save {discountPercentage}% right now
                </div>
              </div>) : product?.subscriptionPlans?.length > 1 ? (<div>
                <div className='flex'>
                  <p className="text-3xl font-bold text-gray-900">{VND.format(product?.subscriptionPlans[0]?.price - (product?.subscriptionPlans[0]?.price * product?.subscriptionPlans[0]?.discount_percentage / 100))}&nbsp;-&nbsp;{VND.format(product?.subscriptionPlans[product?.subscriptionPlans?.length - 1]?.price - (product?.subscriptionPlans[product?.subscriptionPlans?.length - 1]?.price * product?.subscriptionPlans[product?.subscriptionPlans?.length - 1]?.discount_percentage / 100))}</p>
                  <del className="ml-2 align-super text-base font-bold text-gray-600"> {VND.format(product?.subscriptionPlans[0]?.price)}&nbsp;-&nbsp;{VND.format(product?.subscriptionPlans[product?.subscriptionPlans?.length - 1]?.price)} </del>
                </div>
                <div className="mt-3 flex items-center text-sm font-medium text-gray-600">
                  <svg className="mr-2 block h-4 w-4 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" className=""></path>
                  </svg>
                  Save {discountPercentage}% right now
                </div>
              </div>
              )
                : (<p className="text-lg font-semibold text-gray-800">{VND.format(product?.subscriptionPlans?.[0]?.price)}</p>)}
              {/* <p className="text-lg font-semibold text-gray-800"></p> */}


              {/* <p className="text-lg font-semibold text-gray-800">${product.subscriptionPlans.price}</p> */}

              {/* {
                product.discount && (
                  <p className="text-sm text-gray-500 line-through">${product.originalPrice}</p>
                )} */}
              {/* {product.discount && (
                <p className="text-green-500">{`Save $${product.discount} with discount!`}</p>
              )} */}
            </div>
            <div>

              <p className="text-gray-800"><span className="font-semibold">Sold:</span> {product?.totalSold} units</p>
            </div>
          </div>
          <div className="mb-6">
            <p className="font-semibold">Rating:</p>
            <p className="text-gray-800 ">{product?.rating} &nbsp;
              <i className="fa-solid fa-star "></i>
              <i className="fa-solid fa-star "></i>
              <i className="fa-solid fa-star "></i>
              <i className="fa-solid fa-star "></i>
              <i className="fa-solid fa-star "></i>
            </p>
          </div>
          <section>
            {/* <p className="font-semibold">Loại :</p> */}
            <div>
              {product?.subscriptionPlans?.length > 1 ?
                product.subscriptionPlans.map((item) =>
                  (<button className={`p-3 border-2 border-gray-600 mx-1 rounded-md my-1 ${item.id === planChoose && activeButton ? 'bg-gray-600' : ''}`} onClick={() => handleButtonClick(item)} key={item.id}>{item.packed_name}</button>)
                ) : <></>

              }

            </div>
          </section>

          {/* <div className="p-2 border-2 border-gray-600 mx-1 rounded-md my-2 w-1/3" data-hs-input-number>
            <div className="w-full flex justify-between items-center gap-x-5">
              <div className="grow">

                <input className="w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 " type="text" value={quantity} data-hs-input-number-input />
              </div>
              <div className="flex justify-end items-center gap-x-1.5">
                <button onClick={() => handleButtonClickQuantity(-1)} type="button" className="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-input-number-decrement>
                  <svg className="flex-shrink-0 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /></svg>
                </button>
                <button onClick={() => handleButtonClickQuantity(1)} type="button" className="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-input-number-increment>
                  <svg className="flex-shrink-0 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                </button>
              </div>
            </div>
          </div> */}
          <div className=" w-1/6" data-hs-input-number>

            <div className="flex items-center p-1 border-2 border-gray-600 rounded-md w-fit ">
              <button onClick={() => handleButtonClickQuantity(-1)} type="button" className="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-input-number-decrement>
                <svg className="flex-shrink-0 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /></svg>
              </button>
              <span className="px-4">{quantity}</span>
              <button onClick={() => handleButtonClickQuantity(1)} type="button" className="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-input-number-increment>
                <svg className="flex-shrink-0 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
              </button>

            </div>



          </div>

          <div>
            <button className='p-3 border-2 border-gray-600 mx-1 rounded-md my-2 w-3/4' onClick={() => handleButtonClickBuyNow()} >Buy Now</button>
            <button className='p-3 border-2 border-gray-600 mx-1 rounded-md bg-orange-500 my-2 w-3/4' onClick={() => handleButtonClickAddToCart()}>Add to cart</button>
          </div>
          <div className='mb-6'></div>
          <div className="mb-6">
            <p className="font-semibold">Description:</p>
            {/* <p className="text-gray-700 mb-4">{product?.product?.description}</p> */}
            <div dangerouslySetInnerHTML={{ __html: product?.product?.description }} />
          </div>
          <div className="mb-6">
            <p className="font-semibold">Content:</p>
            <p className="text-gray-700 mb-4">{product?.product?.content}</p>
          </div>
        </div>

      </div>

      {/* Similar Products Section */}
      {/* <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Similar Products</h3>
        <div className="grid grid-cols-3 gap-6">
          {product.similarProducts.map((similarProduct) => (
            <div key={similarProduct.id} className="flex flex-col items-center">
              <img
                src={similarProduct.image}
                alt={similarProduct.name}
                className="rounded-lg mb-2"
              />
              <p className="text-sm font-semibold">{similarProduct.name}</p>
            </div>
          ))}
        </div>
      </div> */}
      <h2 className='p-10 font-bold text-xl' >Sản phẩm tương tự</h2>
      <div className="grid grid-cols-6 gap-4 ">
        {ProductSimilar?.items?.map((item) => (
          <Link to={`/product/${item?.product?.id}`}>

            <div key={item?.product?.id} className="border p-4">
              <img src={item?.product?.image} alt={item.product.name} className="mb-2 rounded-md" />
              <p className="font-bold">{item?.product?.name}</p>
              {item?.subscriptionPlans?.length > 1 ? (<span className='font-bold text-gray-900 '> {VND.format(item?.subscriptionPlans[0]?.price)}-{VND.format(item?.subscriptionPlans[item?.subscriptionPlans.length - 1].price)}</span>) : (<p>Giá: {VND.format(item.subscriptionPlans[0]?.price)}</p>)}

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

export default ProductDetail;
