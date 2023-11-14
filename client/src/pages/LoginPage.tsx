import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import usersAPI from '../api/usersAPI'
import ROUTES from '../routes/routesModel'
import { toast } from 'react-toastify'
import UserInfo from '../types/UserInfo'
import { Copyright } from '@mui/icons-material'
import { Link ,Container, CssBaseline, Box, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Grid } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LoginPage = () => {
  const navigate = useNavigate();
  const { userInfo ,login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (userInfo) {
      navigate(ROUTES.HOME);
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') || '';
    const password = data.get('password') ||  '';

    try {
      setIsLoading(true);
      const loggedUser: UserInfo = await usersAPI.loginUser(email.toString(), password.toString());
      setIsLoading(false);
      login(loggedUser);
      navigate(ROUTES.HOME);
    } catch (err) {
      setIsLoading(false);
      toast.error((err as Error).message);    
    }
  };

  return (
    <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>

              {isLoading && <p>Loading...</p>}

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={ROUTES.REGISTER} variant="body2">
                    {"Don't have an account? Register"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
  )
}

export default LoginPage;