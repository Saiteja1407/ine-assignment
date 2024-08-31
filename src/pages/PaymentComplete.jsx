// PaymentComplete.jsx
import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import videoFile from '/paymentSuccess.webm';

export default function PaymentComplete() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const paymentStatus = searchParams.get('redirect_status'); // Stripe adds this to the URL
  
  const handleSuccessfulPayment = async() => {
    try {
        const token = localStorage.getItem('token');
        const base_url = import.meta.env.VITE_API_URL;
        const selectedCourses = JSON.parse(localStorage.getItem('selectedCourses'));
        const courseEnrolled = await axios.post(`${base_url}/api/enrollments/multiple`,{courses:selectedCourses},{
            headers:{
                'Authorization':token
            }
        })
        console.log(courseEnrolled.data);
        localStorage.removeItem('selectedCourses');
        navigate('/user/enrolledcourses');
    } catch (error) {
      console.error('processing enrollment after successful payment:', error);    
    }
  }
  
  useEffect(()=>{
        if(paymentStatus == 'succeeded'){
            handleSuccessfulPayment();
        }
        else{
            alert('Payment Failed, Please try again');
            navigate('/user/cart');
        }
    },[])
  return (
    <div>
      {paymentStatus === 'succeeded' ? (
       <div className='h-full w-full flex justify-center items-center'>
       <video width='400' autoPlay loop muted>
         <source src ='/paymentSuccess.webm' type='video/webm'/>
         Your Browser doesn't support the animation
       </video>
      </div>
      ) : (
        <div className='text-center m-5'>
          <h1 className='text-red-500 text-3xl mb-5'>Payment Failed!❌</h1>
          <h1> Please Try Again</h1>
        </div>
      )}
    </div>
  );
}

