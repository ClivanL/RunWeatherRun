import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import RunCircleIcon from '@mui/icons-material/RunCircle';
import {useNavigate} from 'react-router-dom'

const ResponsiveAppBar = () => {
  const navigate= useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  return (
    <AppBar style={{background:"teal"}} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <RunCircleIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            RunWeather
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem><Typography textAlign="center">Home</Typography></MenuItem>
              <MenuItem><Typography textAlign="center">Forecast</Typography></MenuItem>
              <MenuItem><Typography textAlign="center">Plot Tracks</Typography></MenuItem>
              <MenuItem><Typography textAlign="center">All Tracks</Typography></MenuItem>

            </Menu>
          </Box>
          <RunCircleIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            RunWeather
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={()=>navigate("/")}>Home</Button>
            <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={()=>navigate("/forecast")}>Forecast</Button>
            <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={()=>navigate("/listoftracks")}>List of Tracks</Button>
            <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={()=>navigate("/tracks")}>Routes</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
