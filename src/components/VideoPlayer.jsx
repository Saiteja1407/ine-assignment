import React from 'react';
import './VideoPlayer.css';
const VideoPlayer = ({video_url}) => {
    return (
        <div className="video-player">
            <iframe
                src={video_url}
                title="lesson video player" 
                frameorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" 
                allowFullScreen>
                </iframe>
        </div>
    );
};

export default VideoPlayer;