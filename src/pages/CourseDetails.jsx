import React, { useEffect, useState } from 'react';
import './CourseDetails.css';
import ButtonComp from '../components/ButtonComp';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import TopicInTable from '../components/TopicInTable';

const CourseDetails = () => {
    const [isEnrolled, setIsEnrolled] = useState(false); 
    const {courseId} = useParams();
    const [courseData, setCourseData] = useState({});
    const [topics, setTopics] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [Loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleClick = async (e) => {
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

    const handleLinkClick = (lesson) =>{
        if(isEnrolled==false){
            alert('enroll to start learning!');
            return;
        }
        else{
            navigate(`/user/courses/${courseData.id}/${lesson.id}`)
        }
        
    }


    return (
        <>
        <div className='outer-container mx-0 md:mx-8 lg:mx-16 my-4 lg:my-8'>
            <div className='bg-slate-100 border lg:w-3/4 border-gray-200 rounded-2xl p-4 text-start  md:px-4 lg:px-8 my-4'>
                <h1 id='course-title'>{courseData.title}</h1>
                <p id='course-description'>{courseData.description}</p>
                <h2 id='tutor'>Tutor: {courseData.instructor_name}</h2>
                {isEnrolled ? <h4>Start Learning</h4>:<span onClick={handleClick}><ButtonComp  title='Enroll Now'/></span>}
            </div>
        <div className='container w-full lg:w-3/4 rounded-2xl border-2 border-gray-200 overflow-hidden'>
        {topics.map(topic => (
            <>
                {/* <div key={topic.id}>
                    <h2 className='bg-slate-100 border-b border-gray-300 py-2 px-4 lg:px-8'>{topic.title}</h2>
                    <ul>
                        {lessonsByTopic[topic.id] && lessonsByTopic[topic.id].map(lesson => (
                                <h3 key={lesson.id} onClick={()=>handleLinkClick(lesson)} className='lesson-links border-b border-gray-200 px-4 lg:px-8'>{lesson.name}</h3>
                            
                        ))}
                    </ul>
                </div> */}
                 <TopicInTable topic={topic} lessonsByTopic={lessonsByTopic}/>
                </>
            ))}
        </div>
            
        </div>
        </>
    );
};

export default CourseDetails;
