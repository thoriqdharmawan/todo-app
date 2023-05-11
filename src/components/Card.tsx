import React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

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
    <Card
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
      <CardContent sx={{ padding: 0 }}>
        <Typography fontWeight={700} fontSize={18} data-cy="activity-item-title">{title}</Typography>
      </CardContent>

      <CardActions sx={{ padding: 0, display: 'flex', justifyContent: 'space-between' }}>
        <Typography color="#888888" fontSize="12px" data-cy="activity-item-date">
          {date}
        </Typography>
        <IconButton onClick={handleDelete} size="medium" color="primary" data-cy="activity-item-delete-button">
          <img src={DeleteIcon} alt="delete" />
        </IconButton>
      </CardActions>
    </Card>
  )
}