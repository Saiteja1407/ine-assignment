import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import CheckOutForm from "./CheckOutForm";

// to avoid loading stripe for each render
const stripePromise = loadStripe("pk_test_51Pt5bM1jJjZnn2aDWE2H0niCEPtdYnbEutdkMdzeOx5z095phxxd3mVdCArva7q587FQjHet5t279pIyRHfhZxRO00eA8twPU5");


const CheckOut = () => {
    const [clientSecret, setClientSecret] = useState("");
    const location = useLocation();
    const { selectedCourses,total } = location.state;
    console.log(selectedCourses,total);

    useEffect(() => {
        if (selectedCourses && selectedCourses.size > 0) {
            localStorage.setItem('selectedCourses', JSON.stringify([...selectedCourses]));
            const createPaymentIntent = async () => {
                try {
                    const base_url = import.meta.env.VITE_API_URL;
                    const token = localStorage.getItem('token');
                    const response = await axios.post(`${base_url}/api/create-payment-intent`,
                        { items: [...selectedCourses], total },
                        { headers: { Authorization: token } }
                    );
                    console.log(response.data);
                    setClientSecret(response.data.clientSecret);
                } catch (error) {
                    console.error("Payment intent creation failed:", error);
                }
            }
            createPaymentIntent();
        }
    }, [selectedCourses]);
    
    
      const appearance = {
        theme: 'stripe',
      };

      const options = {
        clientSecret,
        appearance,
      };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckOutForm/>
        </Elements>
      )}
      
    </div>
  )
}

export default CheckOut
