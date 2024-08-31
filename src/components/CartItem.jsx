import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const CartItem = ({item,selectedCourses,removeFromCart,handleSelectCourses}) => {
  const isSelected = selectedCourses.has(item.id);
  const bgColor = isSelected ? 'bg-gray-200' : 'bg-white';
  const itemStyle = {
    padding: '0.5rem',
    margin: '0.5rem',
    borderRadius: '1.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    borderBottom: '1px solid #ccc'
  }

  const removeItem = async() => {
    try {
      const token = localStorage.getItem('token');
      const base_url = import.meta.env.VITE_API_URL;
      console.log(item.id);
      const response = await axios.delete(`${base_url}/api/cart/${item.id}`,{
        headers:{
          'Authorization':token
        }
      });
      if(response.status === 200){
        removeFromCart(item.id);
      }
      console.log(response);
    } catch (error) {
      console.log(error)
      
    }
  }

  return (
    <div className={`${bgColor}`} style={itemStyle} onClick={() => handleSelectCourses(item)} >
      <div className='flex justify-between items-center mx-1 md:pe-6 flex-wrap gap-2'>
        <div className='flex justify-start gap-3 flex-wrap md:flex-nowrap'>
          <img src='/tutor2.jpeg' alt='tutor' className='rounded-3xl'/>
          <div className='flex flex-col p-1 justify-around'>
            <h1 className='text-2xl'> {item.title} </h1>
            <p> {item.description}</p>
            <p className='font-semibold'> {item.instructor_name}</p>  
          </div>  
        </div>
        <div className='flex md:flex-col gap-5 '>
          <p className='text-2xl lg:text-3xl font-semibold me-4'> ₹ {item.price}</p>
          <button onClick={removeItem}>
            <DeleteIcon className='cursor-pointer' fontSize='large' color='error'/>
          </button>
        </div>   
      </div>
    </div>
  )
}

export default CartItem
