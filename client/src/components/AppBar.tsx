import React, { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  styled,
  Badge,
  BadgeProps,
  ListItemIcon,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import Logout from '@mui/icons-material/Logout';


const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -5,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const MyAppBar = () => {
  const logoPath =
    'https://i.pinimg.com/originals/c1/92/9d/c1929d3492c2f64ab65b43808c072043.jpg';
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [userStatus, setUserStatus] = useContext('UserContext');
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setUserStatus(undefined);
  };

  const handleLogin = () => {
    navigate('/login');
    console.log('Login clicked');
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const handleCart = () => {
    navigate('/cart');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <img
          src={logoPath}
          alt="Logo"
          style={{ marginRight: '16px', maxHeight: '50px' }}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Demo store
        </Typography>
        <IconButton color="inherit" onClick={handleCart}>
          <StyledBadge badgeContent={1} color="warning">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
        <Button
          sx={{ display: !userStatus && 'none' }}
          color="inherit"
          startIcon={<LoginIcon />}
          onClick={handleLogin}
        >
          Login
        </Button>
       
        <Box sx={{ flexGrow: 0, display: userStatus && 'none' }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar src="" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem key={'email'} disabled>
              <Typography>User Email</Typography>
            </MenuItem>
            <MenuItem key={'logOut'} onClick={handleCloseUserMenu}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
