import { useState } from "react";
import { Box, Checkbox, IconButton, Typography } from "@mui/material"

import DeleteIcon from '@/assets/delete-icon.svg'
import EditIcon from '@/assets/edit-icon.svg'

interface Props {
  title: string;
  dotcolor: string;
  active: number;
  onDelete: () => void;
  onEdit: () => void;
  onChageStatus: (checked: boolean) => void;
}

export default (props: Props) => {
  const { title, dotcolor, onDelete, onEdit, onChageStatus, active } = props
  const [checked, setChecked] = useState(active === 0)

  return (
    <Box
      data-cy="todo-item"
      sx={(theme) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: theme.bs[2],
        marginBottom: '10px',
        padding: '26px 28px',
        borderRadius: '12px'
      })}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox
          checked={checked}
          onChange={(e) => {
            onChageStatus(e.target.checked)
            setChecked(e.target.checked)
          }}
          data-cy="todo-item-checkbox"
        />
        <Box
          sx={{
            width: '9px',
            height: '9px',
            backgroundColor: dotcolor,
            margin: '0px 16px',
            borderRadius: '50%'
          }}
          data-cy="todo-item-priority-indicator"
        />
        <Typography
          sx={{
            fontWeight: '500',
            fontSize: '18px',
            textDecoration: checked ? 'line-through' : 'none'
          }}
          data-cy="todo-item-title"
        >
          {title}
        </Typography>
        <IconButton data-cy="todo-item-edit-button" sx={{ marginLeft: '16px' }} onClick={onEdit}>
          <img src={EditIcon} alt="edit" />
        </IconButton>
      </Box>
      <IconButton data-cy="todo-item-delete-button" onClick={onDelete}>
        <img src={DeleteIcon} alt="delete" />
      </IconButton>
    </Box>
  )
}