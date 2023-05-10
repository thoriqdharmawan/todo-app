import { Box } from "@mui/material"

export default ({ color }: { color: string }) => {
  return (
    <Box
      sx={{
        width: '14px',
        height: '14px',
        borderRadius: '50%',
        marginRight: '19px',
        backgroundColor: color
      }}
    />
  )
}