import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './app/store.js'
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom'
import { Home } from '@mui/icons-material'
import OrdersTable from './components/OrdersTable.jsx'




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Provider store={store}>

    <App />

   </Provider>
  </React.StrictMode>,
)
