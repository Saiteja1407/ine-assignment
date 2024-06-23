import React from 'react';

const InputComp = ({width = '100%', placeholder='', query, setQuery}) => {
    const handleChange = (e) => {
        setQuery(e.target.value);
    }
    return (
        <div style={{ width: width }}>
            <input 
                type="text"
                style={{
                    padding: '10px',
                    margin: '10px',
                    width: '100%',
                    border:'2px solid rgb(59 130 246',
                    borderRadius: '5px'
                }}
                value={query}
                placeholder={placeholder}
                onChange={handleChange}
            />
        </div>
    );
};

export default InputComp;