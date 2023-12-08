// roles.js
import React, { useEffect, useState } from 'react';
import transactionService from '../../services/transactionService';
import { useUser } from '../../context/userProvider';

import { Link, useNavigate } from 'react-router-dom';
import roleService from '../../services/roleService';
import Modal from 'react-modal';
import { pagination } from '../common/pagination';
import productService from '../../services/productService';
import subscriptionPlanSevice from '../../services/subscriptionPlanService';
import Alert from '../common/Alert';
import uploads from '../../services/uploadsService';
import SelectCustom from '../common/SelectCustom';
import categoryService from '../../services/categoryService';
import typeService from '../../services/TypeService';
import ProductDetail from '../../pages/productDetail';
import customerService from '../../services/customerService';
import authService from '../../services/auth';
Modal.setAppElement('#root');
const AccountManager = () => {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    // const [page, setPage] = useState(1);
    const { user } = useUser();
    const [customers, setCustomers] = useState([]);
    const openModal = () => setModalOpen(true);
    const closeModal = () => { setModalOpen(false); setModalContent(null) };
    const [ModalContent, setModalContent] = useState(null);
    const [paginationArray, setPaginationArray] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [DeleteCustomer, setDeleteCustomer] = useState();


    // view add

    const AddElement = () => {

        const [FormDataCustomer, setFormDataCustomer] = useState({
            username: '',
            password: '',
            full_name: '',
            address: '',
            phone_number: '',
            email_address: '',
            roleId: 1,

        })
        const handleSubmitCustomer = async (e) => {
            e.preventDefault();
            if (FormDataCustomer.roleId == 0) {
                Alert.showMessage('Please select Category ')
                return
            }

            console.log(FormDataCustomer)
            Alert.showMessage(await authService.register(FormDataCustomer));
            const data = await customerService.findAllCustomerUserRoleBypage({ page: pageNumber, size: 10 });
            setPaginationArray(pagination(data.currentPage, data.totalPages));
            // console.log(data);
            setCustomers(data);
        }
        const handleChangeFormProduct = (e) => {
            const { name, value } = e.target;
            console.log(value)
            setFormDataCustomer({
                ...FormDataCustomer,
                [name]: value,
            })
        }
        const handleFileUpload = async (e) => {
            const fileInput = e.target;
            const files = fileInput.files;
            if (files.length > 0) {
                const uploadData = new FormData();
                uploadData.append("file", e.target.files[0], "file");
                const result = await uploads.uploadImg(uploadData);
                console.log(result);
                if (e.target.id == 'thumbnail')
                    setFormDataCustomer({
                        ...FormDataCustomer,
                        thumbnail: result.secure_url,
                    })
                else if (e.target.id == 'image')
                    setFormDataCustomer({
                        ...FormDataCustomer,
                        image: result.secure_url,
                    })
                // Tiếp tục xử lý formData...
            } else {
                console.error('No file selected');
            }



        }
        const [selectedOptionRole, setSelectedOptionRole] = useState(null);
        const [selectedOptionType, setSelectedOptionType] = useState(null);

        const handleSelectChangeRole = async (newValue) => {
            // Xử lý giá trị được chọn tại đây
            setSelectedOptionRole(newValue);
            if (newValue)
                setFormDataCustomer({
                    ...FormDataCustomer,
                    roleId: newValue.value,
                })

        };
        const handleCreateOptionCustomer = async (inputValue) => {
            console.log('Selected Value:', inputValue);
            if (inputValue) {
                Alert.showMessage(await roleService.create({ name: inputValue }));
                const data = await roleService.getall();
                console.log(data);
                data ? setRoles(data.map(item => ({
                    value: item.id,
                    label: item.name,
                }))) : setRoles([]);
            }

        };


        const [Roles, setRoles] = useState([]);
        const [types, setTypes] = useState([]);
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const Roles = await roleService.findAll();
                    console.log(Roles);
                    Roles ? setRoles(Roles.map(item => ({
                        value: item.id,
                        label: item.name,
                    }))) : setRoles([]);



                } catch (error) {
                    console.error('Error fetching :', error);
                }
            };

            fetchData();
        }, []);
        useEffect(() => {
            const fetchData = async () => {
                try {
                    console.log(FormDataCustomer)

                } catch (error) {
                    console.error('Error fetching :', error);
                }
            };

            fetchData(FormDataCustomer);
        }, []);
        return (
            <form onSubmit={handleSubmitCustomer} className='px-auto text-white w-3/4 mx-20'>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        username:
                    </label>
                    <input className='bg-gray-500 rounded-md p-2' type="text" name="username" value={FormDataCustomer?.name} onChange={handleChangeFormProduct} />
                </div>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        password:
                    </label>
                    <input className='bg-gray-500 rounded-md p-2' type="text" name="password" value={FormDataCustomer?.description} onChange={handleChangeFormProduct} />
                </div>

                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        full_name:
                    </label>
                    <input className='bg-gray-500 rounded-md p-2' type="text" name="full_name" value={FormDataCustomer?.full_name} onChange={handleChangeFormProduct} />
                </div>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        address:
                    </label>
                    <input className='bg-gray-500 rounded-md p-2' type="text" name="address" value={FormDataCustomer?.address} onChange={handleChangeFormProduct} />
                </div>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        phone_number:
                    </label>
                    <input className='bg-gray-500 rounded-md p-2' type="text" name="phone_number" value={FormDataCustomer?.phone_number} onChange={handleChangeFormProduct} />
                </div>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        email_address:
                    </label>
                    <input className='bg-gray-500 rounded-md p-2' type="text" name="email_address" value={FormDataCustomer?.email_address} onChange={handleChangeFormProduct} />
                </div>
                {/* <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        roleId:
                    </label>
                    <input className='bg-gray-500 rounded-md p-2' type="text" name="roleId" value={FormDataCustomer?.content} onChange={handleChangeFormProduct} />
                </div> */}
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        Role:
                    </label>
                    <SelectCustom options={Roles} onChange={handleSelectChangeRole} onCreateOption={handleCreateOptionCustomer} />

                </div>
                <button type="submit" className="mt-4 p-2 bg-orange-500 rounded-md my-2" >Add Customer</button>
            </form>
        );
    };
    const EditElement = (props) => {

        const [FormDataCustomer, setFormDataCustomer] = useState({
            username: '',
            password: '',
            status: false,
            roleId: 0,
            full_name: '',
            address: '',
            phone_number: '',
            email_address: '',

        })
        const handleSubmitCustomer = async (e) => {
            e.preventDefault();
            console.log(FormDataCustomer)
            const result = await customerService.update(props?.value?.id, FormDataCustomer)
            Alert.showMessage(result.message);
            const data = await customerService.findAllCustomerUserRoleBypage({ page: pageNumber, size: 10 });
            setPaginationArray(pagination(data.currentPage, data.totalPages));
            // console.log(data);
            setCustomers(data);
        }
        const handleChangeFormProduct = (e) => {
            const { name, value } = e.target;
            console.log(value)
            setFormDataCustomer({
                ...FormDataCustomer,
                [name]: value,
            })
        }
        const handleFileUpload = async (e) => {
            const fileInput = e.target;
            const files = fileInput.files;
            if (files.length > 0) {
                const uploadData = new FormData();
                uploadData.append("file", e.target.files[0], "file");
                const result = await uploads.uploadImg(uploadData);
                console.log(result);
                if (e.target.id == 'thumbnail')
                    setFormDataCustomer({
                        ...FormDataCustomer,
                        thumbnail: result.secure_url,
                    })
                else if (e.target.id == 'image')
                    setFormDataCustomer({
                        ...FormDataCustomer,
                        image: result.secure_url,
                    })
                // Tiếp tục xử lý formData...
            } else {
                console.error('No file selected');
            }



        }
        const [selectedOptionRole, setSelectedOptionRole] = useState(null);
        const [selectedOptionType, setSelectedOptionType] = useState(null);

        const handleSelectChangeRole = async (newValue) => {
            // Xử lý giá trị được chọn tại đây
            setSelectedOptionRole(newValue);
            setFormDataCustomer({
                ...FormDataCustomer,
                roleId: newValue.value,
            })

        };
        const handleCreateOptionCustomer = async (inputValue) => {
            console.log('Selected Value:', inputValue);
            if (inputValue) {
                Alert.showMessage(await roleService.create({ name: inputValue }));
                const data = await roleService.getall();
                console.log(data);
                data ? setRoles(data.map(item => ({
                    value: item.id,
                    label: item.name,
                }))) : setRoles([]);
            }

        };

        const [Roles, setRoles] = useState([]);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    console.log(props?.value?.id)
                    const customer = await customerService.findOneCustomerUserRole(props?.value?.id);
                    console.log(customer)
                    setFormDataCustomer({
                        ...FormDataCustomer,
                        username: customer?.User?.username,
                        password: customer?.User?.password,
                        status: customer?.User?.status,
                        roleId: customer?.User?.roleId,
                        full_name: customer?.full_name,
                        address: customer?.address,
                        phone_number: customer?.phone_number,
                        email_address: customer?.email_address,
                    })
                    // console.log(product)
                    const Roles = await roleService.findAll();
                    console.log(Roles);
                    Roles ? setRoles(Roles.map(item => ({
                        value: item.id,
                        label: item.name,
                    }))) : setRoles([]);



                } catch (error) {
                    console.error('Error fetching :', error);
                }
            };

            fetchData();
        }, []);
        return (
            <form onSubmit={handleSubmitCustomer} className='px-auto text-white w-3/4 mx-20'>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        username:
                    </label>
                    <input className='bg-gray-500 rounded-md p-2' type="text" name="username" value={FormDataCustomer?.username} onChange={handleChangeFormProduct} />
                </div>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        password:
                    </label>
                    <input className='bg-gray-500 rounded-md p-2' type="text" name="password" value={FormDataCustomer?.password} onChange={handleChangeFormProduct} />
                </div>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        full_name:
                    </label>
                    <input className='bg-gray-500 rounded-md p-2' type="text" name="full_name" value={FormDataCustomer?.full_name} onChange={handleChangeFormProduct} />
                </div>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        address:
                    </label>
                    <input className='bg-gray-500 rounded-md p-2' type="text" name="address" value={FormDataCustomer?.address} onChange={handleChangeFormProduct} />
                </div>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        phone_number:
                    </label>
                    <input className='bg-gray-500 rounded-md p-2' type="text" name="phone_number" value={FormDataCustomer?.phone_number} onChange={handleChangeFormProduct} />
                </div>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        email_address:
                    </label>
                    <input className='bg-gray-500 rounded-md p-2' type="text" name="email_address" value={FormDataCustomer?.email_address} onChange={handleChangeFormProduct} />
                </div>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        Role:
                    </label>
                    <SelectCustom options={Roles} onChange={handleSelectChangeRole} onCreateOption={handleCreateOptionCustomer} />

                </div>

                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        status:
                    </label>
                    <select className='bg-gray-500 rounded-md p-2' name="status" value={FormDataCustomer?.status} onChange={(e) => {
                        setFormDataCustomer({
                            ...FormDataCustomer,
                            status: e.target.value,
                        })
                    }}>
                        <option className='bg-gray-800 p-3' value="0">NO</option>
                        <option className='bg-gray-800 p-3' value="1">YES</option>
                    </select>
                    {/* <input className='bg-gray-500 rounded-md p-2' type="text" name="ProductId" value={formDataSubscription.ProductId} onChange={handleChangeFormSubscription} /> */}
                </div>

                <button type="submit" className="mt-4 p-2 bg-orange-500 rounded-md my-2" >Edit Customer</button>
            </form>
        );
    };
    // view edit

    const PreviewElement = (item) => {
        return (
            <ProductDetail value={item} />
        );
    }
    // const handleClickDeleteCustomer=()=>
    // const RemoveElement = (props) => {
    //     const handleClickDeleteCustomer = (item) => {


    //     }
    //     return (
    //         <div>
    //             <button onClick={() => handleClickDeleteCustomer(props?.value?.product)} type="button" data-drawer-target="drawer-update-product" data-drawer-show="drawer-update-product" aria-controls="drawer-update-product" className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
    //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    //                     <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
    //                     <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path>
    //                 </svg>
    //                 Delete
    //             </button>
    //             <button onClick={() => closeModal} type="button" data-drawer-target="drawer-update-product" data-drawer-show="drawer-update-product" aria-controls="drawer-update-product" className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
    //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    //                     <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
    //                     <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path>
    //                 </svg>
    //                 Delete
    //             </button>

    //         </div>

    //     );
    // }

    const handleClickAddElement = () => {
        openModal();
        setModalContent(<AddElement />);
    }
    const handleClickEditElement = (item) => {
        openModal();
        setModalContent(<EditElement value={item} />);
    }

    const handleClickPreview = (item) => {
        openModal();
        setModalContent(<PreviewElement value={item} />);
    }
    const handleClickSubscriptions = (items, product) => {
        openModal();
        setModalContent(<SubscriptionPlanElement value={items} product={product} />);
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                // setPaginationArray(pagination(pageNumber, ))
                const data = await customerService.findAllCustomerUserRoleBypage({ page: pageNumber, size: 10 });
                
                setCustomers(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, [pageNumber]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await customerService.findAllCustomerUserRoleBypage({ page: pageNumber, size: 10 });
                setPaginationArray(pagination(data.currentPage, data.totalPages));
                // console.log(data);
                setCustomers(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);
    const handleClickRemove = async (item) => {
        // openModal();
        // setModalContent(<RemoveElement value={item} />);
        console.log(customers)
        const result = await customerService.delete(item?.id);
        Alert.showMessage(result.message);
        // const findIndex = customers?.items?.findIndex(i => i.id === item.id);
        // console.log(customers?.items?.splice(findIndex, 1))
        // setCustomers(customers);
        // console.log(customers);
        const data = await customerService.findAllCustomerUserRoleBypage({ page: pageNumber, size: 10 });
        setCustomers(data);
    }
    const handleClickPrevious = () => {
        if (pageNumber >= 2) {
            setPageNumber(pageNumber - 1);
        }
    }
    const handleClickNext = () => {
        if (pageNumber < paginationArray[paginationArray.length - 1]) {
            setPageNumber(pageNumber + 1);
        }
    }
    const handleClick = (role) => {
        navigate('/dashboard/role-details', { state: { role } });
    }

    const SubscriptionPlanElement = (props) => {

        console.log(props)
        const [formDataSubscription, setformDataSubscription] = useState({
            packed_name: '',
            total: '',
            // quantity_sold: '',
            duration: '',
            discount_percentage: '',
            price: '',
            published: '0',
            ProductId: props?.product?.product?.id,
        })
        const [SubscriptionPlans, setSubscriptionPlans] = useState([]);
        const [editSubscriptionPlan, setEditSubscriptionPlan] = useState();
        const [deleteSubscriptionPlan, setDeleteSubscriptionPlan] = useState();
        const handleChangeFormSubscription = (e) => {
            const { name, value } = e.target;
            console.log(value)
            setformDataSubscription({
                ...formDataSubscription,
                [name]: value,
            })

        };
        const handleClickEditSubscriptionPlan = (item) => {
            setEditSubscriptionPlan(item);
        }
        const handleClickDeleteSubscriptionPlan = (item) => {
            setDeleteSubscriptionPlan(item);
        }
        const handleClickUpdateSubscriptionPlan = async () => {
            const result = await subscriptionPlanSevice.update(
                {
                    packed_name: editSubscriptionPlan.packed_name,
                    id: editSubscriptionPlan.id,
                    discount_percentage: editSubscriptionPlan.discount_percentage,
                    duration: editSubscriptionPlan.duration,
                    price: editSubscriptionPlan.price,
                    published: editSubscriptionPlan.published
                });
            Alert.showMessage(result.message);
            setEditSubscriptionPlan();
        }
        const handleClickConfirmDeleteSubscriptionPlan = async (item) => {
            const result = await subscriptionPlanSevice.delete(item);
            Alert.showMessage(result.message);
            setDeleteSubscriptionPlan();
        }

        const handleSubmitSubscription = async (e) => {
            e.preventDefault();
            // Handle the form submission logic here
            const result = await subscriptionPlanSevice.create(formDataSubscription);
            if (result) {
                const data = await subscriptionPlanSevice.findAll({ ProductId: props?.product?.product?.id });

                console.log(data);
                setSubscriptionPlans(data);
                Alert.showMessage('Added Subscription Plan');
            }
            else {
                Alert.showMessage('Add Subscription Failer');
            }
            console.log('Form submitted:', formDataSubscription);
        };
        useEffect(() => {
            const fetchData = async () => {
                const data = await subscriptionPlanSevice.findAll({ ProductId: props?.product?.product?.id });

                console.log(data);
                setSubscriptionPlans(data);


            };

            fetchData();
        }, [editSubscriptionPlan, deleteSubscriptionPlan]);
        // useEffect(() => {
        //     const fetchData = async () => {
        //         // setEditSubscriptionPlan(editSubscriptionPlan);
        //         console.log(editSubscriptionPlan);
        //     };
        //     fetchData();
        // }, [editSubscriptionPlan]);
        return (
            <div>
                <form onSubmit={handleSubmitSubscription} className='px-auto text-white w-1/2'>
                    {console.log(props?.product?.product)}
                    {props?.product?.product?.ProductTypeId == 1 ? <div className="grid grid-cols-2 gap-4 my-2">
                        <label>
                            Packed Name:
                        </label>
                        <input className='bg-gray-500 rounded-md p-2' type="text" name="packed_name" value={formDataSubscription?.packed_name} onChange={handleChangeFormSubscription} />
                    </div> : null}

                    {/* <div className="grid grid-cols-2 gap-4 my-2">
                        <label>
                            Total:
                        </label>
                        <input className='bg-gray-500 rounded-md p-2' type="text" name="total" value={formDataSubscription.total} onChange={handleChangeFormSubscription} />
                    </div> */}

                    {/* <div className="grid grid-cols-2 gap-4 my-2">
                        <label>
                            Quantity Sold:
                        </label>
                        <input className='bg-gray-500 rounded-md p-2' type="text" name="quantity_sold" value={formDataSubscription.quantity_sold} onChange={handleChangeFormSubscription} />
                    </div> */}

                    {props?.product?.product?.ProductTypeId == 1 ?
                        <div className="grid grid-cols-2 gap-4 my-2">
                            <label>
                                Duration:
                            </label>
                            <input className='bg-gray-500 rounded-md p-2' type="text" name="duration" value={formDataSubscription.duration} onChange={handleChangeFormSubscription} />
                        </div> : null}

                    <div className="grid grid-cols-2 gap-4 my-2">
                        <label>
                            DISCOUNT(%):
                        </label>
                        <input className='bg-gray-500 rounded-md p-2' type="text" name="discount_percentage" value={formDataSubscription.discount_percentage} onChange={handleChangeFormSubscription} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 my-2">
                        <label>
                            Price:
                        </label>
                        <input className='bg-gray-500 rounded-md p-2' type="text" name="price" value={formDataSubscription.price} onChange={handleChangeFormSubscription} />
                    </div>
                    <div className="grid grid-cols-2 gap-4 my-2">
                        <label>
                            Pulished:
                        </label>
                        <select className='bg-gray-500 rounded-md p-2' name="published" value={formDataSubscription.published} onChange={handleChangeFormSubscription}>
                            <option className='bg-gray-800 p-3' value="1">YES</option>
                            <option className='bg-gray-800 p-3' value="0">NO</option>

                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4 my-2">
                        <label>
                            ProductId:
                        </label>
                        <select className='bg-gray-500 rounded-md p-2' name="published" value={formDataSubscription.ProductId} onChange={() => { }}>

                            <option value={formDataSubscription.ProductId}>{formDataSubscription.ProductId}</option>

                        </select>
                        {/* <input className='bg-gray-500 rounded-md p-2' type="text" name="ProductId" value={formDataSubscription.ProductId} onChange={handleChangeFormSubscription} /> */}
                    </div>

                    <button type="submit" className="mt-4 p-2 bg-orange-500 rounded-md my-2" >Add Subscription Plan</button>
                </form>
                <div className='overflow-x-auto bg-gray-800 rounded-md' >
                    <table className='w-full  '>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 '>
                            <tr>
                                <th className='p-2'>Id</th>
                                <th className='p-2'>packed_name</th>
                                <th className='p-2'>total</th>
                                <th className='p-2'>quantity_sold</th>
                                <th className='p-2'>duration</th>
                                <th className='p-2'>discount(%)</th>
                                <th className='p-2'>price</th>
                                <th className='p-2'>published</th>
                                <th className='p-2'>updatedAt</th>
                                <th className='p-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SubscriptionPlans?.map(item => (
                                <tr key={item?.id} className='border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'>

                                    <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                        <span className='bg-red-400 p-2 rounded-md'>{item?.id}</span>
                                    </td>

                                    {item.id == editSubscriptionPlan?.id ?
                                        <td>
                                            <input className='bg-gray-500 rounded-md p-2' name="packed_name"
                                                value={editSubscriptionPlan.packed_name}
                                                onChange={(e) => { setEditSubscriptionPlan({ ...editSubscriptionPlan, [e.target.name]: e.target.value }); console.log(editSubscriptionPlan) }} />
                                        </td>
                                        :
                                        <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{item?.packed_name} </td>
                                    }
                                    <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                        {item?.total}
                                    </td>
                                    <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                        {item?.quantity_sold}
                                    </td>
                                    {item.id == editSubscriptionPlan?.id ?
                                        <td>
                                            <input className='bg-gray-500 rounded-md p-2' name="duration"
                                                value={editSubscriptionPlan.duration}
                                                onChange={(e) => { setEditSubscriptionPlan({ ...editSubscriptionPlan, [e.target.name]: e.target.value }); console.log(editSubscriptionPlan) }} />
                                        </td>
                                        :
                                        <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                            {item?.duration}
                                        </td>}
                                    {item.id == editSubscriptionPlan?.id ?
                                        <td>
                                            <input className='bg-gray-500 rounded-md p-2' name="discount_percentage"
                                                value={editSubscriptionPlan.discount_percentage}
                                                onChange={(e) => { setEditSubscriptionPlan({ ...editSubscriptionPlan, [e.target.name]: e.target.value }); console.log(editSubscriptionPlan) }}
                                            />

                                        </td>
                                        :
                                        <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                            {item?.discount_percentage}
                                        </td>}
                                    {item.id == editSubscriptionPlan?.id ?
                                        <td>
                                            <input className='bg-gray-500 rounded-md p-2 ' name="price"
                                                value={editSubscriptionPlan.price}
                                                onChange={(e) => { setEditSubscriptionPlan({ ...editSubscriptionPlan, [e.target.name]: e.target.value }); console.log(editSubscriptionPlan) }} />
                                        </td>
                                        :
                                        <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                            {VND.format(item?.price)}
                                        </td>}
                                    {/* <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{VND.format(item?.price)}</td> */}
                                    {item.id == editSubscriptionPlan?.id ?
                                        <td>
                                            <select className='bg-gray-500 rounded-md p-2' name="published" value={String(editSubscriptionPlan.published)}
                                                onChange={e => { setEditSubscriptionPlan({ ...editSubscriptionPlan, [e.target.name]: e.target.value }); console.log(editSubscriptionPlan) }}>
                                                <option className='bg-gray-800 p-3' value="0">NO</option>
                                                <option className='bg-gray-800 p-3' value="1">YES</option>
                                            </select>
                                        </td>
                                        :
                                        <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{String(item?.published)}</td>
                                    }
                                    {/* <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{String(item?.published)}</td> */}
                                    <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{new Date(item?.updatedAt).toLocaleString(undefined, {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                    })}</td>

                                    <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white '>
                                        <div className='flex flex-row items-center space-x-4'>
                                            <div>
                                                {item.id != editSubscriptionPlan?.id ?

                                                    <button onClick={() => handleClickEditSubscriptionPlan(item)} id={item?.id} type="button" data-drawer-target="drawer-update-product" data-drawer-show="drawer-update-product" aria-controls="drawer-update-product" className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                                            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path>
                                                        </svg>
                                                        Edit
                                                    </button> :
                                                    <div>
                                                        <button onClick={() => handleClickUpdateSubscriptionPlan(item)} id={item?.id} type="button" data-drawer-target="drawer-update-product" data-drawer-show="drawer-update-product" aria-controls="drawer-update-product" className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 my-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                                                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path>
                                                            </svg>
                                                            Update
                                                        </button>
                                                        <button onClick={() => handleClickEditSubscriptionPlan()} id={item?.id} type="button" data-drawer-target="drawer-update-product" data-drawer-show="drawer-update-product" aria-controls="drawer-update-product" className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 my-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                                                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path>
                                                            </svg>
                                                            Cancel
                                                        </button>

                                                    </div>
                                                }


                                            </div>
                                            {/* <div>

                                                <button onClick={() => handleClickPreview(1)} type="button" data-drawer-target="drawer-read-product-advanced" data-drawer-show="drawer-read-product-advanced" aria-controls="drawer-read-product-advanced" className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2 -ml-0.5">
                                                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"></path>
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"></path>
                                                    </svg>
                                                    Preview
                                                </button>
                                            </div> */}
                                            <div>
                                                {item.id != deleteSubscriptionPlan?.id ?

                                                    <button onClick={() => handleClickDeleteSubscriptionPlan(item)} id={item?.id} type="button" data-drawer-target="drawer-update-product" data-drawer-show="drawer-update-product" aria-controls="drawer-update-product" className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                                            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path>
                                                        </svg>
                                                        Delete
                                                    </button> :
                                                    <div>
                                                        <button onClick={() => handleClickConfirmDeleteSubscriptionPlan(item)} id={item?.id} type="button" data-drawer-target="drawer-update-product" data-drawer-show="drawer-update-product" aria-controls="drawer-update-product" className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 my-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                                                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path>
                                                            </svg>
                                                            Confirm
                                                        </button>
                                                        <button onClick={() => setDeleteSubscriptionPlan()} id={item?.id} type="button" data-drawer-target="drawer-update-product" data-drawer-show="drawer-update-product" aria-controls="drawer-update-product" className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 my-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                                                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path>
                                                            </svg>
                                                            Cancel
                                                        </button>

                                                    </div>
                                                }

                                            </div>
                                        </div>
                                    </td>
                                </tr>

                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        );
    }
    // const handleClickDeleteCustomer = (item) => {
    //     setDeleteCustomer(item)
    // }
    return (
        <div className="container">
            {/* modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Thay đổi màu nền bên ngoài ở đây
                    },
                    content: {
                        width: '80%', // Thiết lập chiều rộng
                        height: '80%', // Thiết lập chiều cao
                        margin: 'auto',
                        background: '#080C13'
                    },
                }}

            >
                {ModalContent}
            </Modal>
            <div className='bg-gray-800 p-2'>
                {/* header */}
                <div className='my-2 mx-auto flex flex-wrap mb-4 space-x-4'>
                    <input onChange={async (e) => {
                        const data = await customerService.findAllCustomerUserRoleBypage({ page: pageNumber, size: 10, email: e.target.value });
                        console.log(data);
                        setCustomers(data);
                    }} type="text" className=' basis-2/6 rouded rounded-md px-2' placeholder='Search' />

                    <button className='basis-1/6 bg-orange-500 flex items-center justify-center rounded rounded-md px-2 py-2 text-white ' onClick={handleClickAddElement}>
                        <svg className="h-3.5 w-3.5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"></path>
                        </svg>
                        Add Customer</button>
                    {/* <button className='basis-1/6 bg-white flex items-center px-2 py-2 justify-center rounded rounded-md'>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-1.5 -ml-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd"></path>
                        </svg> fillter options
                    </button> */}
                </div>
                {/* body */}

                <div className='overflow-x-auto bg-gray-800' >
                    <table className='w-full '>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 '>
                            <tr>
                                <th>id</th>
                                <th>username</th>
                                <th>salt</th>
                                <th>password</th>
                                <th>role</th>
                                <th>full_name</th>
                                <th>phone_number</th>
                                <th>email_address</th>
                                <th>Updated Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.items?.map(item => (
                                <tr key={item?.product?.id} className='border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'>

                                    <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{item?.id} </td>
                                    <td className='px-4 py-3 bg-blue-400 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                        <span className='p-2 rounded-md'>
                                            {item?.User?.username}
                                        </span>
                                    </td>
                                    <td className='overflow-x-auto max-w-xs px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                        <span className='p-2  rounded-md'>
                                            {item?.User?.salt}
                                        </span>
                                    </td>
                                    <td className='overflow-x-auto max-w-xs px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                        <span className='p-2  rounded-md'>
                                            {item?.User?.password}
                                        </span>
                                    </td>
                                    <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                        {item?.User?.role?.name=='ADMIN'?<span className='p-2 bg-red-600 rounded-md'>
                                            {item?.User?.role?.name}
                                        </span>
                                        :<span className='p-2 bg-yellow-500 rounded-md'>
                                            {item?.User?.role?.name}
                                        </span>}
                                        
                                    </td>
                                    <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                        <span className='p-2 rounded-md'>
                                            {item?.full_name}
                                        </span>
                                    </td>
                                    <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                        <span className='p-2 bg-yellow-600 rounded-md'>
                                            {item?.phone_number}
                                        </span>
                                    </td>
                                    <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                        <span className='p-2 bg-orange-600 rounded-md'>
                                            {item?.email_address}
                                        </span>
                                    </td>
                                    <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{new Date(item?.updatedAt).toLocaleString(undefined, {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                    })}</td>
                                    <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white '>
                                        <div className='flex flex-row items-center space-x-4'>
                                            <div>

                                                <button onClick={() => handleClickEditElement(item)} id={item?.id} type="button" data-drawer-target="drawer-update-product" data-drawer-show="drawer-update-product" aria-controls="drawer-update-product" className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path>
                                                    </svg>
                                                    Edit
                                                </button>
                                            </div>
                                            {/* <div>

                                                <button onClick={() => handleClickPreview(item)} type="button" data-drawer-target="drawer-read-product-advanced" data-drawer-show="drawer-read-product-advanced" aria-controls="drawer-read-product-advanced" className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2 -ml-0.5">
                                                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"></path>
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"></path>
                                                    </svg>
                                                    Preview
                                                </button>
                                            </div> */}
                                            {
                                                item?.id != DeleteCustomer?.id ?
                                                    <div>

                                                        <button onClick={() => { setDeleteCustomer(item) }} className='flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                                            </svg>
                                                            Delete</button>
                                                    </div> :
                                                    <div>

                                                        <button onClick={() => handleClickRemove(item)} className='flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 my-2'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                                            </svg>
                                                            Delete</button>

                                                        <button onClick={() => setDeleteCustomer()} className='flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 my-2'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                                            </svg>
                                                            Cancel</button>
                                                    </div>


                                            }

                                        </div>
                                    </td>
                                </tr>

                            ))}
                        </tbody>

                    </table>
                </div>

                {/* footer */}

                <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        Showing &nbsp;
                        <span className="font-semibold text-gray-900 dark:text-white">{customers.currentPage * 10 - 9}-{(customers.currentPage * 10) > customers.totalItems ? customers.totalItems : customers.currentPage * 10} </span>
                        &nbsp; of &nbsp;
                        <span className="font-semibold text-gray-900 dark:text-white">{customers.totalItems}</span>
                    </span>

                    <ul className="inline-flex items-stretch -space-x-px">
                        <li>
                            <button onClick={() => handleClickPrevious()} className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only">Previous</span>
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                        </li>
                        {paginationArray.map(item => (
                            <li key={item}>
                                {item == pageNumber ?
                                    (<button onClick={() => setPageNumber(item)} aria-current="page" className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{item}</button>) :
                                    item !== '...' ? (<button onClick={() => setPageNumber(item)} className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >{item}</button>) : (<button className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >{item}</button>)
                                }

                            </li>)
                        )}
                       
                        <li>
                            <button onClick={() => handleClickNext()} className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only">Next</span>
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

    );
};

export default AccountManager;
