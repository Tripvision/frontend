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
import { useParams } from 'react-router-dom';
// // N+1 Task <--> file <--> comment
// List<Task> taskList = taskRepository.findbyId(projectId);

// // 1번 태스크에 해당하는 file List 를 가져온다. where task.id = 1;
// // 2번 태스크에 해당하는 file List 를 가져온다. where task.id = 1;

// // Task 조회할 때 Project Id 로 조회.
// // -> task 를
// Task task = taskRepository.findbyId(taskId);
// // 1번 태스크에 해당하는 file List 를 가져온다. where task.id = 1;
// // 1번 태스크에 해당하는 comment List 를 가져온다. where task.id = 1;
// // 애를 그냥 리턴시켜주면 값이 나오나? 연관관계에 있는 값  ( commentList, FileList )
// // fetch join 써야된다.
// //

// 처음에 로딩 될 때 권한을 비교해서 권한을 노출 시켜줄 수 있도록 합시다.
export default function NewModal({ open, setOpen }) {
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

    const { id } = useParams();

    const sampleTask = {
        projectId: id,
        id: '',
        tags: '',
        title: '',
        content: '',
        status: '',
        author: '',
        fileList: [
            {
                id: '',
                name: '',
            }
        ],
    };

    // 전체 useState
    const [task, setTask] = React.useState({});
    // 댓글 등록 State
    const [comment, setComment] = React.useState({
        projectId: id,
        id: '',
        writer: 'Lee Sang Hyup',
        content: '',
        profileImage:
            'https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    });
    const [commentList, setCommentList] = React.useState([]);
    const [memberList, setMemberList] = React.useState([]);
    const [files, setFiles] = React.useState([]);
    const [disabled, setDisabled] = React.useState(false);
    const [popOver, setPopOver] = React.useState([sampleTask.memberList]);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const fileInput = React.createRef();

    React.useEffect(() => {
        console.log(files);
    }, [files]);

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
        const newTask = {
            ...task,
            fileList : files.map(file => file)
        }
        console.log(newTask);
    };

    const handlePopoverOpen = event => {
        const id = Number(event.currentTarget.id) - 1;
        const findMemberName = sampleTask.memberList.find(
            (element, index, arr) => index === id
        );
        setPopOver(findMemberName.name);
        setAnchorEl(event.currentTarget);
    };

    React.useEffect(() => {
        // 통신 로직
        const {
            projectId,
            id,
            tags,
            title,
            content,
            status,
            fileList,
            commentsList,
            memberList,
        } = sampleTask;
        setTask({ projectId, id, tags, title, content, status });
        setFiles(fileList);
        //    setCommentList(commentsList);
        //    setMemberList(memberList);
    }, []);

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const popOpen = Boolean(anchorEl);

    return (
        <Box>
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
                                {memberList.map(m => (
                                    <Box key={m.id} sx={{ display: 'flex' }}>
                                        <Avatar
                                            id={m.id}
                                            aria-owns={popOpen ? 'mouse-over-popover' : undefined}
                                            aria-haspopup='true'
                                            onMouseEnter={handlePopoverOpen}
                                            onMouseLeave={handlePopoverClose}
                                            alt='Remy Sharp'
                                            src={m.profileImage}
                                        />
                                    </Box>
                                ))}
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
                                    label={Object.keys(task)[2]}
                                    name='tags'
                                    value={task.tags || ''}
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
                                    label={Object.keys(task)[3]}
                                    name='title'
                                    value={task.title || ''}
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
                                    label={Object.keys(task)[4]}
                                    name='content'
                                    value={task.content || ''}
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
                                    label={Object.keys(task)[5]}
                                    name='status'
                                    variant='standard'
                                    value={task.status || ''}
                                    onChange={handleTaskChange}
                                    fullWidth
                                    disabled={disabled}
                                />
                            </Box>
                            {/* 파일 리스트로 추가 시켜주는 기능 업로드 */}
                            <Box sx={{ display: 'flex', width: '100%' }}>
                                <Box
                                    sx={{
                                        marginRight: 'auto',
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        flexBasis: '50%',
                                    }}
                                >
                                    {files.map(f => (
                                        <Box key={f.id} sx={{ width: '100%', display: 'flex' }}>
                                            <AttachFileIcon />
                                            <Typography>{f.name}</Typography>
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

                    {
                        task.id === true ?
                            <>
                                <Stack
                                    direction='column'
                                    justifyContent='flex-start'
                                    alignItems='center'
                                    spacing={4}
                                    sx={{ width: '100%' }}
                                >
                                    {commentList.map(m => (
                                        <Comment
                                            key={m.id}
                                            com={m}
                                            popOpen={popOpen}
                                            handlePopoverOpen={handlePopoverOpen}
                                            handlePopoverClose={handlePopoverClose}
                                        />
                                    ))}
                                </Stack>
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
                            </>
                            : null
                    }


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
        </Box>
    );
}
