import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/Cart.css';
import cartService from '../services/cartService';
import voucherService from '../services/voucherService';
import Modal from 'react-modal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

const Cart = () => {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const [cartItems, setCartItems] = useState([]);
    const [totalText, setTotalText] = useState('0');
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [voucher, setVoucher] = useState();
    const [voucherCode, setVoucherCode] = useState();
    const [checkVoucher, setCheckVoucher] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [InputVoucherCode, setInputVoucherCode] = useState();


    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 767);
        }

        window.addEventListener('resize', handleResize);
        handleResize(); // Kiểm tra kích thước ban đầu

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);





    useEffect(() => {
        const fetchData = async () => {
            try {

                const selectedItems = cartItems.filter(item => item.selected);
                const datavoucher = await voucherService.getvoucherbyproductcategory({ product: selectedItems });
                setVoucher(datavoucher);
                if (selectedItems.length >= 1 && selectedVoucher?.code) {
                    const data = await cartService.checkVoucher({ UserId: 1, Items: selectedItems, VoucherCode: selectedVoucher?.code });
                    setCheckVoucher(data);
                }
            } catch (error) {
                console.error('Error fetching products:', error.message);
            }
        };

        fetchData();
    }, [selectedVoucher, cartItems]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await cartService.getCartByUser(1);
                setCartItems(data);
                // const selectedItems = cartItems.filter(item => item.selected);
                // const datavoucher = await voucherService.getvoucherbyproductcategory({ product: selectedItems });
                // setVoucher(datavoucher);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);
    const showMessage = (message) => {
        toast.success(message, {
            position: 'top-right',
            autoClose: 3000, // Đóng tự động sau 3000 milliseconds (3 giây)
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const handleSelectVoucher = async (voucher) => {
        try {

            const selectedItems = cartItems.filter(item => item.selected);

            if (selectedItems.length >= 1) {
                setSelectedVoucher(voucher);
                const data = await cartService.checkVoucher({ UserId: 1, Items: selectedItems, VoucherCode: voucher?.code });
                setCheckVoucher(data);
                closeModal();
                return;
            }

            closeModal();
        } catch (error) {
            console.log(error.message)
        }
    };

    const getTotalPrice = () => {
        const selectedItems = cartItems.filter(item => item.selected);
        const subtotal = selectedItems.reduce((total, item) => total + (item?.Subscription_plan?.price - (item?.Subscription_plan?.price * item?.Subscription_plan?.discount_percentage / 100)) * item.quantity, 0);
        return subtotal - (subtotal * (discount / 100));
    };

    const removeFromCart = async (plan) => {
        try {
            await cartService.deleteItem(plan.id);
            const indexToDelete = cartItems.findIndex(obj => obj.id === plan.id);
            if (indexToDelete !== -1) {
                cartItems.splice(indexToDelete, 1);
                setCartItems([...cartItems]);
            }
            // setCartItems(data);
            // setQuantity((quantity + value));

        } catch (error) {
            console.error('Error fetching products:', error);
        }


    };

    const toggleSelect = (itemId) => {
        setCartItems(cartItems.map(item => (item.id === itemId ? { ...item, selected: !item.selected } : item)));
        console.log(checkVoucher)
        if (checkVoucher?.totalPayment) checkVoucher.totalPayment = null;
        if (checkVoucher?.totalDiscount) checkVoucher.totalDiscount = null;
        setSelectedVoucher(null);

    };
    const [selectedAll, setSelectedAll] = useState(false);
    const toggleSelectAll = () => {
        if (!selectedAll) {
            setCartItems(cartItems.map(item => (!item?.selected ? { ...item, selected: !item.selected } : item)));
            setSelectedAll(true);
        }
        else {
            setCartItems(cartItems.map(item => (item?.selected ? { ...item, selected: !item.selected } : item)));
            setSelectedAll(false);
        }
    }
    const applyVoucher = async () => {
        // setDiscount(10); // 10% discount for demonstration purposes
        try {
            const selectedItems = cartItems.filter(item => item.selected);
            const findVoucher = await voucherService.findVoucher(InputVoucherCode);
            if (!findVoucher)
                return showMessage("Voucher không tồn tại");
            if (selectedItems.length >= 1) {
                const data = await cartService.checkVoucher({ UserId: 1, Items: selectedItems, VoucherCode: InputVoucherCode });
                // setSelectedVoucher( await voucherService.findVoucher(selectedVoucher.code));
                setCheckVoucher(data);

                // return;
            }
        } catch (error) {
            console.log(error.message)
        }

    };
    const handleButtonClickQuantity = async (plan, value, quantity) => {
        try {
            console.log(plan)
            if (value + quantity <= (plan?.Subscription_plan.total - plan?.Subscription_plan.quantity_sold)) {
                await cartService.updateCart(plan.id, (value + quantity));
                const indexToDelete = cartItems.findIndex(obj => obj.id === plan.id && (quantity + value) <= 0);
                setCartItems(cartItems.map(item => (item.id === plan.id ? { ...item, quantity: value + quantity } : item)));
                if (indexToDelete !== -1) {
                    cartItems.splice(indexToDelete, 1);
                    setCartItems([...cartItems]);
                }
                console.log(cartItems)
                const selectedItems = cartItems.filter(item => item.selected);
                console.log(selectedItems)

                if (selectedItems.length >= 1 && selectedVoucher?.code) {
                    // setSelectedVoucher(voucher);
                    const data = await cartService.checkVoucher({ UserId: 1, Items: selectedItems, VoucherCode: selectedVoucher?.code });
                    setCheckVoucher(data);

                }
            }
            else {
                showMessage('vượt quá số lượng');
            }

        } catch (error) {
            console.error('Error fetching products:', error);
        }

    }

    const handleInputVoucherCode = async (event) => {
        setInputVoucherCode(event.target.value ? event.target.value : null);

    }
    const handleButtonCancel = () => {
        setSelectedVoucher(null);
        checkVoucher.totalPayment = null;
        checkVoucher.totalDiscount = null
    }
    const navigate = useNavigate();

    const navigateToCheckout = () => {
        const selectedItems = cartItems.filter(item => item.selected);
        console.log(selectedVoucher)
        navigate('/checkout', { state: { selectedItems: selectedItems, voucher: selectedVoucher } });
    };

    return (
        <div className='max-w-screen-lg mx-auto mt-10 p-6 shadow rounded-md shadow-md'>
            <p className="text-gray-600 mt-2">Số lượng sản phẩm: {cartItems.length}</p>
            <ToastContainer />{isMobile ? null : <div className="flex">

                <div className="w-1/6">{cartItems ? <input onClick={() => toggleSelectAll()} className='mx-4 h-5 w-5  text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    type="checkbox"
                    // checked={false}
                    // defaultValue={false}
                    onChange={() => { }}

                />

                    : null}</div>
                <div className="w-3/6">Sản phẩm</div>
                <div className="w-1/6">Số lượng</div>
                <div className="w-1/6">Số tiền</div>
                <div className="w-1/6">Thao Tác</div>
            </div>}

            <div>
                {cartItems.map(item => (
                    <section key={item.id} className={isMobile ? " flex flex-wrap items-center border-b border-gray-200 py-4 " : "flex items-center border-b border-gray-200 py-4 "}>

                        {(item?.Subscription_plan?.total >= item?.quantity) ?
                            <div className="w-1/6">
                                <input className='mx-4 h-5 w-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                    type="checkbox"
                                    checked={item.selected || false}
                                    // defaultValue={false}
                                    onChange={() => toggleSelect(item.id)}
                                    id={item?.Subscription_plan?.id}
                                />

                            </div>

                            : (item?.Subscription_plan?.total < item?.quantity) ? <p>Thay đổi giá trị lại</p> : null}


                        <div className="flex w-3/6 ">
                            <div className="w-1/3 ">
                                <img
                                    src={item?.Subscription_plan?.Product?.image}
                                    alt={item?.Subscription_plan?.Product?.image || '#'}

                                />
                            </div>
                            <div className="w-2/3">

                                <Link to={`/product/${item?.Subscription_plan?.Product?.id}`}>
                                    <span className="font-semibold text-base">{item?.Subscription_plan?.Product?.name}</span>
                                    <p className="text-gray-600">Price:  {VND.format(item?.Subscription_plan?.price - (item?.Subscription_plan?.price * item?.Subscription_plan?.discount_percentage / 100))} </p>
                                    <p className="text-gray-600"> {item?.Subscription_plan?.packed_name}</p>
                                    <p className="text-gray-600"> Còn lại: {item?.Subscription_plan?.total - item?.Subscription_plan?.quantity_sold}</p>
                                </Link>
                            </div>
                        </div>
                        <div className=" w-1/6" data-hs-input-number>

                            <div className="flex items-center p-1 border-2 border-gray-600 rounded-md w-fit ">
                                <button onClick={() => handleButtonClickQuantity(item, item.quantity, -1)} type="button" className="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-input-number-decrement>
                                    <svg className="flex-shrink-0 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14" /></svg>
                                </button>
                                <span className="px-4">{item.quantity}</span>
                                <button onClick={() => handleButtonClickQuantity(item, item.quantity, 1)} type="button" className="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-input-number-increment>
                                    <svg className="flex-shrink-0 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                </button>

                            </div>



                        </div>
                        <div className="w-1/6">

                            <p className="text-gray-600 ">{VND.format((item?.Subscription_plan?.price - (item?.Subscription_plan?.price * item?.Subscription_plan?.discount_percentage / 100)) * item?.quantity)} </p>
                        </div>
                        <div className="w-1/6">

                            <button onClick={() => removeFromCart(item)} className="text-red-500 hover:underline text-base mx-4">
                                Remove
                            </button>
                        </div>


                    </section>
                )

                )}
            </div>
            <div className='flex flex-col '>
                <div className="mb-6 mt-4 flex justify-end">

                    <button
                        className="bg-orange-500 text-white p-2 rounded-md focus:outline-none"
                        onClick={openModal}
                    >
                        chọn voucher
                    </button>


                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        style={{
                            content: {
                                width: '50%', // Thiết lập chiều rộng
                                height: '50%', // Thiết lập chiều cao
                                margin: 'auto',
                            },
                        }}
                    >
                        <div className='flex justify-between p-2'>
                            <h2>Voucher</h2>
                            <p>Chọn Voucher</p>
                            <button className='bg-orange-400 p-2 rounded-md ' onClick={closeModal}>Close</button>
                        </div>
                        <div className="max-h-screen overflow-y-scroll p-4">
                            <h2 className="text-xl font-semibold mb-4">Chọn Voucher</h2>
                            <div className="voucher-container">
                                {voucher?.map(item => (
                                    <div
                                        key={item.code}
                                        className="cursor-pointer mb-4 p-2 hover:bg-gray-100 rounded-md voucher-item"
                                        onClick={() => handleSelectVoucher(item)}
                                    >
                                        <h3 className="text-lg font-semibold">{item?.code}-{item?.discount_percentage == 0 ? (`Giảm ${item.discount_amount}đ`) : (`Giảm ${item.discount_percentage}%`)}</h3>
                                        <p className="text-gray-600 mb-2">{`Đơn Tối Thiểu ₫${item.min_order_amount}k`}</p>
                                        <p className="text-gray-600">{`HSD: ${new Date(item.end_date).toLocaleDateString()} - ${new Date(item.end_date).toLocaleTimeString()}`}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Modal>
                </div>
                <div className="mt-4 flex justify-end">
                    {/* <label className="block text-gray-600">Voucher Code:</label> */}
                    <input
                        type="text"
                        placeholder="Enter voucher code"
                        className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-orange-500"
                        // value={voucherCode}
                        onChange={handleInputVoucherCode}
                    />
                    <button onClick={applyVoucher} className="bg-orange-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-orange-600">
                        Áp dụng Voucher
                    </button>

                </div>
                {
                    selectedVoucher ? (<div
                        key={selectedVoucher?.code}
                        className="my-2 cursor-pointer bg-orange-100 mb-4 p-2 hover:bg-gray-100 rounded-md voucher-item shadow"
                    // onClick={() => handleSelectVoucher(selectedVoucher)}
                    >
                        <h3 className="text-lg font-semibold">{selectedVoucher?.code} - {selectedVoucher?.discount_percentage == 0 ? (`Giảm ${selectedVoucher?.discount_amount}đ`) : (`Giảm ${selectedVoucher?.discount_percentage}%`)}</h3>
                        <p className="text-gray-600 mb-2">{`Đơn Tối Thiểu ₫${selectedVoucher?.min_order_amount}k`}</p>
                        <p className="text-gray-600">{`HSD: ${new Date(selectedVoucher?.end_date).toLocaleDateString()} - ${new Date(selectedVoucher?.end_date).toLocaleTimeString()}`}</p>
                        {
                            selectedVoucher ? <button className=' p-2 bg-orange-500 shadow rounded-md text-white my-3' onClick={() => handleButtonCancel()}>Remove</button> : null
                        }
                    </div>) : null

                }

            </div>
            <p className="text-lg font-semibold mt-4">total: {VND.format(getTotalPrice().toFixed(2) || checkVoucher?.total?.toFixed(2))}</p>
            <p className="text-lg font-semibold mt-4">totalDiscount: {VND.format(checkVoucher?.totalDiscount?.toFixed(2) || 0)}</p>
            <p className="text-lg font-semibold mt-4">totalPayment: {VND.format(checkVoucher?.totalPayment?.toFixed(2) || getTotalPrice().toFixed(2))}</p>


            {/* Nút Mua Hàng */}
            {/* <Link to="/checkout"> */}
            <button onClick={() => navigateToCheckout()} className=" bg-orange-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-600">
                Mua Hàng
            </button>
            {/* </Link> */}

            {/* Hiển thị số lượng sản phẩm trong giỏ hàng */}

        </div>
    );
};

export default Cart;
