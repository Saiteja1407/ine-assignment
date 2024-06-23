import React, { useEffect, useState } from 'react'
import EnrolledCourse from '../components/EnrolledCourse';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProfilePage.css'

const ProfilePage = () => {
    const [enrolledCourses,setEnrolledCourses] = useState([]);
    const [Loading,setLoading] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        const fetchEnrolledCourses = async() => {
            const base_url = import.meta.env.VITE_API_URL;
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
            // const response = await axios.get(`${base_url}/api/user/${id}/profile`);
            console.log(response.data)
            setEnrolledCourses(response.data);
            setLoading(false);
        }
        fetchEnrolledCourses();
    },[])

    
    return(
        <div>
            { Loading ? ( <h1>loading</h1> ): (
               <>
                <h1 className='profile-page-title'>Enrolled Courses</h1>
                {enrolledCourses.map((course) => (
                // <h1>hello</h1>
                     <EnrolledCourse {...course} />
                    
            ))}
                </>
            )
            }
        </div>
    )
    
}

export default ProfilePage
