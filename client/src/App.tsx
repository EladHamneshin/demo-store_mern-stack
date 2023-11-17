import { Outlet } from 'react-router-dom'
import './App.css'
import Copyright from './components/Copyright'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AppBar from './components/AppBar'
import CategoryNav from './components/CategoryNav'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useContext, useMemo } from 'react'
import { UserContext } from './UserContext'
import { Box } from '@mui/material'

function App() {
    const context = useContext(UserContext)!;
    const { mode } = context
    const theme = useMemo(() => createTheme({
        palette: {
            mode: mode,
            primary: {
                main: '#556cd6',
            },
            secondary: {
                main: '#19857b',
            },
            background: {
                default: mode === 'dark' ? '#5A5A5A' : '#FFFAFA',
            },
        },
    }), [mode])

    return (     
           <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar />
                <CategoryNav />
                <Box display="flex" flexDirection="column" minHeight="100vh">
                    <Box flexGrow={1}>
                        <Outlet />
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Box>
                <ToastContainer />
            </ThemeProvider>
    )
}

export default App
