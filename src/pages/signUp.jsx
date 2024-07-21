import React, { useState ,  useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [input,setInput] = useState({
        name:"",
        email:"",
        password:""
    })
    const recaptcha = useRef();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.id]: e.target.value
        });
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(recaptcha.current.getValue())
        const captchaValue = recaptcha.current.getValue();
        if(!captchaValue) alert('please verify the reCAPTCHA')
        else{
            const base_url = import.meta.env.VITE_API_URL;
            const response = await axios.post(`${base_url}/api/auth/verifyCaptcha`, {captchaValue});
            const result = response.data;
            if(result.success){
                try {
                    input.email = input.email.trim();
                    const registerRes = await axios.post(`${base_url}/api/auth/register`, input);
                
                    const data = registerRes.data;
                    localStorage.setItem('token', registerRes.data.token);
                    navigate(`/user`);
                } catch (error) {
                    console.log(error.response.status)
                    if(error.response.status === 409){
                        alert('Email already exists');
                        navigate('/login');
                    }
                    else{
                        alert('Registration failed. Please try again');
                    }
                }
                
            }
            else{
                alert('reCAPTCHA verification failed');
            }
        }
    }



    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className=" max-w-md">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <h2 className="text-2xl text-center font-bold mb-4">Sign Up</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Full Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            onChange={(e)=>handleChange(e)}
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            onChange={(e)=>handleChange(e)}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            onChange={(e)=>handleChange(e)}
                            placeholder="Enter your password"
                        />
                    </div>
                    <div>
                        <ReCAPTCHA ref={recaptcha} sitekey={import.meta.env.VITE_API_SITE_KEY} />
                    </div>
                    
                    <div className="flex flex-col my-2  justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign Up
                        </button>
                        <Link
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            to="/login"
                        >
                            Already have an account?  Log in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;  