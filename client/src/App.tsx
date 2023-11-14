import { Outlet } from 'react-router-dom'
import './App.css'
import Copyright from './components/Copyright'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import second from './api/cartsAPI'
import usersAPI from './api/usersAPI'
import CartPage from './pages/CartPage'
function App() {
    // usersAPI.loginUser("dani@gmail.com","Password123@") 
    // usersAPI.logoutUser()
    second.getCart()
    return (
        <>
            <CartPage></CartPage>
            <ToastContainer />
            <Outlet />
            <Copyright sx={{ mt: 5 }} />
        </>
    )
}

export default App
