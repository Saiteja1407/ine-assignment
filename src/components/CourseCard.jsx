import React from 'react';
import './CourseCard.css';
import ButtonComp from './ButtonComp';
import { Link } from 'react-router-dom';

const CourseCard = ({ title, description, instructor_name, id }) => {

    return (
        <div className="course-card">
            <h2 className="course-name">{title}</h2>
            <p className="description">{description}</p>
            <p className="tutor-name">Tutor: {instructor_name}</p>
            <Link to={`/user/courses/${id}`}>
                <ButtonComp title='Go To Course'/>
            </Link>
        </div>
    );
};



export default CourseCard;