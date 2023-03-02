import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { debounce } from '@mui/material/utils';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { API_BASE_URL } from '~constants/index.js';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { InviteProjectMemberThunk } from '~features/project-members/project-members-slice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function UserSearch() {

  const { id } = useParams();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);

  const getComments = async (request, callback) => {
    try {
      const response = await axios.get(
        API_BASE_URL + "/v1/members/" + request
      );
      // return response.data;
      callback(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleSubmit = e => {
    dispatch(InviteProjectMemberThunk([{ projectId : id,  memberEmail : value}]))
  }

  const fetch = React.useMemo(
    () =>
      debounce((request, callback) => {
        getComments(request, callback);
      }, 400),
    []
  );

  React.useEffect(() => {
    let active = true;
    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch(inputValue, results => {
      if (active) {
        let newOptions = [];
        if (value) {
          newOptions = [value];
        }
        if (results) {
          newOptions = [...newOptions, ...results];
        }
        setOptions(newOptions);
      }
    });
    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <div>
      <Button color='primary' onClick={handleOpen}>
        Add User
      </Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...style }}>
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            sx={{ width: "100%" }}
            options={options}
            value={value}
            getOptionLabel={option =>
              typeof option === 'string' ? option : option
            }
            filterOptions={x => x}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            // input 박스 헬퍼 텍스트 입니다.
            renderInput={params => (
              <TextField {...params} label='Search User By Email' fullWidth />
            )}
            //옵션 렌더링 될 때 보여질 박스 입니다.
            renderOption={(props, option) => {
              console.log(option);
              return (
                <li {...props}>
                  <Grid container alignItems='center'>
                    <Grid
                      item
                      sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}
                    >
                      <Typography variant='body2' color='text.secondary'>
                        {option}
                      </Typography>
                    </Grid>
                  </Grid>
                </li>
              );
            }}
          />
          <Button onClick={handleSubmit}>invite</Button>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}
