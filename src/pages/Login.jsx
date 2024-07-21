
import React, { useState, useRef } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const recaptchaRef = useRef();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const captchaValue = recaptchaRef.current.getValue();
        if (!captchaValue) {
            alert('Please verify the reCAPTCHA');
        } else {
            try {
                const base_url = import.meta.env.VITE_API_URL;
                const res = await axios.post(`${base_url}/api/auth/verifyCaptcha`, { captchaValue });
                const result = res.data;
                if (result.success) {
                    try {
                        const loginRes = await axios.post(`${base_url}/api/auth/login`, input);
                        localStorage.setItem('token', loginRes.data.token);
                        navigate(`/user`);
                    } catch (error) {
                        console.log(error.response.status)
                        if(error.response.status === 401){
                            alert('Invalid credentials,pls try again');
                        }
                        else if(error.response.status === 409){
                            alert('User not found');
                            navigate(`/signup`);
                        }
                    }
                    
                } else {
                    alert('reCAPTCHA verification failed');
                }
            } catch (error) {
                console.error("Login failed: ", error);
                alert('Login failed. Please try again.');
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={input.email}
                        onChange={handleChange}
                        required
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
                        placeholder="Enter your password"
                        value={input.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <ReCAPTCHA ref={recaptchaRef} sitekey={import.meta.env.VITE_API_SITE_KEY} />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Login
                    </button>
                    </div>
                    <Link
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        to="/signup"
                        >
                            Don't have an account? Sign Up
                        </Link>
            </form>
        </div>
    );
};

export default Login;
