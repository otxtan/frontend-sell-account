// roles.js
import React, { useEffect, useState } from 'react';
import transactionService from '../../services/transactionService';
import { useUser } from '../../context/userProvider';

import { Link, useNavigate } from 'react-router-dom';
import roleService from '../../services/roleService';

const RoleManager = () => {
  const navigate = useNavigate();
 
  const [page, setPage] = useState(1);
  const { user } = useUser();
  const [roles, setRoles] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await roleService.getAllByPage({ page: page, size: 5 });
        console.log(data);
        setRoles(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [page]);
  

  const handleClick = (role) => {
    navigate('/dashboard/role-details', { state: { role } });
  }
  return (
    <div className="bg-white p-2 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">roles</h2>
      <ul className="space-y-4">
        {roles?.items?.map(role => (
          <li key={role?.id} className="flex flex-wrap items-center justify-between brole-b brole-gray-300 py-2">
            <div>
              <span className=" font-semibold">role #{role?.id}</span>
              {/* <p className="text-gray-600"> {new Date(role?.transaction_date).toLocaleDateString()}</p> */}
            </div>
            <div>
              <span className=" font-semibold">name</span>
              <p className="text-gray-600">{role?.name}</p>
            </div>
            <div>
              <span className=" font-semibold">Action</span>
              <p className="text-green-500 font-semibold"></p>
              
              <button className='bg-orange-500 p-2' onClick={() => handleClick(role)}>Edit</button>
              <button className='bg-orange-500 p-2' onClick={() => handleClick(role)}>Remove</button>

            </div>
             
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleManager;
