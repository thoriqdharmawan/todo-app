import Typography from '@mui/material/Typography'

interface Props {
  children: React.ReactNode
}

export default (props: Props) => {
  const { children } = props
  return (
    <div>
      <div>
        <Typography variant="h2" component="h2" fontWeight={700} fontSize={36}>
          Activity
        </Typography>
      </div>

      <div>
        {children}
      </div>
    </div>
  )
}