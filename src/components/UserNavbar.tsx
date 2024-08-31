import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'
import HamburgerMenu from './HamburgerMenu'
import { styled } from '@mui/system'
import { Button } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import axios from 'axios';

const CustomButton = styled(Button)({
    backgroundColor: 'primary',
    '&:hover':{
      backgroundColor: 'black',
      color: 'white'
    
    }
  })

const UserNavbar = () => {

    const [theme, setTheme] = useState(false);
    const navigate = useNavigate();
    const Links = [
        {name: 'Enrolled Courses', path: '/user/enrolledcourses'},
        {name: 'Cart', path: '/user/cart'},
    ]

    const handleLogout = async() => {  
        const base_url = (import.meta as any).env.VITE_API_URL;
        const token =localStorage.getItem('token')
        console.log(token)
        const res = await axios.post(`${base_url}/api/auth/logout`,{},
            {headers:{
            'Authorization': token
        }})
        localStorage.removeItem('token');
        alert('logout sucessful')
        navigate('/');
    }

  return (
    <div className='container bg-white mx-auto flex justify-between  p-3'>
         <div className='flex w-2/4 items-center justify-start '>
            <Link to='/user'>
                <h1 className='brand-name  font-bold text-xl md:text-3xl text-grey-900'>
                    EDU@Home
                 </h1>
            </Link>           
        </div>
    
        <div className='flex w-2/4 justify-end gap-2 md:gap-6'>

            <IconButton  color="inherit">
                {theme  ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
            <CustomButton variant="contained" onClick={handleLogout} color='secondary'>Logout</CustomButton>
            <HamburgerMenu Links={Links}/>
        </div>
    </div>
  )
}

export default UserNavbar
