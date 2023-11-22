import React from 'react';
import Modal from 'react-modal';
import '../../assets/styles/VoucherModal.css';

const VoucherModal = ({ isOpen, onClose, vouchers, onSelectVoucher }) => {
  return (
    <>
      <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className="modal-voucher"
        overlayClassName="overlay"
      >
        <div className="max-h-screen overflow-y-scroll p-4">
          <h2 className="text-xl font-semibold mb-4">Chọn Voucher</h2>
          <div className="voucher-container">
            {vouchers.map(item => (
              <div
                key={item.code}
                className="cursor-pointer mb-4 p-2 hover:bg-gray-100 rounded-md voucher-item"
                onClick={() => onSelectVoucher(item)}
              >
                <h3 className="text-lg font-semibold">{`Giảm ₫${item.value}k`}</h3>
                <p className="text-gray-600 mb-2">{`Đơn Tối Thiểu ₫${item.min_order_amount}k`}</p>
                <p className="text-gray-600">{`HSD: ${item.end_date}`}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default VoucherModal;