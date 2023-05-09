import { Box, Button, Typography } from "@mui/material"

import AlertIcon from '@/assets/alert-icon.svg'

interface Props {
  onDelete: () => void;
  onCancel: () => void;
}

export default (props: Props) => {
  const { onDelete, onCancel } = props

  return (
    <Box
      sx={(theme) => ({
        padding: '50px',
        boxShadow: theme.bs[1],
        width: 490,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      })}
    >
      <img src={AlertIcon} alt="alert-icon" width="84px" />
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 500,
          textAlign: 'center',
          margin: '34px 0px 46px'
        }}
      >
        Apakah anda yakin menghapus activity <Typography component="span" sx={{ fontWeight: 700 }}>“Meeting dengan Client”?</Typography>
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }}>
        <Button variant="contained" onClick={onCancel}>Batal</Button>
        <Button variant="contained" onClick={onDelete} color="secondary">Hapus</Button>
      </Box>
    </Box>
  )
}