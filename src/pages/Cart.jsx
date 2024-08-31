import React, { useEffect } from 'react'
import axios from 'axios';
import CartItem from '../components/CartItem';
import ButtonComp from '../components/ButtonComp';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = React.useState([]);
    const [selectedCourses, setSelectedCourses] = React.useState(new Set());
    const [total, setTotal] = React.useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const base_url = import.meta.env.VITE_API_URL;
        const checkCart = async () => {
            const response = await axios.get(`${base_url}/api/cart`,{
                headers:{
                    'Authorization':token
                }
            });
            const data = response.data.data;
            setCartItems(data);
            setSelectedCourses(new Set(data.map((item) => item.id)));
            setTotal(data.reduce((acc, item) => acc + Number(item.price), 0));
            console.log(data);
        }
        checkCart();
    },[]);

    const handleSelectCourses = (course) => {
        const newSelectedCourses = new Set(selectedCourses);
        const isSelected = newSelectedCourses.has(course.id);
        if(!isSelected){
            newSelectedCourses.add(course.id);
            setTotal(total + Number(course.price));
        }else{
            newSelectedCourses.delete(course.id);
            setTotal(total - Number(course.price));
        }
        setSelectedCourses(newSelectedCourses);
    }
    const removeFromCart = async (courseId) => {
        const newCartItems = cartItems.filter((item) => item.id !== courseId);
        setCartItems(newCartItems);
        setSelectedCourses(new Set(newCartItems.map((item) => item.id)));
    };
    const handleCheckout = () => {
        navigate('/user/checkout',{state:{selectedCourses,total}});
    }

  return (
    <div className='xl:px-20 my-5 lg:my-10'>
     {cartItems.length>0 &&(<h1 className='text-3xl lg:text-5xl m-3 font-semibold'>Cart</h1> )}
     { cartItems.length > 0 ? cartItems.map((item) => {
         return <CartItem key={item.id} item={item} selectedCourses={selectedCourses} removeFromCart={removeFromCart} handleSelectCourses={handleSelectCourses}/>
     }):( 
        <>
            <h1 className='text-center text-2xl md:text-5xl font-semibold text-blue-700'>Cart is empty</h1>
            <img src='/noitems.png' alt='empty cart' className='w-1/2 mx-auto'/>
        </>

     )
    }{cartItems.length>0 &&(
    <div className='mx-3 md:mx-5 lg:mt-6'>
        <h2 className='text-3xl my-2 font-semibold'>Total: ₹{total} </h2>
        <div onClick={handleCheckout}>
            <ButtonComp title='checkout' bsize='small'/>    
        </div>
    </div>
    )}
    </div>
  )
}

export default Cart
