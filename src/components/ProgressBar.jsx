import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ value, maxValue }) => {
    const progress = 20;

    return (
        <div className='progress-container' >
        <div className="progress-bar">
            <div className="progress-bar__bar" style={{ width: `${progress}%` }}></div>
        </div>
        <h3 className="progress-bar__number">{`${progress}%`}</h3>
        </div>
    );
};

export default ProgressBar;