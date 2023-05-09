import { Box, Checkbox, IconButton, Typography } from "@mui/material"

import DeleteIcon from '@/assets/delete-icon.svg'
import EditIcon from '@/assets/edit-icon.svg'

interface Props {
  title: string;
  onDelete: () => void;
  onEdit: () => void;
}

export default (props: Props) => {
  const { title, onDelete, onEdit } = props

  return (
    <Box
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
        <Checkbox />
        <Box
          sx={{
            width: '9px',
            height: '9px',
            backgroundColor: '#ED4C5C',
            margin: '0px 16px',
            borderRadius: '50%'
          }}
        />
        <Typography sx={{ fontWeight: '500', fontSize: '18px' }}>{title}</Typography>
        <IconButton sx={{ marginLeft: '16px' }} onClick={onEdit}>
          <img src={EditIcon} alt="edit" />
        </IconButton>
      </Box>
      <IconButton onClick={onDelete}>
        <img src={DeleteIcon} alt="delete" />
      </IconButton>
    </Box>
  )
}