import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ width }) => {

    return (
        <div className='progress-container ' >
        <div className="progress-bar border border-gray-700 rounded-full">
            <div className="progress-bar__bar" style={{ width: `${width}%` }}></div>
        </div>
        <h3 className="progress-bar__number">{`${width}%`}</h3>
        </div>
    );
};

export default ProgressBar;