import React from 'react';

const FormTopic = ({ topic, onChange, onAddLesson, onRemoveLesson }) => {
    return (
      <div className="topic-form">
        <input
          type="text"
          placeholder="Topic Name"
          value={topic.name}
          onChange={(e) => onChange('name', e.target.value)}
        />
        {topic.lessons.map((lesson, lessonIndex) => (
          <LessonForm
            key={lessonIndex}
            lesson={lesson}
            onChange={(field, value) => onChange('lessons', lessonIndex, field, value)}
            onRemove={() => onRemoveLesson(lessonIndex)}
          />
        ))}
        <button type="button" onClick={onAddLesson}>Add Lesson</button>
      </div>
    );
  };
 
  export default FormTopic;