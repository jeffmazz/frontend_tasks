import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from './Forms.module.css'

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

const PasswordRecover = () => {

    const navigate = useNavigate()
    const {isAuthenticated, isLoggedIn} = useAuth()
    const {token} = useParams()
    const [error, setError] = useState('')
    const [eyeValue, setEyeValue] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')

    const changeEyeValue = () => {
        setEyeValue(!eyeValue)
    }

    const fetchEmail = async() => {
        const response = await fetch('http://localhost:3001/verifyToken', {
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({token})
        })

        const res = await response.json()

        if(res.error) {
          alert(res.error)
          navigate('/')    
        }

        if(res.decoded) setEmail(res.decoded.email)
        
    }

    useEffect(() => {
        fetchEmail()
    }, [])

    const checkIfUserIsLogged = async() => {
      await isLoggedIn()
      if(isAuthenticated === true) navigate('/')
    }

    useEffect(() => {
      checkIfUserIsLogged()
    }, [isAuthenticated])

    const handleRecoverPassword = async(e) => {

        e.preventDefault()

        const response = await fetch('http://localhost:3001/password-recovery', {
          method: "POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify({password, confirmPassword, email})
        })

        const res = await response.json()
        
        if(res.error) {
          alert(res.error)
          return
        }

        if(res.message) {
          alert(res.message)
          navigate('/')
        }

        

    }

  return (
    <div className={styles.forms_container}>

      <div className={styles.form_container}>

        <h3> Recover Password </h3>

        <form onSubmit={handleRecoverPassword} className={styles.login_register_form}>

          <div className={styles.password_div}>
            <input type={eyeValue ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            {eyeValue ? (<FaRegEye className={styles.eye} onClick={changeEyeValue}></FaRegEye>) : <FaRegEyeSlash className={styles.eye} onClick={changeEyeValue}></FaRegEyeSlash>}
          </div>

          <div className={styles.password_div}>
            <input type={eyeValue ? 'text' : 'password'} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            {eyeValue ? (<FaRegEye className={styles.eye} onClick={changeEyeValue}></FaRegEye>) : <FaRegEyeSlash className={styles.eye} onClick={changeEyeValue}></FaRegEyeSlash>}
          </div>

          <div className={styles.form_buttons}>
            <button type="submit"> New Password </button>
            {error && <p className='error'> {error} </p>}
          </div>
        </form>

      </div>

    </div>
  )
}

export default PasswordRecover