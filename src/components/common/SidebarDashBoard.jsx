// Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/styles/Sidebar.css'; // Make sure the CSS file path is correct
import { useUser } from '../../context/userProvider';

const Sidebar = () => {
    const { user } = useUser();
    return (

        <div className=" h-screen bg-gray-800 text-white h-1/2 w-1/6 flex flex-col rounded-md shadow-md">


            <nav className="">
               
                <ul className="space-y-2 mx-2 my-2">
                    <li>
                        <NavLink to="/dashboard/user-info"  className="block p-2 hover:bg-gray-700 ">
                            Tài khoản của tôi
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/orders"  className="block p-2 hover:bg-gray-700">
                            Đơn mua
                        </NavLink>
                    </li>
                    {/* Add more NavLink items for additional links */}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
