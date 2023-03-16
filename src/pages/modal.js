import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import EditMenu from "~component/core/edit-menu";
import Comment from "~component/core/commnet.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchTaskByProjectId,
  UpdateTaskByProjectId,
} from "~features/tasks/tasks-slice";
import { isEmptyArr, isEmptyObj } from "~utils/object-utils";
import {
  createFileByProjectId,
  deleteAndUpdateByTaskId,
  DeleteFileByTaskId,
} from "~features/files/files-slice";
import {
  fetchCommentListByTaskId,
  postCommentByTaskId,
} from "~features/comment/comment-slice";
import TaskStatusSelectBox from "~component/core/task-status-select-box";

export default function BasicModal({ open, setOpen, taskId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const findTask = useSelector((state) => state.tasks.task);
  const findCommentList = useSelector((state) => state.comments.commentList);

  // 전체 useState
  const [task, setTask] = React.useState({
    commentList: [],
    fileList: [],
  });
  // 댓글 등록 State
  const [comment, setComment] = React.useState({
    commentContent: "",
  });
  const [commentList, setCommentList] = React.useState([]);
  const [memberList, setMemberList] = React.useState([]);
  const [files, setFiles] = React.useState([]);
  const [disabled, setDisabled] = React.useState(true);
  const [popOver, setPopOver] = React.useState(findTask.findMemberName);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const fileInput = React.createRef();

  React.useEffect(() => {
    dispatch(fetchTaskByProjectId({ id, taskId }));
    dispatch(fetchCommentListByTaskId({ id, taskId }));
  }, [dispatch]);

  React.useEffect(() => {
    setTask({
      ...findTask,
    });
  }, [findTask]);

  React.useEffect(() => {
    setCommentList({
      ...findCommentList,
    });
  }, [findCommentList]);

  React.useEffect(() => {
    if (isEmptyArr(task.fileList) === false && task.fileList !== undefined) {
      setFiles(task.fileList.filter(() => true));
    }
  }, [task]);

  const style = {
    position: "absolute",
    top: "55%",
    left: "50%",
    width: "60%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    overflow: "scroll",
    height: "100%",
    p: 4,
  };

  const handleNewCommentChange = (e) => {
    const { name, value } = e.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };

  const handleCommentSubmit = (e) => {
    dispatch(postCommentByTaskId({ id, taskId, comment }));
  };

  const handleFileUpload = (e) => {
    fileInput.current.click();
  };

  const handleFileChange = (e) => {
    const newFiles = [];
    for (let i = 0; i < e.target.files.length; i++) {
      newFiles.push(e.target.files[i]);
    }
    setFiles(newFiles);
  };

  const handleDisabled = (_) => {
    setDisabled(!disabled);
  };

  // useForm
  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  // 전체 전송 Logic
  const onSubmit = async (e) => {
    e.preventDefault();
    e.persist();
    dispatch(UpdateTaskByProjectId({ id, task, taskId }));
    navigate(-1);

    // let formData = new FormData();
    // for (let i = 0; i < files.length; i++) {
    //   formData.append('files', files[i]);
    // }
    // formData.append('data', JSON.stringify(task));
  };
  const handleUpload = (e) => {
    let formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("fileList", files[i]);
    }
    if (isEmptyArr(files) === true) {
      //dispatch(createFileByProjectId({id, task, taskId}));
    } else {
      dispatch(deleteAndUpdateByTaskId({ id, taskId, formData }));
    }
  };

  const handlePopoverOpen = (event) => {
    // const id = Number(event.currentTarget.id) - 1;
    // const findMemberName = sampleTask.memberList.find(
    //   (element, index, arr) => index === id
    // );
    // setPopOver(findMemberName.name);
    setPopOver(task.memberName);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const popOpen = Boolean(anchorEl);

  return (
    <Container>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* CardActions on Click 이니까 상위 조건문에 있어야 한다.  */}
        {/* <Button color='primary' onClick={handleOpen}>Task</Button> */}
      </Box>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={4}
          sx={style}
        >
          <Box sx={{ display: "flex", width: "100%" }}>
            <Box>
              <TaskStatusSelectBox task={task} setTask={setTask} />
            </Box>
            <Box sx={{ marginLeft: "auto" }}>
              <Stack direction="row" spacing={2}>
                <Box sx={{ display: "flex" }}>
                  <Avatar
                    aria-owns={popOpen ? "mouse-over-popover" : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                    alt="Remy Sharp"
                    src={task.memberAvatarUrl}
                  />
                </Box>
                <Box>
                  <EditMenu handleDisabled={handleDisabled} />
                </Box>
              </Stack>
            </Box>
          </Box>
          <Box component="form" sx={{ width: "100%" }}>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              spacing={4}
            >
              <Box sx={{ width: "100%" }}>
                <TextField
                  required
                  id="outlined-required"
                  label={Object.keys(task)["taskTags"]}
                  name="taskTags"
                  value={task.taskTags || ""}
                  fullWidth
                  variant="standard"
                  disabled={disabled}
                  onChange={handleTaskChange}
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <TextField
                  required
                  id="outlined-required"
                  label={Object.keys(task)["taskTitle"]}
                  name="taskTitle"
                  value={task.taskTitle || ""}
                  fullWidth
                  variant="standard"
                  disabled={disabled}
                  onChange={handleTaskChange}
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <TextField
                  required
                  id="outlined-required"
                  label={Object.keys(task)["taskContent"]}
                  name="taskContent"
                  value={task.taskContent || ""}
                  fullWidth
                  variant="standard"
                  disabled={disabled}
                  onChange={handleTaskChange}
                  multiline
                  maxRows={5}
                />
              </Box>
              {/* <Box sx={{ width: "100%" }}>
                <TextField
                  required
                  id="outlined-required"
                  label={Object.keys(task)["taskStatus"]}
                  name="taskStatus"
                  variant="standard"
                  value={task.taskStatus || ""}
                  onChange={handleTaskChange}
                  fullWidth
                  disabled={disabled}
                />
              </Box> */}

              <Box sx={{ marginLeft: "auto !important" }}>
                <Button onClick={() => setOpen(false)}>cancel</Button>
                <Button onClick={onSubmit}>Save Task</Button>
              </Box>
              {/* 파일 리스트로 추가 시켜주는 기능 업로드 */}
              <Box sx={{ display: "flex", width: "100%" }}>
                <Box
                  className="fileList"
                  sx={{
                    marginRight: "auto",
                    display: "flex",
                    flexWrap: "wrap",
                    flexBasis: "50%",
                  }}
                >
                  {files.map((f) => (
                    <Box sx={{ width: "100%", display: "flex" }}>
                      <AttachFileIcon />
                      <Typography>{f.name}</Typography>
                    </Box>
                  ))}
                </Box>
                {/* 업로드 할 파일리스트 출력 */}
                <Box sx={{ marginLeft: "auto" }}>
                  <Button disabled={disabled} onClick={handleFileUpload}>
                    Upload
                  </Button>
                  <Button disabled={disabled} onClick={handleUpload}>
                    Save File
                  </Button>
                  <input
                    type="file"
                    ref={fileInput}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    multiple={true}
                    id="fileUpload"
                  />
                </Box>
              </Box>
            </Stack>
          </Box>

          {/* 댓글 수정하기 */}
          <Stack
            id="commentList"
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={4}
            sx={{ width: "100%", height: "200px" }}
          >
            {findCommentList?.length !== 0 &&
              findCommentList.map((m) => (
                <Comment
                  key={m.id}
                  com={m}
                  projectId={id}
                  taskId={taskId}
                  popOpen={popOpen}
                  handlePopoverOpen={handlePopoverOpen}
                  handlePopoverClose={handlePopoverClose}
                />
              ))}
          </Stack>
          {/* New Comment */}
          <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex" }}>
              <TextField
                // InputProps={{ disableUnderline: true }}
                required
                id="outlined-required"
                name="commentContent"
                variant="standard"
                value={comment.commentContent}
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
              id="mouse-over-popover"
              sx={{
                pointerEvents: "none",
              }}
              open={popOpen}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
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
