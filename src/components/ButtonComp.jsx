import React from 'react';
import { Button } from '@mui/material';

const ButtonComp = ({title,bsize,disabled,onClick}) => {
    return (
        disabled?(<Button variant='contained'  color='secondary' size={bsize?bsize:'medium'} disabled>{title}</Button>):(
        <Button variant='contained'  color='secondary' size={bsize?bsize:'medium'}
            onClick={onClick}
            >
            {title}
        </Button>
        )
    );
};

export default ButtonComp;