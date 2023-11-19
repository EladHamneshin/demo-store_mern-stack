import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ROUTES from '../routes/routesModel';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidEmail, isValidPassword } from '../utils/validationUtils';
import userAPI from '../api/usersAPI';
import { toastError, toastSuccess } from '../utils/toastUtils';


const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailError, setEmailError] = useState(false);
  const [isPasswordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  
  const handleEmailBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!isValidEmail(event.target.value)) {
      setEmailError(true);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isValidEmail(event.target.value)) {
      setEmailError(false);
    }
  }

  const handlePasswordBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!isValidPassword(event.target.value)) {
      setPasswordError(true);
    }
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isValidPassword(event.target.value)) {
      setPasswordError(false);
    }
  }


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email') || '';
    const password = data.get('password') || '';
    const confirmPassword = data.get('confirmPassword') || '';

    if(password !== confirmPassword){
      toastError("Passwords do not match");
      return
    }
    
    if(!isValidEmail(email.toString())){
      toastError("Email must be a valid email");
      return
    }
      
    if(!isValidPassword(password.toString())){
      toastError("Password must be a valid password")
      return
    }

    try {
      setIsLoading(true);
      await userAPI.register(email.toString(), password.toString() );
      setIsLoading(false);
      toastSuccess("Register success");
      navigate(ROUTES.LOGIN);
    } catch (err) {
      setIsLoading(false);
      toastError((err as Error).message);
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
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onBlur={handleEmailBlur}
                  onChange={handleEmailChange}
                  required
                  fullWidth
                  error={isEmailError}
                  helperText={isEmailError ? 'Email must be a valid email address' : ''}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onBlur={handlePasswordBlur}
                  onChange={handlePasswordChange}
                  required
                  fullWidth
                  error={isPasswordError}
                  helperText={isPasswordError ? 'Password must be at least 7 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character' : ''}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              disabled={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Register
            </Button>

            {isLoading && <p>Loading...</p>}

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={ROUTES.LOGIN} variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export default RegisterPage;