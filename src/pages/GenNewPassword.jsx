import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from './Forms.module.css'

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

const GenNewPassword = () => {

    const {isAuthenticated, isLoggedIn, email, userId} = useAuth()

    const {token} = useParams()
    const navigate = useNavigate()
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [error, setError] = useState('')
    const [eyeValue, setEyeValue] = useState(false)


    const isLogged = async() => {
      await isLoggedIn()

      if(isAuthenticated === false) {
        const url = window.location.pathname
        localStorage.setItem('resetPasswordRoute', url)
        navigate('/login')
      } else if(isAuthenticated === true) {
        localStorage.removeItem('resetPasswordRoute')
      }
    }

    const fetchId = async() => {

        const response = await fetch("http://localhost:3001/verifyToken", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({token})
        })

        const res = await response.json()

        if(res.error) {
          alert(res.error)
          navigate('/login')
        }

        if(email) {
          if(email !== res.decoded.email) navigate('/')
        }

        if(userId) {
          if(userId !== res.decoded.userId) navigate('/')
        }

    }

    useEffect(() => {
      const renderFunctions = async() => {
        if(isAuthenticated === null) return
        await isLogged()
        await fetchId()
      }
      renderFunctions()
    }, [isAuthenticated])
    

    const handleNewPassword = async(e) => {

        e.preventDefault()

        if(!userId) {
            fetchId()
            return
        }

        const response = await fetch(`http://localhost:3001/change-password/${userId}`, {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({oldPassword, newPassword, confirmNewPassword, token})
        })

        const res = await response.json()

        if(res.message) {
          alert(res.message)
          navigate('/')
        }

        if(res.error) {
            setError(res.err)
        }

    }   

    const changeEyeValue = () => {
        setEyeValue(!eyeValue)
    }

  return (
    <div className={styles.forms_container}>

      <div className={styles.form_container}>

        <h3> Change Password </h3>

        <form onSubmit={handleNewPassword} className={styles.login_register_form}>

          <div className={styles.password_div}>
            <input type={eyeValue ? 'text' : 'password'} placeholder="Old password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
            {eyeValue ? (<FaRegEye className={styles.eye} onClick={changeEyeValue}></FaRegEye>) : <FaRegEyeSlash className={styles.eye} onClick={changeEyeValue}></FaRegEyeSlash>}
          </div>

          <div className={styles.password_div}>
            <input type={eyeValue ? 'text' : 'password'} placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
            {eyeValue ? (<FaRegEye className={styles.eye} onClick={changeEyeValue}></FaRegEye>) : <FaRegEyeSlash className={styles.eye} onClick={changeEyeValue}></FaRegEyeSlash>}
          </div>

          <div className={styles.password_div}>
            <input type={eyeValue ? 'text' : 'password'} placeholder="Confirm new password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}/>
            {eyeValue ? (<FaRegEye className={styles.eye} onClick={changeEyeValue}></FaRegEye>) : <FaRegEyeSlash className={styles.eye} onClick={changeEyeValue}></FaRegEyeSlash>}
          </div>

          <div className={styles.form_buttons}>
            <button type="submit"> Change Password </button>
            {error && <p className='error'> {error} </p>}
          </div>
        </form>

      </div>

    </div>
  )
}

export default GenNewPassword