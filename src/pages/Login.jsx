// import React,{ useState, useRef } from 'react';
// import axios from 'axios';
// import ReCAPTCHA from 'react-google-recaptcha';

// const Login = () => {
//     const [input,setInput] = useState({
//         email:"",
//         password:""
//     })
//     const recaptcha = useRef();
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setInput({
//             ...input,
//             [e.target.id]: e.target.value
//         });
//     };

//     const handleSubmit = async(e) => {
//         e.preventDefault();
//         const captchaValue = recaptcha.current.getValue();
//         if(!captchaValue) alert('please verify the reCAPTCHA')
//         else {
//             const base_url = import.meta.env.VITE_API_URL;
//             const res = await axios.post(`${base_url}/api/auth/verifyCaptcha`, captchaValue);
//             const result = res.data;
//             if(result.success){
//                 const loginRes = await axios.post(`${base_url}/api/auth/login`, input);
//                 const id = loginRes.data;
//                 navigate(`/:${id}`);
//             }
//             else{
//                 alert('reCAPTCHA verification failed');
//             }
//         }
        
//     };

//     return (
//         <div className="flex justify-center items-center h-screen">
//             <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                         Email
//                     </label>
//                     <input
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="email"
//                         type="email"
//                         placeholder="Enter your email"
//                         value={email}
//                         onChange={handleEmailChange}
//                         required
//                     />
//                 </div>
//                 <div className="mb-6">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//                         Password
//                     </label>
//                     <input
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="password"
//                         type="password"
//                         placeholder="Enter your password"
//                         value={password}
//                         onChange={handlePasswordChange}
//                         required
//                     />
//                 </div>
//                 <ReCAPTCHA ref={recaptcha} sitekey={import.meta.env.VITE_API_SITE_KEY}/>
                
//                 <div className="flex items-center justify-between">
//                     <button
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                         type="submit"
//                     >
//                         Sign In
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default Login;

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
                console.log(result)
                if (result.success) {
                    const loginRes = await axios.post(`${base_url}/api/auth/login`, input);
                    localStorage.setItem('token', loginRes.data.token);
                    navigate(`/`);
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
                        Sign In
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
