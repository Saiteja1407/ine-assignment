import React from 'react';

const ButtonComp = ({title}) => {
    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
            {title}
        </button>
    );
};

export default ButtonComp;