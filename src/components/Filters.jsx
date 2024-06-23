import React from 'react'

const Filters = (props) => {
  return (
    <div className='filters-container'>
      { props.catagories && 
        props.catagories.map((catagory,index) => (
         <ButtonComp title={catagory} key={index}/> 
         )) 
     }
    </div>
  )
}

export default Filters
