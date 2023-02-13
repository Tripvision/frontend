import * as React from 'react';
import moment from 'moment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function DatePicker({state, handleChange}) {

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Stack spacing={3}>
        <DesktopDatePicker
          inputFormat="YYYY/MM/DD"
          name="dueDate"
          value={state || 'pick a due date'}
          onChange={date => {
            handleChange({ target: { value: moment(date._d).format('YYYY-MM-DD'), name: 'dueDate' } })}
          }
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}