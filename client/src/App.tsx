import { Outlet } from 'react-router-dom'
import './App.css'
import Copyright from './components/Copyright'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AppBar from './components/AppBar'
import CategoryNav from './components/CategoryNav'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useContext } from 'react'
import {UserContext} from './UserContext'

function App() {
    const context = useContext(UserContext)!;
    const { mode } = context
    const theme = createTheme({
        palette: {
            mode: mode,
        },
    });

    return (
        <>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar/>
            <CategoryNav/>
            <ToastContainer />
            <Outlet />
            <Copyright sx={{ mt: 5 }} />
        </ThemeProvider>
        </>
    )
}

export default App
