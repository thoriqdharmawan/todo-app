import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface Props {
  children: React.ReactNode
}

export default (props: Props) => {
  const { children } = props
  return (
    <div>
      <Box mb="49px">
        <Typography variant="h2" component="h2" fontWeight={700} fontSize={36}>
          Activity
        </Typography>
      </Box>

      <div>
        {children}
      </div>
    </div>
  )
}