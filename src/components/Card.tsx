import React from 'react';

import { Box, Typography, IconButton } from '@mui/material';

import DeleteIcon from '@/assets/delete-icon.svg'

interface Props {
  title: string;
  date: string;
  onClick: () => void;
  onDelete: () => void;
}

export default (props: Props) => {
  const { title, date, onClick, onDelete } = props

  const handleDelete = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    ev.stopPropagation();
    onDelete()
  }

  return (
    <Box
      onClick={onClick}
      sx={(theme) => ({
        maxWidth: 235,
        height: 234,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: theme.bs[2],
        padding: '22px 26px',
        borderRadius: '12px',
        cursor: 'pointer'
      })}
      data-cy="activity-item"
    >
      <Typography fontWeight={700} fontSize={18} data-cy="activity-item-title">{title}</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography color="#888888" fontSize="14px" data-cy="activity-item-date">
          {date}
        </Typography>
        <IconButton onClick={handleDelete} size="medium" color="primary" data-cy="activity-item-delete-button">
          <img src={DeleteIcon} alt="delete" />
        </IconButton>
      </Box>
    </Box>
  )
}