import './App.css'
import Copyright from './components/Copyright'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {    
  return (
    <>
      <ToastContainer />
      <Outlet /> 
      <Copyright sx={{ mt: 5 }} />
    </>
  )
}

export default App
