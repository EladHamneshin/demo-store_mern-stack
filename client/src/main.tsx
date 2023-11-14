import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes/router.tsx'
import UserContextProvider from './UserContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>,
)
