import { Outlet } from 'react-router-dom'
import './App.css'
import Copyright from './components/Copyright'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AppBar from './components/AppBar'
import CategoryNav from './components/CategoryNav'

function App() {
    return (
        <>
            <AppBar/>
            <CategoryNav/>
            <ToastContainer />
            <Outlet />
            <Copyright sx={{ mt: 5 }} />
        </>
    )
}

export default App
