import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AuthProvider from './context/AuthContext'
import Routes from './router/routes'

function App() {
  const [count, setCount] = useState(0)

  return (
   
    <AuthProvider>
      <Routes />
    </AuthProvider>

  )
}

export default App
