import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import React,{useState} from 'react'
import './HamburgerMenu.css'
import { Link, NavLink } from 'react-router-dom';

const HamburgerMenu = ({Links}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
  return (
    <div className='hamburger-menu-container'>
      <button onClick={toggleMenu} className='hamburger-menu'>
        {isOpen?<CloseIcon fontSize='large'/>:<MenuIcon fontSize='large'/>}
      </button>
        {isOpen && <div className='hamburger-menu-content flex flex-col rounded border  my-1'>
          {Links.map((link) => (
              <NavLink onClick={toggleMenu} to={link.path} key={link.name} className='p-2'>{link.name}</NavLink>
            
           ))}
            </div>
        }
    </div>
  )
}

export default HamburgerMenu
