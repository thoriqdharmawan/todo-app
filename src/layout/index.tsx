import { Outlet } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default () => {
  return (
    <Box sx={{ backgroundColor: '#E5E5E51F', minHeight: '100vh' }}>
      <AppBar data-cy="header-background" position="static" sx={(theme) => ({ boxShadow: theme.bs[1], marginBottom: '43px' })}>
        <Container maxWidth="md" disableGutters>
          <Typography
            variant="h1"
            component="div"
            sx={(theme) => ({
              p: "39px 0px 30px 0px",
              fontSize: 24,
              fontWeight: 700,
              lineHeight: "36px",
              [theme.breakpoints.down("md")]: {
                p: "38px 38px 30px 38px",
              },
            })}
            data-cy="header-title"
          >
            TO DO LIST APP
          </Typography>
        </Container>
      </AppBar>

      <Container maxWidth="md" disableGutters>
        <Outlet />
      </Container>

      <Box sx={{ height: '120px' }} />
    </Box>
  )
}