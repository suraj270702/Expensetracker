import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar'
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import OrdersTable from './components/OrdersTable'
import Dashboard from './components/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path : '/',
      element : <Sidebar />,
      children:[
        {
          path : "orders",
          element : <OrdersTable />
        },
        {
          index : true,
          element : <Home />
        },
        {
          path:"dashboard",
          element : <Dashboard />
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
