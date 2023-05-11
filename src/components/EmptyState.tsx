import { Box } from "@mui/material"

export default ({ src }: { src: string }) => {
  return (
    <Box sx={{
      maxWidth: '767px',
      margin: 'auto',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <img src={src} alt="empty" />
    </Box>
  )
}