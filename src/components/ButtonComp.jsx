import React from 'react';
import { Button } from '@mui/material';

const ButtonComp = ({title}) => {
    return (
        <Button variant='contained'  color='secondary'>
            {title}
        </Button>
    );
};

export default ButtonComp;