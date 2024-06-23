import React, { useEffect, useState } from 'react'
import VideoPlayer from '../components/VideoPlayer'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Lesson.css'

const Lesson = () => {
    const [lessonData,setLessonData] = useState({});
    const [Loading,setLoading] = useState(true);
    const {lessonId} = useParams();

    useEffect(()=>{
        const fetchLesson = async () => {
            const base_url = import.meta.env.VITE_API_URL;
            const token = localStorage.getItem('token')
            const response = await axios.get(`${base_url}/api/courses/lesson/${lessonId}`,{
                headers:{
                    'Authorization':token
                }
            });
            const data = await response.data.data;
            console.log(response)
            setLessonData(data);
            setLoading(false)
        }
        fetchLesson();
    },[])
  return (
    <>
        {Loading?(<h1>Loading</h1>):(
            <div className='lesson-container'>
                <h1 className='lesson-title'>{lessonData.name}</h1>
                <VideoPlayer video_url={lessonData.video_url}/>
                <p>{lessonData.text_material}</p>
            </div>
        )}
    </>
  )
    
  
}

export default Lesson
