import { Box } from "@mui/material"

export default ({ src, onAdd, cyempty }: { src: string; onAdd: () => void, cyempty?: string }) => {
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
      data-cy={cyempty}
    >
      <img src={src} alt="empty" />
    </Box>
  )
}