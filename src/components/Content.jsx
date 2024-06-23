import React from 'react';
import ButtonComp from './ButtonComp';
import VideoPlayer from './VideoPlayer';

const Content = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold m-5">Course Content (Lesson) Page</h1>
            <div className="w-full max-w-lg">
                {/* Video player */}
                <VideoPlayer/>

                {/* Lesson text materials */}
                <div className="bg-white py-4 my-4">
                    <p className="lorem">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam optio exercitationem velit dolor vitae, ex odit ullam provident! Iusto recusandae vel tenetur rem non error dolorum! Reiciendis corporis tempore modi.</p>
                </div>

                {/* Completion button */}
                <ButtonComp/>
            </div>
        </div>
    );
};

export default Content;