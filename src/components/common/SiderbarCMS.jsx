// SidebarCMS.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/styles/Sidebar.css'; // Make sure the CSS file path is correct
import { useUser } from '../../context/userProvider';

const SidebarCMS = () => {
    const { user } = useUser();
    return (

        <div className="bg-gray-800 text-white h-1/2 w-1/5 flex flex-col rounded-md shadow-md">


            <nav className="flex-1">
                <div className="p-2 grid grid-rows-3 grid-flow-col gap-4">
                    <div className="row-span-3 ...">
                        <img src="https://down-vn.img.susercontent.com/file/vn-11134233-7r98o-lmnn9g0zf3dre3_tn" alt=""  className='rounded-lg'/>
                    </div>
                    <div className="col-span-2 ...">{user?.username}</div>
                    <div className="row-span-2 col-span-2 ...">Sửa thông tin</div>
                </div>
                <ul className="space-y-2 mx-2 my-2">
                   
                    <li>
                        <NavLink to="/cms/user-manager" className="block p-2 hover:bg-gray-700">
                            Người Dùng
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/cms/product-manager" className="block p-2 hover:bg-gray-700">
                            Sản phẩm
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/cms/voucher-manager" className="block p-2 hover:bg-gray-700">
                            Voucher
                        </NavLink>
                    </li>
                    
                    <li>
                        <NavLink to="/cms/account-manager"  className="block p-2 hover:bg-gray-700">
                            Tài khoản
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/cms/orders"  className="block p-2 hover:bg-gray-700">
                            Giao dịch
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/cms/orders"  className="block p-2 hover:bg-gray-700">
                            Phương thức thanh toán
                        </NavLink>
                    </li>
                    {/* Add more NavLink items for additional links */}
                </ul>
            </nav>
        </div>
    );
};

export default SidebarCMS;
