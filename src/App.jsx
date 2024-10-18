import { useState } from 'react'

import {BrowserRouter, Routes, Route} from 'react-router-dom'

// Context
import { AuthProvider } from "./context/AuthContext"

// Components
import Navbar from './components/Navbar' 
import Modal from './components/Modal'

// Pages
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from './pages/Profile'
import ActiveAccount from './pages/ActiveAccount'
import GenNewPassword from './pages/GenNewPassword'
import ForgotPassword from './pages/ForgotPassword'
import PasswordRecover from './pages/PasswordRecover'

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <BrowserRouter>
      
        <AuthProvider>

          <Navbar openModal={openModal}/>

          <Routes>

            <Route path='/' element={<Home/>} />

            <Route path="/login" element={<Login/>} />

            <Route path="/register" element={<Register/>} />

            <Route path="/profile" element={<Profile/>} />

            <Route path="/active-account/:token" element={<ActiveAccount/>} />

            <Route path="/generate-new-password/:token" element={<GenNewPassword/>} />

            <Route path="/forgot-password" element={<ForgotPassword/>} />

            <Route path="/recovery-password/:token" element={<PasswordRecover/>} />

          </Routes>

          <Modal isOpen={isModalOpen} onClose={closeModal} promptText="Tem certeza que deseja deletar sua conta ?"/>

        </AuthProvider>
      
      </BrowserRouter>
    </>
  )

}

export default App