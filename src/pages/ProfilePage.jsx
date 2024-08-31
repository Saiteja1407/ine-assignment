import React, { useEffect, useState } from 'react'
import EnrolledCourse from '../components/EnrolledCourse';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProfilePage.css'

const ProfilePage = () => {
    const [enrolledCourses,setEnrolledCourses] = useState([]);
    const [Loading,setLoading] = useState(true);
    const [NoCourse,setNoCourse] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
            alert(`unauthorized access, please login`);
            navigate('/login');
        }
        const fetchEnrolledCourses = async() => {
            const base_url = import.meta.env.VITE_API_URL;
            const response = await axios.get(`${base_url}/api/enrollments`,{
                headers:{
                    'Authorization':token
                }
            });
            if(response.data.data.length === 0){
                setNoCourse(true);
            }
            setEnrolledCourses(response.data.data);
            setLoading(false);
        }
        fetchEnrolledCourses();
    },[])

    
    return(
        <>
            { Loading ? ( <h1>loading</h1> ): NoCourse?(<div>
                <h1 className='relative font-serif mt-9 -mb-9 z-10 text-center text-2xl md:text-3xl text-blue-700'>You are currently not enrolled in any course.</h1>
                <img className='md:w-3/4 lg:w-1/2 mx-auto' src ='/nodata.jpg' alt='nodata'/>
            </div>
            ): (
                enrolledCourses && enrolledCourses.length === 0 ? (<h1>You didn't enroll to any course yet.</h1>):(
                    <div className='items-center mt-4 lg:mt-8'>
                        <div className='w-fit m-auto text- '>
                        <h1 className='profile-page-title text-4xl'>Enrolled Courses</h1>
                        {enrolledCourses.map((course) => (
                            // <h1>hello</h1>
                            <div key={course.id}>
                                <EnrolledCourse course={course} />
                            </div>
                     
                    ))}
                    </div>
                    </div>
                )
               
            )}
        </>
    )
    
}

export default ProfilePage
