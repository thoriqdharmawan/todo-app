import { Box } from "@mui/material"

export default ({ src, onAdd, cyempty }: { src: string; onAdd: () => void, cyempty?: string }) => {
  return (
    <Box
      onClick={onAdd}
      sx={(theme) => ({
        width: '767px',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        cursor: 'pointer',
        [theme.breakpoints.down("md")]: {
          width: "100%",
          "& img": {
            width: "80%",
            maxWidth: '767px',
          }
        },
      })}
      data-cy={cyempty}
    >
      <img src={src} alt="empty" />
    </Box>
  )
}