import React, { useEffect, useState } from 'react'
import VideoPlayer from '../components/VideoPlayer'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Lesson.css'
import ButtonComp from '../components/ButtonComp';

const Lesson = () => {
    const [lessonData,setLessonData] = useState({});
    const [Loading,setLoading] = useState(true);
    const [lessonCompleted, setLessonCompleted] = useState(false);
    const {lessonId} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(!token){
            alert(`unauthorized access, please login`);
            navigate('/login');
        }
        const fetchLesson = async () => {
            const base_url = import.meta.env.VITE_API_URL;
            const response = await axios.get(`${base_url}/api/courses/lesson/${lessonId}`,{
                headers:{
                    'Authorization':token
                }
            });
            const data = await response.data.data;
            console.log(response.data.data)
            setLessonData(data);
            setLessonCompleted(data.is_completed);
            setLoading(false)
        }
        fetchLesson();
    },[])

    const handleComplete = async() => {
        const base_url = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem('token')
        const response = await axios.post(`${base_url}/api/courses/lesson/${lessonId}/complete`,{},{
            headers:{
                'Authorization':token
            }
        });
        if(response.status==200){
            setLessonCompleted(true);
        }
    }

  return (
    <>
        {Loading?(<h1>Loading</h1>):(
            <div className='lesson-container'>
                <h1 className='lesson-title'>{lessonData.name}</h1>
                <VideoPlayer video_url={lessonData.video_url}/>
                <p>{lessonData.text_material}</p>
                <div>
                    {lessonCompleted ? <p>Lesson Completed</p> :
                     <div onClick={handleComplete}><ButtonComp title="Mark as complete"/></div>}                   
                </div>
            </div>
        )}
    </>
  )
    
  
}

export default Lesson
