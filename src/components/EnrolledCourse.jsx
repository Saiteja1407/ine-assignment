import React from 'react'
import './EnrolledCourse.css'
import ProgressBar from './ProgressBar'
import { Link } from 'react-router-dom'
import ButtonComp from './ButtonComp'
const EnrolledCourse = ({course}) => {
  const width = Math.ceil(course.completed_lessons/course.total_lessons * 100);
  return (
    <div className='enrolled-course-container'>
      <h2 id='enrolled-title'>{course.course_title}</h2>
      <ProgressBar width={width}/>
      <Link to={`/courses/${course.course_id}`} ><ButtonComp title="Go To Course"/></Link>
    </div>
  )
}

export default EnrolledCourse
