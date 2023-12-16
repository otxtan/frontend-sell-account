// src/components/common/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4  mt-auto">
      <div className=" ">
        {/* Nội dung của footer */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-bold mb-4">Liên Hệ</h2>
            <p>Địa chỉ: 123 Đường ABC, Thành phố XYZ</p>
            <p>Email: contact@example.com</p>
            <p>Điện thoại: (123) 456-7890</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Liên Kết Nhanh</h2>
            <ul>
              <li><a href="#" className="hover:text-gray-300">Trang Chủ</a></li>
              <li><a href="#" className="hover:text-gray-300">Danh Mục Sản Phẩm</a></li>
              <li><a href="#" className="hover:text-gray-300">Giới Thiệu</a></li>
              <li><a href="#" className="hover:text-gray-300">Liên Hệ</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
