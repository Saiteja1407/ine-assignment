import React,{useState} from 'react'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import HamburgerMenu from './HamburgerMenu';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system'
import './Header.css'

const CustomButton = styled(Button)({
  backgroundColor: 'primary',
  '&:hover':{
    backgroundColor: 'black',
    color: 'white'
  
  }
})
const Header = () => {
    const [theme, setTheme] = useState(false);
    const navigate = useNavigate();
    const toggleTheme = () => {
        setTheme(!theme);
    }

    const handleLogin = () => {
        navigate('/login');
    }

    const Links = [
      {name: 'Home', path: '/'},
      {name: 'About', path: '/about'}
    ]

  return (
    <div className='container bg-white mx-auto flex justify-between  p-3 mt-2'>
        <div className='flex w-2/4 items-center justify-start'>
                <Link to='/'>
                <h1 className='brand-name font-bold text-xl md:text-3xl text-grey-900 ms-2 md:ms-8 xl:ms-10'>
                 EDU@Home
                </h1>
                </Link>           
        </div>
        
        <div className='flex w-2/4 justify-end gap-2 md:gap-6'>

            <IconButton onClick={toggleTheme} color="inherit">
                    {theme  ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
            <CustomButton variant="contained" onClick={handleLogin} color='secondary'>Login</CustomButton>
            <HamburgerMenu Links={Links}/>
        </div>
    </div>
  )
}

export default Header
