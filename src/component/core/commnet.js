import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';

import EditMenu from './edit-menu';

export default function Comment({
  com,
  popOpen,
  handlePopoverOpen,
  handlePopoverClose,
}) {
  const [comment, setComment] = useState(com);

  // Edit Menu State
  const [disabled, setDisabled] = React.useState(true);
  const handleDisabled = _ => {
    setDisabled(!disabled);
  };

  React.useEffect(() => {
    console.warn(comment);
  })

  const handleCommentChange = e => {
    const { name, value } = e.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    // 통신으로 전송하기
  };

  return (
    <Box key={comment.id} sx={{ display: 'flex', width: '100%' }}>
      <Avatar
        id={comment.id}
        aria-owns={popOpen ? 'mouse-over-popover' : undefined}
        aria-haspopup='true'
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        alt='Remy Sharp'
        src={comment.avatarUrl}
        sx={{ mr: 2 }}
      />
      <TextField
        InputProps={{ disableUnderline: true }}
        required
        name='commentContent'
        variant='standard'
        value={com.commentContent || ''}
        onChange={handleCommentChange}
        fullWidth
        disabled={disabled}
      />
      {/* todo : 조건문 비교해서 수정가능한 사람만 트리거 하기 */}
      <EditMenu
        handleDisabled={handleDisabled}
        handleSubmit={handleSubmit}
        id={comment.id}
      />
    </Box>
  );
}
