import { Box } from "@mui/material"

export default ({ src }: { src: string }) => {
  return (
    <Box sx={{ maxWidth: '767px' }}>
      <img src={src} alt="empty" />
    </Box>
  )
}