import React, { useState, useEffect, useCallback } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const NotificationCheckBox = ({ name, checkedItemHandler }) => {
  const [bChecked, setChecked] = useState(false);

  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
    checkedItemHandler(name, target.checked);
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            l
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

export default NotificationCheckBox;
