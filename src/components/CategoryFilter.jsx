import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const CategoryFilter = ({clearFilter, categories, handleCategory}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleButtonClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  
  const handleMenuItemClick = (action) => {
    setAnchorEl(null);
    action();
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Button
        variant="text"
        size="large"
        color="secondary"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleButtonClick}
      >
        Filters {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuItemClick}
      >
        {categories.length > 0 && categories.map((category, index) => (
            <MenuItem key={index} onClick={() => handleMenuItemClick(()=>handleCategory(category)) }>
                {category}
            </MenuItem>
        ))}
        <MenuItem onClick={()=>handleMenuItemClick(clearFilter)}>Clear Filter</MenuItem>
      </Menu>
    </div>
  );
};

export default CategoryFilter;


