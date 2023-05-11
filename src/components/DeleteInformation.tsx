import { Box, Typography } from "@mui/material"
import Dialog from "./Dialog"

import InformationIcon from '@/assets/information-icon.svg'

export default ({ open, onClose }: { open: boolean, onClose: () => void }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box data-cy="modal-information" sx={{ display: 'flex', alignItems: 'center', padding: '20px 30px', width: 490 }}>
        <img src={InformationIcon} alt="info" />
        <Typography sx={{ fontSize: '14px', fontWeight: '500', marginLeft: '12px' }}>Activity berhasil dihapus</Typography>
      </Box>
    </Dialog>
  )
}