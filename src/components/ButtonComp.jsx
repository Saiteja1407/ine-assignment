import React from 'react';
import { Button } from '@mui/material';

const ButtonComp = ({title,bsize}) => {
    return (
        <Button variant='contained'  color='secondary' size={bsize?bsize:'medium'}>
            {title}
        </Button>
    );
};

export default ButtonComp;