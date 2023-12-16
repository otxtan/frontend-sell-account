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

import SelectCustom from '../common/SelectCustom';
import categoryService from '../../services/categoryService';
import typeService from '../../services/TypeService';
import ProductDetail from '../../pages/productDetail';
import voucherService from '../../services/voucherService';
import SelectMutipleCustom from './SelectMutipleCustom';
import utils from '../common/utils';

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
    const [Vouchers, setVouchers] = useState([]);
    const openModal = () => setModalOpen(true);
    const closeModal = () => { setModalOpen(false); setModalContent(null) };
    const [ModalContent, setModalContent] = useState(null);
    const [paginationArray, setPaginationArray] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [DeleteVoucher, setDeleteVoucher] = useState();


    // view add

    const AddElement = () => {
        const [Subscription_plans, setSubscriptionPlans] = useState([]);
        const [FormDataVoucher, setFormDataVoucher] = useState({
            code: "",
            discount_amount: 0,
            discount_percentage: 0,
            min_order_amount: 0,
            minimize: 0,
            start_date: '',
            end_date: '',
            is_fixed_discount: false,
            quantity: 0,
            total: 100,
            categories: [],
            products: []

        })
        const [Products, setProducts] = useState([]);
        const [Categories, setCategories] = useState([]);

        const [Fix, setFix] = useState([{ value: 0, label: 'false' }, { value: 1, label: 'true' }]);
        const [SelectProductorCategory, setSelectProductorCategory] = useState(false);
        const [SelectedOptionFix, setSelectedOptionFix] = useState(null);
        const [selectedOptionType, setSelectedOptionType] = useState(null);
        const [DiscountOrPercentage, setDiscountOrPercentage] = useState(false);
        const [ClearSelect, SetClearSelect] = useState([]);

        const handleSubmitVoucher = async (e) => {
            e.preventDefault();
            console.log(FormDataVoucher)



            Alert.showMessage(await voucherService.create(FormDataVoucher));
            const data = await voucherService.findAllVoucherCategoryProductByPage({ page: pageNumber, size: 10,is_fixed_discount:'' });
            setPaginationArray(pagination(data.currentPage, data.totalPages));
            // console.log(data);
            setVouchers(data);
        }
        const handleChangeFormAccount = (e) => {
            const { name, value } = e.target;
            console.log(value)
            setFormDataVoucher({
                ...FormDataVoucher,
                [name]: value,
            })
        }


        const handleSelectChangeProduct = async (inputValue) => {
            console.log('Selected Value:', inputValue);
            if (inputValue) {
                SetClearSelect(inputValue.value)
                setFormDataVoucher({
                    ...FormDataVoucher,
                    products: inputValue.map(item => item.value),
                    categories: []
                })
            }
        };
        const handleSelectChangeCategory = inputValue => {
            console.log('Selected Value:', inputValue);

            if (inputValue) {
                SetClearSelect(inputValue.value)
                setFormDataVoucher({
                    ...FormDataVoucher,
                    categories: inputValue.map(item => item.value),
                    products: []
                })

            }
        };

        useEffect(() => {
            const fetchData = async () => {
                try {

                    const products = await productService.getAllProducts();
                    console.log(products);
                    Products ? setProducts(products.map(item => ({
                        value: item.id,
                        label: item.name,
                    }))) : setProducts([]);
                    const categories = await categoryService.getall();
                    console.log(categories)
                    categories ? setCategories(categories.map(item => ({
                        value: item.id,
                        label: item.product_category_name,
                    }))) : setCategories([]);

                } catch (error) {
                    console.error('Error fetching :', error);
                }
            };

            fetchData();
        }, []);
        useEffect(() => {
            const fetchData = async () => {
                try {
                    console.log(FormDataVoucher)
                } catch (error) {
                    console.error('Error fetching :', error);
                }
            };

            fetchData();
        }, [FormDataVoucher]);
        return (
            <form onSubmit={handleSubmitVoucher} className='px-auto text-white w-3/4 mx-20'>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        code:
                    </label>
                    <input className='bg-gray-500 rounded-md p-2' type="text" name="code" value={FormDataVoucher?.code} onChange={handleChangeFormAccount} />
                </div>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        Chọn hình thức giảm giá:
                    </label>
                    <SelectCustom options={[{ value: false, label: 'Voucher giảm giá cố định' }, { value: true, label: '%' }]} defaultValue={{ value: DiscountOrPercentage, label: DiscountOrPercentage == false ? 'Voucher giảm giá cố định' : '%' }} onChange={e => {
                        if (e) setDiscountOrPercentage(e.value);
                        setFormDataVoucher({ ...FormDataVoucher, discount_percentage: 0, discount_amount: 0 })
                    }} />

                </div>
                {
                    DiscountOrPercentage ?

                        <div className="grid grid-cols-2 gap-4 my-2">
                            <label>
                                discount_percentage:
                            </label>
                            <input className='bg-gray-500 rounded-md p-2' type="number" name="discount_percentage" value={FormDataVoucher?.discount_percentage} onChange={handleChangeFormAccount} />
                        </div> :
                        <div className="grid grid-cols-2 gap-4 my-2">
                            <label>
                                discount_amount:
                            </label>
                            <input placeholder='' className='bg-gray-500 rounded-md p-2' type="number" name="discount_amount" value={FormDataVoucher?.discount_amount} onChange={handleChangeFormAccount} />
                        </div>

                }


                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        min_order_amount:
                    </label>
                    <input className='bg-gray-500 rounded-md p-2' type="number" name="min_order_amount" value={FormDataVoucher?.min_order_amount} onChange={handleChangeFormAccount} />
                </div>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        minimize:
                    </label>
                    <input className='bg-gray-500 rounded-md p-2' type="number" name="minimize" value={FormDataVoucher?.minimize} onChange={handleChangeFormAccount} />
                </div>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        start_date:
                    </label>
                    <input className='bg-gray-500 rounded-md p-2' type="datetime-local" name="start_date" value={FormDataVoucher?.start_date} onChange={handleChangeFormAccount} />
                </div>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        end_date:
                    </label>
                    <input className='bg-gray-500 rounded-md p-2' type="datetime-local" name="end_date" value={FormDataVoucher?.end_date} onChange={handleChangeFormAccount} />
                </div>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        fix:
                    </label>
                    <SelectCustom options={Fix} onChange={e => {
                        console.log('Selected Value:', e);
                        if (e)
                            setFormDataVoucher({
                                ...FormDataVoucher,
                                is_fixed_discount: e ? e.value : false,
                            })
                    }} />

                </div>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        total:
                    </label>
                    <input className='bg-gray-500 rounded-md p-2' type="number" name="total" value={FormDataVoucher?.total} onChange={handleChangeFormAccount} />
                </div>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        Applicable to Product/Category:
                    </label>
                    <SelectCustom options={[{ value: false, label: 'Product' }, { value: true, label: 'Category' }]} onChange={e => {
                        if (e) setSelectProductorCategory(e.value);
                        SetClearSelect([]);
                        setFormDataVoucher({ ...FormDataVoucher, categories: [], products: [] })
                    }} />

                </div>
                {SelectProductorCategory ?
                    <div className="grid grid-cols-2 gap-4 my-2">
                        <label>
                            categories
                        </label>
                        <SelectMutipleCustom value={ClearSelect} options={Categories} onChange={handleSelectChangeCategory} />

                    </div>
                    :
                    <div className="grid grid-cols-2 gap-4 my-2">
                        <label>
                            products:
                        </label>
                        <SelectMutipleCustom value={ClearSelect} options={Products} onChange={handleSelectChangeProduct} />

                    </div>

                }


                <button type="submit" className="mt-4 p-2 bg-orange-500 rounded-md my-2" >Add Voucher</button>
            </form>
        );
    };




    const EditElement = (props) => {


        const [Products, setProducts] = useState([]);
        const [Categories, setCategories] = useState([]);
        const [SelectedCategoryProduct, setSelectedOptionCategory] = useState({ value: false, label: "Áp dụng cho sản phẩm" });

        const [FormDataVoucher, setFormDataVoucher] = useState({
            
            discount_amount: 0,
            discount_percentage: 0,
            min_order_amount: 0,
            minimize: 0,
            start_date: '',
            end_date: '',
            is_fixed_discount: false,
            quantity: 0,
            total: 100,
            categories: [],
            products: []
        })
        const handleSubmitVoucher = async (e) => {
            e.preventDefault();
            console.log(FormDataVoucher)
            const result = await voucherService.updateVoucherVoucherCategoryProduct(props?.value?.code, FormDataVoucher)
            Alert.showMessage(result.message);
            const data = await voucherService.findAllVoucherCategoryProductByPage({ page: pageNumber, size: 10,is_fixed_discount:'' });
                setPaginationArray(pagination(data.currentPage, data.totalPages));
                console.log(data)
                setVouchers(data);
        }
        // handle click
        const handleChangeFormAccount = (e) => {
            const { name, value } = e.target;
            console.log(value)
            setFormDataVoucher({
                ...FormDataVoucher,
                [name]: value,
            })
        }


        const handleSelectChangeProduct = async (inputValue) => {
            console.log('Selected Value:', inputValue);
            if (inputValue) {

                setFormDataVoucher({
                    ...FormDataVoucher,
                    products: inputValue.map(item => ({ value: item.value, label: item.label })),
                    categories: []
                })
            }
        };
        const handleSelectChangeCategory = async (inputValue) => {
            console.log('Selected Value:', inputValue);
            if (inputValue) {

                setFormDataVoucher({
                    ...FormDataVoucher,
                    categories: inputValue.map(item => ({ value: item.value, label: item.label })),
                    products: []
                })
            }
        };

        // ----------------------------------------------------------------------------
        useEffect(() => {
            const fetchData = async () => {
                try {
                    console.log(props.value.code)
                    const voucher = await voucherService.findOneIncludeCategoryOrProduct(props.value.code)
                    console.log(voucher)

                    setFormDataVoucher({
                        ...FormDataVoucher,
                        code: voucher.code,
                        discount_amount: voucher.discount_amount,
                        discount_percentage: voucher.discount_percentage,
                        min_order_amount: voucher.min_order_amount,
                        minimize: voucher.minimize,
                        start_date: voucher.start_date,
                        end_date: voucher.end_date,
                        is_fixed_discount: voucher.is_fixed_discount,
                        quantity: voucher.quantity,
                        total: voucher.total,
                        categories: voucher.categories?.map(item => ({
                            value: item.Product_category.id,
                            label: item.Product_category.product_category_name,
                        })) || [],
                        products: voucher.products?.map(item => ({
                            value: item.Product.id,
                            label: item.Product.name,
                        })) || []

                    })

                    const products = await productService.getAllProducts();
                    console.log(products);
                    Products ? setProducts(products.map(item => ({
                        value: item.id,
                        label: item.name,
                    }))) : setProducts([]);
                    const categories = await categoryService.getall();
                    console.log(categories)
                    categories ? setCategories(categories.map(item => ({
                        value: item.id,
                        label: item.product_category_name,
                    }))) : setCategories([]);


                } catch (error) {
                    console.error('Error fetching :', error);
                }
            };

            fetchData();
        }, []);

        return (
            <form onSubmit={handleSubmitVoucher} className='px-auto text-white w-3/4 mx-20'>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        discount_amount:
                    </label>
                    <input className='bg-gray-500 rounded-md p-2' type="number" name="discount_amount" value={FormDataVoucher?.discount_amount} onChange={handleChangeFormAccount} />
                </div>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        discount_percentage:
                    </label>
                    <input className='bg-gray-500 rounded-md p-2' type="number" name="discount_percentage" value={FormDataVoucher?.discount_percentage} onChange={handleChangeFormAccount} />
                </div>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        min_order_amount:
                    </label>
                    <input className='bg-gray-500 rounded-md p-2' type="number" name="min_order_amount" value={FormDataVoucher?.min_order_amount} onChange={handleChangeFormAccount} />
                </div>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        minimize:
                    </label>
                    <input className='bg-gray-500 rounded-md p-2' type="number" name="minimize" value={FormDataVoucher?.minimize} onChange={handleChangeFormAccount} />
                </div>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        start_date:
                    </label>
                    <input className='bg-gray-500 rounded-md p-2' type="datetime-local" name="start_date" value={utils.convertDateTimetoDateTimeLocal(FormDataVoucher?.start_date) } onChange={handleChangeFormAccount} />
                </div>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        end_date:
                    </label>
                    <input className='bg-gray-500 rounded-md p-2' type="datetime-local" name="end_date" value={utils.convertDateTimetoDateTimeLocal(FormDataVoucher?.end_date)} onChange={handleChangeFormAccount} />
                </div>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        fixed_discount:
                    </label>

                    <SelectCustom
                        options={[{ value: false, label: 'fasle' }, { value: true, label: 'true' }]}
                        value={{ value: FormDataVoucher.is_fixed_discount, label: String(FormDataVoucher.is_fixed_discount) }}
                        onChange={e => {
                            console.log('Selected Value:', e);
                            if (e)
                                setFormDataVoucher({
                                    ...FormDataVoucher,
                                    is_fixed_discount: e ? e.value : false,
                                })
                            console.log(FormDataVoucher)
                        }} />
                </div>
                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        total:
                    </label>
                    <input className='bg-gray-500 rounded-md p-2' type="number" name="total" value={FormDataVoucher?.total} onChange={handleChangeFormAccount} />
                </div>

                <div className="grid grid-cols-2 gap-4 my-2">
                    <label>
                        discount_amount:
                    </label>
                    <input className='bg-gray-500 rounded-md p-2' type="number" name="discount_percentage" value={FormDataVoucher?.discount_percentage} onChange={handleChangeFormAccount} />
                </div>
                {FormDataVoucher.products.length < 1 && FormDataVoucher.categories < 1
                    ?
                    <>
                        <SelectCustom
                            options={[{ value: false, label: 'Áp dụng cho sản phẩm' }, { value: true, label: 'Áp dụng cho category' }]}
                            value={SelectedCategoryProduct}
                            onChange={e => {
                                setSelectedOptionCategory(e)
                                if (e) {
                                    if (e.value == false) {
                                        setFormDataVoucher({
                                            ...FormDataVoucher,
                                            categories: [],
                                        });

                                    }
                                    else {
                                        setFormDataVoucher(
                                            {
                                                ...FormDataVoucher,
                                                products: [],
                                            }

                                        )
                                    }
                                }

                            }} />
                        {SelectedCategoryProduct.value == false ? (<div className="grid grid-cols-2 gap-4 my-2">
                            <label>
                                products:
                            </label>
                            <SelectMutipleCustom options={Products} value={FormDataVoucher.products} onChange={handleSelectChangeProduct} />
                        </div>)
                            :
                            (<div className="grid grid-cols-2 gap-4 my-2">
                                <label>
                                    Categories:
                                </label>
                                <SelectMutipleCustom options={Categories} value={FormDataVoucher.categories} onChange={handleSelectChangeCategory} />

                            </div>)
                        }

                    </>
                    :
                    (FormDataVoucher.products.length >= 1) ? (<div className="grid grid-cols-2 gap-4 my-2">
                        <label>
                            products:
                        </label>
                        <SelectMutipleCustom options={Products} value={FormDataVoucher.products} onChange={handleSelectChangeProduct} />
                    </div>)
                        :
                        (<div className="grid grid-cols-2 gap-4 my-2">
                            <label>
                                Categories:
                            </label>
                            <SelectMutipleCustom options={Categories} value={FormDataVoucher.categories} onChange={handleSelectChangeCategory} />

                        </div>)
                }




                <button type="submit" className="mt-4 p-2 bg-orange-500 rounded-md my-2" >Edit Voucher</button>
            </form>
        );
    };
    // view edit

    const PreviewElement = (item) => {
        return (
            <ProductDetail value={item} />
        );
    }


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
                const data = await voucherService.findAllVoucherCategoryProductByPage({ page: pageNumber, size: 10,is_fixed_discount:'' });
                setPaginationArray(pagination(data.currentPage, data.totalPages));
                console.log(data)
                setVouchers(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, [pageNumber]);

    const handleClickRemove = async (item) => {
        // openModal();
        // setModalContent(<RemoveElement value={item} />);
        console.log(Vouchers)
        const result = await voucherService.delete(item?.code );
        Alert.showMessage(result.message);

        const data = await voucherService.findAllVoucherCategoryProductByPage({ page: pageNumber, size: 10,is_fixed_discount:'' });
        setPaginationArray(pagination(data.currentPage, data.totalPages));
        console.log(data)
        setVouchers(data);
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
                            <input className='bg-gray-500 rounded-md p-2' type="text" name="duration" value={formDataSubscription?.duration} onChange={handleChangeFormSubscription} />
                        </div> : null}

                    <div className="grid grid-cols-2 gap-4 my-2">
                        <label>
                            DISCOUNT(%):
                        </label>
                        <input className='bg-gray-500 rounded-md p-2' type="text" name="discount_percentage" value={formDataSubscription?.discount_percentage} onChange={handleChangeFormSubscription} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 my-2">
                        <label>
                            Price:
                        </label>
                        <input className='bg-gray-500 rounded-md p-2' type="text" name="price" value={formDataSubscription?.price} onChange={handleChangeFormSubscription} />
                    </div>
                    <div className="grid grid-cols-2 gap-4 my-2">
                        <label>
                            Pulished:
                        </label>
                        <select className='bg-gray-500 rounded-md p-2' name="published" value={formDataSubscription?.published} onChange={handleChangeFormSubscription}>
                            <option className='bg-gray-800 p-3' value="1">YES</option>
                            <option className='bg-gray-800 p-3' value="0">NO</option>

                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4 my-2">
                        <label>
                            ProductId:
                        </label>
                        <select className='bg-gray-500 rounded-md p-2' name="published" value={formDataSubscription?.ProductId} onChange={() => { }}>

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
                                                value={editSubscriptionPlan?.duration}
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
    // const handleClickDeleteVoucher = (item) => {
    //     setDeleteVoucher(item)
    // }
    return (
        <div className="">
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

                        const data = await voucherService.findAllVoucherCategoryProductByPage({ page: pageNumber, size: 10, is_fixed_discount: e.target.value });
                        setPaginationArray(pagination(data.currentPage, data.totalPages));
                        setVouchers(data);
                    }} type="text" className=' basis-2/6 rouded rounded-md px-2' placeholder='Search' />

                    <button className='basis-1/6 bg-orange-500 flex items-center justify-center rounded rounded-md px-2 py-2 text-white ' onClick={handleClickAddElement}>
                        <svg className="h-3.5 w-3.5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"></path>
                        </svg>
                        Add Voucher</button>
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
                                <th>code</th>
                                <th>discount</th>
                                <th>discount%</th>
                                <th>min order</th>
                                <th>minimize</th>
                                <th>start date-end date</th>
                                <th>is_fixed</th>
                                <th>quantity/total</th>
                                <th>Updated Date</th>
                                <th>categories</th>
                                <th>products</th>

                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Vouchers.items?.map(item => (
                                <tr key={item?.code} className='border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'>

                                    <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white '>
                                        <span className='p-2 rounded-md overflow-x-auto bg-blue-500 '>
                                            {item?.code}
                                        </span>
                                    </td>
                                    <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                        <span className='p-2 rounded-md overflow-x-auto '>
                                            {item?.discount_amount}
                                        </span>
                                    </td>
                                    <td className='overflow-x-auto max-w-xs px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                        <span className='p-2  rounded-md'>
                                            {item?.discount_percentage}
                                        </span>
                                    </td>
                                    <td className='overflow-x-auto max-w-xs px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                        <span className='p-2  rounded-md'>
                                            {item?.min_order_amount}
                                        </span>
                                    </td>
                                    <td className='overflow-x-auto max-w-xs px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                        <span className='p-2  rounded-md'>
                                            {item?.minimize}
                                        </span>
                                    </td>
                                    <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                        <div className='flex flex-col'>

                                            <span className='p-2 bg-red-600 rounded-md'>
                                                {new Date(item?.start_date).toLocaleString(undefined, {
                                                    year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit',
                                                })}

                                            </span>
                                            <span className='p-2 bg-orange-600 rounded-md'>
                                                {new Date(item?.end_date).toLocaleString(undefined, {
                                                    year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit',
                                                })}
                                            </span>
                                        </div>
                                    </td>
                                    <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                        <span className='p-2 bg-yellow-500 rounded-md'>
                                            {String(item?.is_fixed_discount)}
                                        </span>

                                    </td>
                                    <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                        <span className='p-2 bg-yellow-500 rounded-md'>
                                            {item?.total - item?.quantity}/{item?.total}
                                        </span>

                                    </td>
                                    <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                        <span className='p-2 bg-red-600 rounded-md'>
                                            {new Date(item?.updatedAt).toLocaleString(undefined, {
                                                year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit',
                                            })}
                                        </span>
                                    </td>
                                    <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white overflow-x-auto max-w-xs '>
                                        {item?.categories?.map(item =>
                                            <span className='p-2 bg-yellow-500 rounded-md mx-2'>
                                                {item.Product_category.product_category_name}
                                            </span>
                                        )}

                                    </td>
                                    <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white '>
                                        {item?.products?.map(item =>
                                            <span className='p-2 bg-blue-500 rounded-md mx-2 overflow-x-auto max-w-xs'>
                                                {item?.Product?.name}
                                            </span>
                                        )}

                                    </td>

                                    <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white '>
                                        <div className='flex flex-row items-center space-x-4'>
                                            <div>

                                                <button onClick={() => handleClickEditElement(item)} id={item?.code} type="button" data-drawer-target="drawer-update-product" data-drawer-show="drawer-update-product" aria-controls="drawer-update-product" className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
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
                                                item?.code != DeleteVoucher?.code ?
                                                    <div>

                                                        <button onClick={() => { setDeleteVoucher(item) }} className='flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900'>
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

                                                        <button onClick={() => setDeleteVoucher()} className='flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 my-2'>
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
                        <span className="font-semibold text-gray-900 dark:text-white">{Vouchers.currentPage * 10 - 9}-{(Vouchers.currentPage * 10) > Vouchers.totalItems ? Vouchers.totalItems : Vouchers.currentPage * 10} </span>
                        &nbsp; of &nbsp;
                        <span className="font-semibold text-gray-900 dark:text-white">{Vouchers.totalItems}</span>
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
