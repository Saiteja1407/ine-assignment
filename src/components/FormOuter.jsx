import React, { useState } from 'react';
const FormOuter = () => {
    const [topics, setTopics] = useState([]);
  
    const handleTopicChange = (index, field, value) => {
      const newTopics = [...topics];
      if (field === 'name') {
        newTopics[index][field] = value;
      } else if (field === 'lessons') {
        const [lessonIndex, lessonField] = value;
        newTopics[index].lessons[lessonIndex][lessonField] = value;
      }
      setTopics(newTopics);
    };
  
    const handleAddTopic = () => {
      setTopics([...topics, { name: '', lessons: [] }]);
    };
  
    const handleAddLesson = (index) => {
      const newTopics = [...topics];
      newTopics[index].lessons.push({ name: '', text_material: '', video_url: '' });
      setTopics(newTopics);
    };
  
    const handleRemoveLesson = (topicIndex, lessonIndex) => {
      const newTopics = [...topics];
      newTopics[topicIndex].lessons.splice(lessonIndex, 1);
      setTopics(newTopics);
    };
  
    const handleRemoveTopic = (index) => {
      const newTopics = [...topics];
      newTopics.splice(index, 1);
      setTopics(newTopics);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Submitted Data:', topics);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <TopicForm
              topic={topic}
              onChange={(field, ...value) => handleTopicChange(index, field, value)}
              onAddLesson={() => handleAddLesson(index)}
              onRemoveLesson={(lessonIndex) => handleRemoveLesson(index, lessonIndex)}
            />
        {topics.map((topic, index) => (
          <div key={index} className="topic-wrapper">
            
            <button type="button" onClick={() => handleRemoveTopic(index)}>Remove Topic</button>
          </div>
        ))}
        <button type="button" onClick={handleAddTopic}>Add Topic</button>
        <button type="submit">Submit</button>
      </form>
    );
  };
  
  export default FormOuter;
  