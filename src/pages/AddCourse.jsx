import React, { useState } from 'react';
import './AddCourse.css';

const AddCourse = () => {
    const [courseTitle, setCourseTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [topics, setTopics] = useState([{ topic: '', lessons: [''] }]);

    const handleTopicChange = (index, value) => {
        const updatedTopics = [...topics];
        updatedTopics[index].topic = value;
        setTopics(updatedTopics);
    };

    const handleLessonChange = (topicIndex, lessonIndex, value) => {
        const updatedTopics = [...topics];
        updatedTopics[topicIndex].lessons[lessonIndex] = value;
        setTopics(updatedTopics);
    };

    const addTopic = () => {
        setTopics([...topics, { topic: '', lessons: [''] }]);
    };

    const addLesson = (topicIndex) => {
        const updatedTopics = [...topics];
        updatedTopics[topicIndex].lessons.push('');
        setTopics(updatedTopics);
    };

    return (
        <div className='create-course-container'>
            <label>Course Title:</label>
            <input
                type="text"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
            />

            <label>Description:</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <label>Category:</label>
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            <label>Topics:</label>
            {topics.map((topic, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={topic.topic}
                        onChange={(e) => handleTopicChange(index, e.target.value)}
                    />

                    <label>Lessons:</label>
                    {topic.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex}>
                            <input
                                type="text"
                                value={lesson}
                                onChange={(e) =>
                                    handleLessonChange(index, lessonIndex, e.target.value)
                                }
                            />
                        </div>
                    ))}

                    <button onClick={() => addLesson(index)}>Add Lesson</button>
                </div>
            ))}

            <button onClick={addTopic}>Add Topic</button>
        </div>
    );
};

export default AddCourse;