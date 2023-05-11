import { Box, Button, Typography } from "@mui/material"

import AlertIcon from '@/assets/alert-icon.svg'
import Dialog from "./Dialog";
interface Props {
  open: boolean;
  title: string | undefined;
  type: string;
  onDelete: () => void;
  onCancel: () => void;
  cymodal?: string;
}

export default (props: Props) => {
  const { open, title, type, onDelete, onCancel, cymodal } = props

  return (
    <Dialog open={open} onClose={onCancel}>
      <Box
        sx={(theme) => ({
          padding: '50px',
          boxShadow: theme.bs[1],
          width: 490,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        })}
        data-cy={cymodal}
      >
        <img src={AlertIcon} alt="alert-icon" width="84px" />
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 500,
            textAlign: 'center',
            margin: '34px 0px 46px'
          }}
          data-cy="modal-delete-title"
        >
          Apakah anda yakin menghapus {type} <Typography component="span" sx={{ fontWeight: 700 }}>“{title}”?</Typography>
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }}>
          <span onClick={onCancel} data-cy="modal-delete-cancel-button">
            <Button
              variant="contained"
              color="secondary"
              sx={{ padding: '13.5px 45px' }}
            >
              Batal
            </Button>
          </span>
          <span onClick={onDelete} data-cy="modal-delete-confirm-button">
            <Button
              variant="contained"
              color="error"
              sx={{ padding: '13.5px 45px' }}
            >
              Hapus
            </Button>
          </span>
        </Box>
      </Box>
    </Dialog>
  )
}