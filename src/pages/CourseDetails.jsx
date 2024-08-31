import React, { useEffect, useState } from 'react';
import './CourseDetails.css';
import ButtonComp from '../components/ButtonComp';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import TopicInTable from '../components/TopicInTable';

const CourseDetails = () => {
    const [isEnrolled, setIsEnrolled] = useState(false); 
    const [inCart, setInCart] = useState(false);
    const {courseId} = useParams();
    const [courseData, setCourseData] = useState({});
    const [topics, setTopics] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [Loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const enrollStudent = async (e) => {
        const base_url = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem('token');
        const enrollingData = await axios.post(`${base_url}/api/enrollments`,{courseId:courseId},{
            headers:{
                'Authorization':token
            }
        })
        console.log(enrollingData.data);
        if(enrollingData.status==200){
            setIsEnrolled(true);
            navigate(`/user/courses/${courseId}/${lessons[0].id}`);
        }
        else{
            alert("student enrollment failed");
        }
    }
    
    // add to cart
    const addToCart = async () => {
        const base_url = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem('token');
        const addingToCart = await axios.post(`${base_url}/api/cart/${courseId}`,{},{
            headers:{
                'Authorization':token
            }
        });
        console.log(addingToCart.data);
        if(addingToCart.status==200){
            setInCart(true);
            alert("course added to cart");
        }
        else{
            alert("course not added to cart");
        }
    }
    // go to cart
    const takeToCart = async () => {
        navigate('/user/cart');
    }
         // to check whether course is in cart ,if user is not enrolled 
    // useEffect(() => {
    //     if(!isEnrolled && courseData.course_type==true) {
    //         const token = localStorage.getItem('token');
    //         const base_url = import.meta.env.VITE_API_URL;
    //         const checkCart = async () => {
    //             const response = await axios.get(`${base_url}/api/cart/${courseId}`,{
    //                 headers:{
    //                     'Authorization':token
    //                 }
    //             });
    //             const data = response.data.data;
    //             setInCart(data.count);
    //             console.log(data);
    //         }
    //         checkCart();

    //     }
        
    // },[isEnrolled]) 

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
            alert(`unauthorized access, please login`);
            navigate('/login');
        }
        const base_url = import.meta.env.VITE_API_URL;
        console.log(`${base_url}/api/enrolled/${courseId}`)
        const checkEnrollment = async () => {
            const enrolledRes = await axios.get(`${base_url}/api/enrolled/${courseId}`,{
            headers:{
                'Authorization':token
            }
            });
            console.log(enrolledRes.data)
            if(enrolledRes.data.code==1) setIsEnrolled(true);
            const response = await axios.get(`${base_url}/api/courses/${courseId}/content`,{
                headers:{
                    'Authorization':token
                }
            
            });
            const data = response.data.data;
            setCourseData(data.courseDetails);
            setTopics(data.topics);
            setLessons(data.lessons);
            setLoading(false);
            console.log(data);
            if (!enrolledRes.data.code) {
                const cartResponse = await axios.get(`${base_url}/api/cart/${courseId}`, {
                    headers: {
                        'Authorization': token
                    }
                });
                console.log(cartResponse.data);
                setInCart(Number(cartResponse.data.data.count));
            }

        }
        checkEnrollment();

    },[courseId])

    


    if(Loading) return <h1>Loading...</h1>


    const groupLessonsByTopic = (lessons) => {
        return lessons.reduce((acc, lesson) => {
            const { topic_id } = lesson;
            if (!acc[topic_id]) {
                acc[topic_id] = [];
            }
            acc[topic_id].push(lesson);
            return acc;
        }, {});
    };
    
    const lessonsByTopic = groupLessonsByTopic(lessons);

   


    return (
        <>
        <div className='outer-container mx-0 md:mx-8 lg:mx-16 my-4 lg:my-8'>
            <div className='bg-slate-100 border lg:w-3/4 border-gray-200 rounded-2xl p-4 text-start  md:px-4 lg:px-8 my-4'>
                <h1 id='course-title'>{courseData.title}</h1>
                <p id='course-description'>{courseData.description}</p>
                <h2 id='tutor'>Tutor: {courseData.instructor_name}</h2>
                {isEnrolled ? <h4>Start Learning</h4>:courseData.course_type==false?<span onClick={enrollStudent}><ButtonComp  title='Enroll Now'/></span>:inCart?<span onClick={takeToCart}><ButtonComp  title='Go To Cart'/></span>:<span onClick={addToCart}><ButtonComp  title='Add To Cart'/></span>}
            </div>
        <div className='container w-full lg:w-3/4 rounded-2xl border-2 border-gray-200 overflow-hidden'>
        {topics.map(topic => (
            <>
                <TopicInTable topic={topic} lessonsByTopic={lessonsByTopic} isEnrolled={isEnrolled} courseId={courseData.id}/>
            </>
            ))}
        </div>
            
        </div>
        </>
    );
};

export default CourseDetails;
