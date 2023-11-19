import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cartsAPI from '../api/cartsAPI'
import ROUTES from '../routes/routesModel'
import { Link, Container, CssBaseline, Box, Avatar, Typography, TextField, Button, Grid } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import * as localStorage from '../utils/cartLocalStorageUtils'
import { toastError, toastSuccess } from '../utils/toastUtils'
import { UserContext } from '../UserContext'

const sendCartToServer = () => {
    if (localStorage.isCartEmpty()) return;
    try {
        const cart = localStorage.getCart();
        cart.map((item) => { cartsAPI.addToCart(item.product_id._id, item.quantity.toString()); })
        localStorage.clearCart();
    } catch (err) {
        console.log(err);
    }
}

const LoginPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const context = useContext(UserContext)!;
    const { userInfo, login} = context

    React.useEffect(() => {
        if (userInfo) {
            navigate(ROUTES.HOME);
        }
    }, [navigate, userInfo]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email') || '';
        const password = data.get('password') || '';

        try {
            setIsLoading(true);
            await login(email.toString(), password.toString());
            setIsLoading(false);
            sendCartToServer();
            toastSuccess('Login successful');
            navigate(-1);
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