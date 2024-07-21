import React from 'react'
import Header from '../components/Header'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/signup');
  }
  return (
    <>
    <Header/>
    <div className='flex flex-col md:flex-row  mt-12 justify-around'>
      <div className='flex flex-col justify-around w-full  items-center md:p-10'>
      <div className='px-4 md:px-0 py-4 w-fit text-start'>
        <h2 className='text-4xl lg:text-5xl py-4 font-bold text-gray-900'>Start Learning</h2>
        <h2 className='text-4xl lg:text-5xl xl:text-6xl pb-4 font-bold'>With our <span style={{color:'#9c27b0'}}>Expert</span></h2>
        
        <p>Build your skills with world class universities & Companies,</p>
        <p className='mb-2'>From your comfort zone</p>
        <Button  onClick={handleClick} variant='contained' color='secondary'>Get Started</Button></div>
      </div>
      <div className="w-full  items-center md:p-20">
        <img src='/HeroImgEducationWebsite.jpg' alt='Hero'/>
      </div>
    </div>
    
    </>
  )
}

export default LandingPage
