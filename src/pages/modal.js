import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import EditMenu from '~component/core/edit-menu';
import Comment from '~component/core/commnet.js';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTaskByProjectId } from '~features/tasks/tasks-slice';
import { isEmptyArr, isEmptyObj } from '~utils/object-utils';

export default function BasicModal({ open, setOpen, taskId }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const findTask = useSelector(state => state.tasks.task);

  React.useEffect(() => {
    dispatch(fetchTaskByProjectId({ id, taskId }))
  }, []);

  const style = {
    position: 'absolute',
    top: '55%',
    left: '50%',
    width: '60%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflow: 'scroll',
    height: '100%',
    p: 4,
  };


  // 전체 useState
  const [task, setTask] = React.useState({
    ...findTask
  });
  // 댓글 등록 State
  const [comment, setComment] = React.useState({
    projectId: id,
    taskId: taskId,
    writer: '',
    content: '',
    profileImage:
      '',
  });
  const [commentList, setCommentList] = React.useState([
    findTask.commentList
  ]);
  const [memberList, setMemberList] = React.useState([]);
  const [files, setFiles] = React.useState([...findTask.fileList]);
  const [disabled, setDisabled] = React.useState(true);
  const [popOver, setPopOver] = React.useState(findTask.findMemberName);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const fileInput = React.createRef();

  // React.useEffect(() => {
  //   console.log(files);
  // }, [files]);

  React.useEffect(() => {
    // console.log(task);
    console.log(files);
    //console.log(commentList);
    //console.log(isEmptyArr(commentList));
  })


  const handleNewCommentChange = e => {
    const { name, value } = e.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };

  const handleCommentSubmit = e => {
    // submit 보내기
    console.log(comment);
  };

  const handleFileUpload = e => {
    fileInput.current.click();
  };

  const handleFileChange = e => {
    const newFiles = [];
    for (let i = 0; i < e.target.files.length; i++) {
      newFiles.push(e.target.files[i]);
    }
    setFiles(newFiles);
  };

  const handleDisabled = _ => {
    setDisabled(!disabled);
  };

  // useForm
  const handleTaskChange = e => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  // 전체 전송 Logic
  const onSubmit = async e => {
    e.preventDefault();
    e.persist();

    let formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]); // 반복문을 활용하여 파일들을 formData 객체에 추가한다
    }
    formData.append('data', JSON.stringify(task));
    // for (let value of formData.values()) {
    //   console.log(value);
    // }
  };

  const handlePopoverOpen = event => {
    // const id = Number(event.currentTarget.id) - 1;
    // const findMemberName = sampleTask.memberList.find(
    //   (element, index, arr) => index === id
    // );
    // setPopOver(findMemberName.name);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const popOpen = Boolean(anchorEl);

  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* CardActions on Click 이니까 상위 조건문에 있어야 한다.  */}
        {/* <Button color='primary' onClick={handleOpen}>Task</Button> */}
      </Box>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Stack
          direction='column'
          justifyContent='flex-start'
          alignItems='flex-start'
          spacing={4}
          sx={style}
        >
          <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
            <Box sx={{ marginLeft: 'auto' }}>
              <Stack direction='row' spacing={2}>
                <Box sx={{ display: 'flex' }}>
                  <Avatar
                    aria-owns={popOpen ? 'mouse-over-popover' : undefined}
                    aria-haspopup='true'
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                    alt='Remy Sharp'
                  // src={m.profileImage}
                  />
                </Box>
                <Box>
                  <EditMenu handleDisabled={handleDisabled} />
                </Box>
              </Stack>
            </Box>
          </Box>
          <Box component='form' sx={{ width: '100%' }}>
            <Stack
              direction='column'
              justifyContent='flex-start'
              alignItems='center'
              spacing={4}
            >
              <Box sx={{ width: '100%' }}>
                <TextField
                  required
                  id='outlined-required'
                  label={Object.keys(task)['taskTags']}
                  name='taskTags'
                  value={task.taskTags || ''}
                  fullWidth
                  variant='standard'
                  disabled={disabled}
                  onChange={handleTaskChange}
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <TextField
                  required
                  id='outlined-required'
                  label={Object.keys(task)['taskTitle']}
                  name='taskTitle'
                  value={task.taskTitle || ''}
                  fullWidth
                  variant='standard'
                  disabled={disabled}
                  onChange={handleTaskChange}
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <TextField
                  required
                  id='outlined-required'
                  label={Object.keys(task)['taskContent']}
                  name='taskContent'
                  value={task.taskContent || ''}
                  fullWidth
                  variant='standard'
                  disabled={disabled}
                  onChange={handleTaskChange}
                  multiline
                  maxRows={5}
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <TextField
                  required
                  id='outlined-required'
                  label={Object.keys(task)['taskStatus']}
                  name='taskStatus'
                  variant='standard'
                  value={task.taskStatus || ''}
                  onChange={handleTaskChange}
                  fullWidth
                  disabled={disabled}
                />
              </Box>
              {/* 파일 리스트로 추가 시켜주는 기능 업로드 */}
              <Box sx={{ display: 'flex', width: '100%' }}>
                <Box
                  className="fileList"
                  sx={{
                    marginRight: 'auto',
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexBasis: '50%',
                  }}
                >
                  {files.map(f => (
                    <Box sx={{ width: '100%', display: 'flex' }}>
                      <AttachFileIcon />
                      <Typography>{f.fileName}</Typography>
                    </Box>
                  ))}
                </Box>
                {/* 업로드 할 파일리스트 출력 */}
                <Box sx={{ marginLeft: 'auto' }}>
                  <Button disabled={disabled} onClick={handleFileUpload}>
                    Upload
                  </Button>
                  <input
                    type='file'
                    ref={fileInput}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    multiple={true}
                    id='fileUpload'
                  />
                  
                </Box>
              </Box>
              <Box sx={{ marginLeft: 'auto !important' }}>
                <Button onClick={() => setOpen(false)}>cancel</Button>
                <Button onClick={onSubmit}>save Changes</Button>
              </Box>
            </Stack>
          </Box>

          {/* 댓글 수정하기 */}
          <Stack
            direction='column'
            justifyContent='flex-start'
            alignItems='center'
            spacing={4}
            sx={{ width: '100%' }}
          >
            {
              isEmptyArr(commentList) === false
                ?
                commentList.map(m => (
                  <Comment
                    key={m.id}
                    com={m}
                    popOpen={popOpen}
                    handlePopoverOpen={handlePopoverOpen}
                    handlePopoverClose={handlePopoverClose}
                  />
                ))
                : <>  </>
            }
          </Stack>
          {/* New Comment */}
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex' }}>
              <TextField
                // InputProps={{ disableUnderline: true }}
                required
                id='outlined-required'
                name='content'
                variant='standard'
                value={comment.content}
                onChange={handleNewCommentChange}
                fullWidth
                sx={{ mr: 2 }}
              />
              <Button onClick={handleCommentSubmit}>Register</Button>
            </Box>
          </Box>
          {/* PopOver UI  */}
          <Box>
            <Popover
              id='mouse-over-popover'
              sx={{
                pointerEvents: 'none',
              }}
              open={popOpen}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <Typography sx={{ p: 1 }}>{popOver}</Typography>
            </Popover>
          </Box>
        </Stack>
      </Modal>
    </Container>
  );
}
