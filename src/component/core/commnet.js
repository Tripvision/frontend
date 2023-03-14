import React, { useEffect, useState, useCallback, useMemo } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";

import EditMenu from "./edit-menu";
import EditComment from "./edit-comment";
import {
  deleteCommentByTaskId,
  updateCommentByTaskId,
} from "~features/comment/comment-slice";
import { useDispatch } from "react-redux";

export default function Comment({
  com,
  popOpen,
  projectId,
  taskId,
  handlePopoverOpen,
  handlePopoverClose,
}) {
  const [comment, setComment] = useState({});
  const dispatch = useDispatch();

  // Edit Menu State
  const [disabled, setDisabled] = React.useState(true);
  const handleDisabled = (_) => {
    setDisabled(!disabled);
  };

  React.useEffect(() => {
    setComment(com);
  }, [com]);

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };

  const handleUpdate = (e) => {
    const commentId = comment.commentId;
    dispatch(updateCommentByTaskId({ projectId, taskId, commentId, comment }));
  };
  const handleDelete = () => {
    const commentId = comment.commentId;
    dispatch(deleteCommentByTaskId({ projectId, taskId, commentId, comment }));
  };

  return (
    <>
      {comment && (
        <Box key={comment.commentId} sx={{ display: "flex", width: "100%" }}>
          <Avatar
            id={comment.id}
            aria-owns={popOpen ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            alt="Remy Sharp"
            src={comment.avatarUrl}
            sx={{ mr: 2 }}
          />
          <TextField
            InputProps={{ disableUnderline: true }}
            required
            name="commentContent"
            variant="standard"
            value={comment.commentContent || ""}
            onChange={handleCommentChange}
            fullWidth
          />
          {/* todo : 조건문 비교해서 수정가능한 사람만 트리거 하기 */}
          <EditComment
            handleDelete={() => handleDelete(comment)}
            handleSubmit={() => handleUpdate(comment)}
          />
        </Box>
      )}
    </>
  );
}
