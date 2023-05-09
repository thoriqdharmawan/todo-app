import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AddIcon from '@/assets/add-icon.svg'

interface Props {
  children: React.ReactNode
}

export default (props: Props) => {
  const { children } = props
  return (
    <section>
      <Box mb="49px" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h2" component="h2" fontWeight={700} fontSize={36}>
          Activity
        </Typography>

        <Button
          variant="contained"
          disableElevation
          startIcon={<img src={AddIcon} alt="add" />}
          sx={{ borderRadius: "45px", fontWeight: 600 }}
        >
          Tambah
        </Button>
      </Box>

      <div>
        {children}
      </div>

    </section>
  )
}