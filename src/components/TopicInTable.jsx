import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const TopicInTable = ({topic,lessonsByTopic,isEnrolled,courseId}) => {
    const [isOpen, setIsOpen] = React.useState(true);
    const navigate = useNavigate();

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }

    const handleLinkClick = (lesson) =>{
        if(isEnrolled==false){
            alert('enroll to start learning!');
            return;
        }
        
        navigate(`/user/courses/${courseId}/${lesson.id}`)
        
        
    }
  return (
    <div key={topic.id}>
        <div onClick={handleOpen}  className='flex justify-between bg-slate-100 border-b border-gray-300 py-2 px-4 lg:px-8'>
        <h2>{topic.title}</h2>
        {isOpen?<ExpandLess/>:<ExpandMore/>}
        </div>
        {isOpen?(<ul>
        {lessonsByTopic[topic.id] && lessonsByTopic[topic.id].map(lesson => (
            <h3 key={lesson.id} onClick={()=>handleLinkClick(lesson)} className='lesson-links border-b border-gray-200 px-4 lg:px-8'>{lesson.name}</h3>
                            
        ))}
        </ul>):(<></>)}
    </div>
  )
}

export default TopicInTable
