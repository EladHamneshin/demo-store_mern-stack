import React, { useContext, useEffect } from 'react';
import {
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import {
  AppBar as MUIAppBar,
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
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useNavigate } from 'react-router-dom';
import Logout from '@mui/icons-material/Logout';
import ROUTES from '../routes/routesModel.ts';
import { UserContext } from '../UserContext.tsx';
import { toastError, toastSuccess } from '../utils/toastUtils.ts';
import cartsAPI from '../api/cartsAPI.ts';
import * as cartLocalStorageUtils from '../utils/cartLocalStorageUtils.ts';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -5,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const AppBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();
  const context = useContext(UserContext)!;
  const { userInfo, logout, mode,  changeMode, productsInCart, setProductsInCart } = context

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  const handleLogout = async () => {
    handleCloseUserMenu();
    try {
      await logout();
      toastSuccess('User logged out successfully');
    } catch (err) {
      toastError((err as Error).message);
    }
  };

  const handleCart = () => {
    navigate(ROUTES.CART);
  };

  useEffect(() => {
    const updateQuantity = async () => {
      try {
        if (userInfo) {
          const cartData = await cartsAPI.getCart();
          setProductsInCart(cartData.items.length);
        } else {
          const localCart = cartLocalStorageUtils.getCart();

          if (localCart) {
            setProductsInCart(localCart.length);
          } else {
            setProductsInCart(0);
          }
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    }
    updateQuantity();
  }, [userInfo]);  

  return (
    <MUIAppBar position="static">
      <Toolbar sx={{ display:'flex', justifyContent:"space-between" }}>
        <Box  onClick={() => navigate('/')}   sx={{display:'flex', justifyContent:"space-between", alignItems:"center", cursor:"pointer" }}>
          <StorefrontIcon  sx={{ marginRight: 2 }} />
          <Typography  variant="h6" component="div" sx={{marginRight: 2}}>
            Demo Store
          </Typography>
        </Box>
        <Box sx={{ display:'flex', justifyContent:"space-between" }}>
        <IconButton color="inherit" onClick={changeMode} sx={{marginRight:0.2}}>
          {mode === 'dark' ? <LightMode /> :  <DarkMode />}
        </IconButton>
        <IconButton color="inherit" onClick={handleCart} sx={{marginRight:1.5}}>
          <StyledBadge badgeContent={productsInCart} color="warning">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
        {!userInfo && (
          <Button
            color="inherit"
            startIcon={<LoginIcon />}
            onClick={handleLogin}
          >
            Login
          </Button>
        )}

        {userInfo && (
          <Box sx={{ flexGrow: 0 }}>
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
                <Typography>{userInfo.email}</Typography>
              </MenuItem>
              <MenuItem key={'logOut'} onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
        </Box>
      </Toolbar>
    </MUIAppBar>
  );
};

export default AppBar;
