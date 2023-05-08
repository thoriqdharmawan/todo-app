import { Outlet } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default () => {

  return (
    <Box>
      <AppBar position="static" sx={(theme) => ({ boxShadow: theme.bs[1], marginBottom: '43px' })}>
        <Container maxWidth="md" disableGutters>
          <Typography variant="h1" component="div" sx={{ fontSize: 24, fontWeight: 700 }} py="32px">
            TO DO LIST APP
          </Typography>
        </Container>
      </AppBar>

      <Container maxWidth="md" disableGutters>
        <Outlet />
      </Container>

    </Box>
  )
}