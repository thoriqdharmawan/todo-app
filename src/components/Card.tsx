import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@/assets/delete-icon.svg'

export default () => {
  return (
    <Card
      sx={(theme) => ({
        maxWidth: 235,
        height: 234,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: theme.bs[2],
        padding: '22px 26px',
        borderRadius: '12px',
        cursor: 'pointer'
      })}
    >
      <CardContent sx={{ padding: 0 }}>
        <Typography fontWeight={700} fontSize={18}>Daftar Belanja Bulanan</Typography>
      </CardContent>

      <CardActions sx={{ padding: 0, display: 'flex', justifyContent: 'space-between' }}>
        <Typography color="#888888" fontSize="12px">
          5 Oktober 2021
        </Typography>
        <IconButton size="small" color="primary">
          <img src={DeleteIcon} alt="delete" />
        </IconButton>
      </CardActions>
    </Card>
  )
}