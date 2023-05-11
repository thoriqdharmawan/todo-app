import { Box } from "@mui/material"

export default ({ src, onAdd }: { src: string; onAdd: () => void }) => {
  return (
    <Box
      onClick={onAdd}
      sx={{
        maxWidth: '767px',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      <img src={src} alt="empty" />
    </Box>
  )
}