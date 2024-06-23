import React, { useState } from 'react';
import AvatarComp from './Avatar';
import './Menu.css';
import { Link ,useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const handleLogout = async() => {  
        const base_url = import.meta.env.VITE_API_URL;
        const token =localStorage.getItem('token')
        console.log(token)
        const res = await axios.post(`${base_url}/api/auth/logout`,{},
            {headers:{
            'Authorization': token
        }})
        localStorage.removeItem('token');
        alert('logout sucessful')
        navigate('/login');
    }

    return (
        <div id='icon-menu' className={`menu ${isOpen ? 'open' : ''}`}>
            <div className="menu-icon" onClick={toggleMenu}>
                {isOpen ? "" : <AvatarComp />}
            </div>
            {isOpen && (
                <nav className='menu-container' style={{ transition: 'all .55s ease-in-out' }}>
                    <h2 onClick={toggleMenu} className='text-xl px-5 pt-5 pb-0' id='close'>X</h2>
                    <ul className='links-container'>
                        <Link to='/profile/' >Profile</Link>
                        <div className='cursor-pointer' onClick={handleLogout} >Logout</div>
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default Menu;