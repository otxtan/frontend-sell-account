import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import cartService from '../services/cartService';
import voucherService from '../services/voucherService';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { data } from 'jquery';
import paymentService from '../services/paymentService';
Modal.setAppElement('#root');
const Checkout = () => {
    const location = useLocation();

    const [cartItems, setCartItems] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(location.state.voucher);
    const [voucher, setVoucher] = useState();
    const [checkVoucher, setCheckVoucher] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const [discount, setDiscount] = useState(0);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const handleSelectVoucher = (voucher) => {
        setSelectedVoucher(voucher);
        closeModal();
    };
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
    const [voucherCode, setVoucherCode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState();
    const [InputVoucherCode, setInputVoucherCode] = useState();
    const [paymentMethods, setPaymentMethods] = useState([]);
    const handleInputVoucherCode = async (event) => {
        setInputVoucherCode(event.target.value ? event.target.value : null);

    }

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
                setPaymentMethods(await paymentService.getAllPayment());




            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {

                console.log(location)

                setCartItems(location.state.selectedItems)
                // setSelectedVoucher();

                const selectedItems = cartItems.filter(item => item.selected);

                if (selectedItems.length >= 1 && selectedVoucher?.code) {
                    const data = await cartService.checkVoucher({ UserId: 1, Items: selectedItems, VoucherCode: selectedVoucher?.code });
                    setCheckVoucher(data);
                }

                const datavoucher = await voucherService.getvoucherbyproductcategory({ product: location.state.selectedItems });
                console.log(selectedVoucher)
                setVoucher(datavoucher);
            } catch (error) {
                console.error('Error fetching products:', error.message);
            }
        };

        fetchData();
    }, [selectedVoucher, cartItems]);
    const handlePaymentMethodChange = (method) => {
        
        setPaymentMethod(method);
    };

    const handleCheckout = () => {
        // Xử lý logic thanh toán, có thể gọi API để xác nhận đơn hàng
        // console.log('Checking out with payment method:', paymentMethod);
    };

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
    const handleButtonCancel = () => {
        setSelectedVoucher(null);
        checkVoucher.totalPayment = null;
        checkVoucher.totalDiscount = null
    }
    const getTotalPrice = () => {
        const selectedItems = cartItems.filter(item => item.selected);
        const subtotal = selectedItems.reduce((total, item) => total + (item?.Subscription_plan?.price - (item?.Subscription_plan?.price * item?.Subscription_plan?.discount_percentage / 100)) * item.quantity, 0);
        return subtotal - (subtotal * (discount / 100));
    };

    return (
        <div className="max-w-screen-lg mx-auto mt-10 p-6 bg-whitey-100 rounded-md shadow-md">
            <ToastContainer />
            <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
            <div>
                {cartItems?.map(item => (
                    <section key={item.id} className={isMobile ? " flex flex-wrap items-center border-b border-gray-200 py-4 " : "flex items-center border-b border-gray-200 py-4 "}>
                        <div className="flex w-4/6 ">
                            <div className="w-1/3 ">
                                <img
                                    src={item?.Subscription_plan?.Product?.image}
                                    alt={item?.Subscription_plan?.Product?.image || '#'}

                                />
                            </div>
                            <div className="w-2/3">
                                <span className="font-semibold text-base">{item?.Subscription_plan?.Product?.name}</span>
                                <p className="text-gray-600">Price:  {VND.format(item?.Subscription_plan?.price - (item?.Subscription_plan?.price * item?.Subscription_plan?.discount_percentage / 100))} </p>
                                <p className="text-gray-600"> {item?.Subscription_plan?.packed_name}</p>
                                <p className="text-gray-600"> Còn lại: {item?.Subscription_plan?.total - item?.Subscription_plan?.quantity_sold}</p>
                            </div>
                        </div>
                        <div className=" w-1/6" data-hs-input-number>

                            <div className="flex items-center p-1 border-2 border-gray-600 rounded-md w-fit ">
                                <span className="px-4">{item.quantity}</span>
                            </div>
                        </div>
                        <div className="w-1/6">

                            <p className="text-gray-600 ">{VND.format((item?.Subscription_plan?.price - (item?.Subscription_plan?.price * item?.Subscription_plan?.discount_percentage / 100)) * item?.quantity)} </p>
                        </div>

                    </section>
                )

                )}
            </div>
            <div className="mb-6 mt-4 flex justify-end">
                {/* <label className="block text-gray-700 text-sm font-bold mb-2">Voucher Code</label> */}
                <button
                    className="bg-orange-500 text-white p-2 rounded-md focus:outline-none"
                    onClick={openModal}
                >
                    chọn Voucher
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
                    Apply Voucher
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
            {/* Section: Payment Method */}
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Payment Method</label>
                {paymentMethods?.map(item => (

                    <div className="flex">
                        <label className="flex items-center cursor-pointer mr-4">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="creditCard"
                                // checked={paymentMethod === 'creditCard'}
                                onChange={() => handlePaymentMethodChange(item)}
                            />
                            <span className="ml-2">{item.Payment_name}</span>
                        </label>



                    </div>
                ))}
            </div>
            

            {/* Section: Order Summary */}


            {/* Button: Checkout */}
            <p className="text-lg font-semibold mt-4">total: {VND.format(getTotalPrice().toFixed(2) || checkVoucher?.total?.toFixed(2))}</p>
            <p className="text-lg font-semibold mt-4">totalDiscount: {VND.format(checkVoucher?.totalDiscount?.toFixed(2) || 0)}</p>
            <p className="text-lg font-semibold mt-4 mb-4">totalPayment: {VND.format(checkVoucher?.totalPayment?.toFixed(2) || getTotalPrice().toFixed(2))}</p>

            <button
                className="w-full bg-orange-500 text-white p-3 rounded-md hover:bg-orange-600 transition-all duration-300"
                onClick={handleCheckout}
            >
                Thanh Toán 
            </button>
        </div>
    );
};

export default Checkout;
