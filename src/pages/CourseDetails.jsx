import React, { useEffect, useState } from 'react';
import './CourseDetails.css';
import ButtonComp from '../components/ButtonComp';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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
        const enrollingData = await axios.post(`${base_url}/api/enrolled/${courseId}`,{},{
            headers:{
                'Authorization':token
            }
        })
        console.log(enrollingData.data);
        if(enrollingData.status==200){
            setIsEnrolled(true);
        }
        else{
            alert("student enrollment failed");
        }
    }
    

    useEffect(() => {
        const token = localStorage.getItem('token');
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
            const response = await axios.get(`${base_url}/api/courses/${courseId}`,{
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
            navigate(`/courses/${courseData.id}/${lesson.id}`)
        }
        
    }


    return (
        <>
        <div className='outer-container'>
            <h1 id='course-title'>{courseData.title}</h1>
            <p id='course-description'>{courseData.description}</p>
            <h2 id='tutor'>Tutor: {courseData.instructor_name}</h2>
        <div className='container'>
        {topics.map(topic => (
                <div key={topic.id}>
                    <h2>{topic.title}</h2>
                    <ul>
                        {lessonsByTopic[topic.id] && lessonsByTopic[topic.id].map(lesson => (
                                <h3 key={lesson.id} onClick={()=>handleLinkClick(lesson)} className='lesson-links'>{lesson.name}</h3>
                            
                        ))}
                    </ul>
                </div>
            ))}
        </div>
        <span onClick={handleClick} className='button-gap'>
                {isEnrolled ? <h4>Start Learning</h4>:<ButtonComp title='Enroll Now'/>}
            </span>
        </div>
        </>
    );
};

export default CourseDetails;



{/* <div className='left-container'>
            <h3>Syllabus:</h3>
            <ul>
                {topics.length>0 &&topics.map((topic) => (
                    <li key={topic.id}>{topic.title}</li>
                ))}
            </ul>
            </div>
            <div className='right-container'>
            <h3>Lessons:</h3>
            <ul>
                {lessons.length>0 && lessons.map((lesson) => (
                    <li key={lesson.id}>
                        {lesson.name} 
                    </li>
                ))}
            </ul>
            <div className='button-gap'>
                {isEnrolled ? <ButtonComp title='Start Learning'/> : <ButtonComp title='Enroll Now'/>}
            </div>
            </div> */}