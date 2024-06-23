import React from 'react'
import './EnrolledCourse.css'
import ProgressBar from './ProgressBar'
import { Link, useParams } from 'react-router-dom'
import ButtonComp from './ButtonComp'
const EnrolledCourse = (props) => {
  const {id} = useParams();
  return (
    <div className='enrolled-course-container'>
      <h2 id='enrolled-title'>{props.title}</h2>
      <ProgressBar/>
      <Link to={`/${id}`} ><ButtonComp title="Go To Course"/></Link>
    </div>
  )
}

export default EnrolledCourse
