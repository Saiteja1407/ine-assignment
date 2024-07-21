import React from 'react';
import './CourseCard.css';
import ButtonComp from './ButtonComp';
import {Button} from '@mui/material';
import { Link } from 'react-router-dom';

const CourseCard = ({ title, description, instructor_name, id }) => {
    const [variant, setVariant] = React.useState('outlined');
    const handleButtonHover = () => {
        if(variant === 'contained') setVariant('outlined')
        else
        setVariant('contained')
    }
    return (
        <div className="course-card items-center bg-slate-100 rounded-3xl px-4 pb-4">
            <img src='./tutor2.jpeg' alt='tutor' className='rounded-3xl mt-2 mx-auto'/>
            <h2 className="course-name">{title}</h2>
            <p className="description">{description}</p>
            <p className="tutor-name text-gray-700">Tutor: {instructor_name}</p>
            <Link to={`/user/courses/${id}`}>
                <Button onMouseOver={handleButtonHover} onMouseLeave={handleButtonHover} variant={variant} color='secondary'>Go To Course</Button>
            </Link>
        </div>
    );
};



export default CourseCard;