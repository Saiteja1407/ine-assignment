import React from 'react';
const LessonForm = ({ lesson, onChange, onRemove }) => {
    return (
      <div className="lesson-form">
        <input
          type="text"
          placeholder="Lesson Name"
          value={lesson.name}
          onChange={(e) => onChange('name', e.target.value)}
        />
        <textarea
          placeholder="Text Material"
          value={lesson.text_material}
          onChange={(e) => onChange('text_material', e.target.value)}
        />
        <input
          type="text"
          placeholder="Video URL"
          value={lesson.video_url}
          onChange={(e) => onChange('video_url', e.target.value)}
        />
        <button type="button" onClick={onRemove}>Remove Lesson</button>
      </div>
    );
  };

export default LessonForm;