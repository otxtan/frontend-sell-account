import React, { useState } from 'react';
import VoucherModal from '../components/common/VoucherModal';

const Checkout = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Product A', price: 20.0, quantity: 2, category: 'Electronics', image: 'https://gamikey.com/wp-content/uploads/2023/09/Adobe-Pro-Edition-Banner-1536x768.png', selected: false },
        { id: 2, name: 'Product B', price: 30.5, quantity: 1, category: 'Clothing', image: 'path/to/productB.jpg', selected: false },
    ]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleSelectVoucher = (voucher) => {
        setSelectedVoucher(voucher);
        closeModal();
    };

    const [voucherCode, setVoucherCode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const handleApplyVoucher = () => {
        // Xử lý logic áp dụng voucher, có thể gọi API để kiểm tra voucher code
        console.log('Applying voucher:', voucherCode);
    };

    const handlePaymentMethodChange = (method) => {
        // Xử lý thay đổi phương thức thanh toán
        setPaymentMethod(method);
    };

    const handleCheckout = () => {
        // Xử lý logic thanh toán, có thể gọi API để xác nhận đơn hàng
        console.log('Checking out with payment method:', paymentMethod);
    };
    const vouchers = [
        {
            id: 1,
            value: 30,
            minOrderAmount: 99,
            expirationDate: '30.11.2023',
        },
        {
            id: 2,
            value: 50,
            minOrderAmount: 150,
            expirationDate: '15.12.2023',
        },
        {
            id: 3,
            value: 50,
            minOrderAmount: 150,
            expirationDate: '15.12.2023',
        },
        {
            id: 4,
            value: 50,
            minOrderAmount: 150,
            expirationDate: '15.12.2023',
        },
        {
            id: 5,
            value: 50,
            minOrderAmount: 150,
            expirationDate: '15.12.2023',
        },
        {
            id: 6,
            value: 50,
            minOrderAmount: 150,
            expirationDate: '15.12.2023',
        },
        {
            id: 6,
            value: 50,
            minOrderAmount: 150,
            expirationDate: '15.12.2023',
        },
        {
            id: 8,
            value: 30,
            minOrderAmount: 99,
            expirationDate: '30.11.2023',
        },
        {
            id: 9,
            value: 50,
            minOrderAmount: 150,
            expirationDate: '15.12.2023',
        },
        {
            id: 10,
            value: 50,
            minOrderAmount: 150,
            expirationDate: '15.12.2023',
        },
        {
            id: 11,
            value: 50,
            minOrderAmount: 150,
            expirationDate: '15.12.2023',
        },
        {
            id: 12,
            value: 50,
            minOrderAmount: 150,
            expirationDate: '15.12.2023',
        },
        {
            id: 13,
            value: 50,
            minOrderAmount: 150,
            expirationDate: '15.12.2023',
        },
        {
            id: 14,
            value: 50,
            minOrderAmount: 150,
            expirationDate: '15.12.2023',
        },
        // Thêm các voucher khác
    ];


    return (
        <div className="max-w-screen-lg mx-auto mt-10 p-6 bg-orange-100 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item.id} className="flex items-center justify-between border-b border-gray-300 py-2">
                        <div className="flex items-center">

                            <img
                                src={item.image}
                                alt={item.name}
                                className="mx-20 h-16 w-auto ml-4 "
                            />
                            <div>
                                <span className="font-semibold">{item.name}</span>
                                <p className="text-gray-600">Price: ${item.price} x {item.quantity}</p>
                                <p className="text-gray-600">Category: {item.category}</p>
                            </div>
                        </div>

                    </li>
                ))}
            </ul>
            {/* Section: Voucher */}



            {/* Section: Voucher */}
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Voucher Code</label>
                <button
                    className="bg-orange-500 text-white p-2 rounded-md focus:outline-none"
                    onClick={openModal}
                >
                    {selectedVoucher ? `Giảm ₫${selectedVoucher.value}k` : 'Chọn Voucher'}
                </button>
                <VoucherModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    vouchers={vouchers}
                    onSelectVoucher={handleSelectVoucher}
                />
            </div>

            {/* ... Các phần khác của trang Checkout */}

            <div className="mb-6">
                <label htmlFor="voucher" className="block text-gray-700 text-sm font-bold mb-2">
                    Voucher Code
                </label>
                <div className="flex">
                    <input
                        type="text"
                        id="voucher"
                        className="flex-1 p-3 rounded-l-md border border-r-0 border-gray-300"
                        placeholder="Enter your voucher code"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                    />
                    <button
                        className="bg-orange-500 text-white p-3 rounded-r-md hover:bg-orange-600 transition-all duration-300"
                        onClick={handleApplyVoucher}
                    >
                        Apply
                    </button>
                </div>
            </div>

            {/* Section: Payment Method */}
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Payment Method</label>
                <div className="flex">
                    <label className="flex items-center cursor-pointer mr-4">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="creditCard"
                            checked={paymentMethod === 'creditCard'}
                            onChange={() => handlePaymentMethodChange('creditCard')}
                        />
                        <span className="ml-2">Credit Card</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="paypal"
                            checked={paymentMethod === 'paypal'}
                            onChange={() => handlePaymentMethodChange('paypal')}
                        />
                        <span className="ml-2">PayPal</span>
                    </label>

                </div>
            </div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Payment Method</label>

            {/* Section: Order Summary */}
            {/* ... Thêm phần order summary và thông tin sản phẩm đang mua */}

            {/* Button: Checkout */}
            <label className="block text-gray-700 text-sm font-bold mb-2">
                total amount:

            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
                total discount:

            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">total payment:</label>
            <button
                className="w-full bg-orange-500 text-white p-3 rounded-md hover:bg-orange-600 transition-all duration-300"
                onClick={handleCheckout}
            >
                Checkout
            </button>
        </div>
    );
};

export default Checkout;
