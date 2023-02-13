import React, { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const NotifiType = ({ name, handleCheckedItemHandler }) => {

  const [bChecked, setChecked] = useState(false); 

  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
    handleCheckedItemHandler(name, target.checked);
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            checked={bChecked}
            onChange={e => checkHandler(e)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label={name}
      />
    </div>
  );
};

export default NotifiType;
