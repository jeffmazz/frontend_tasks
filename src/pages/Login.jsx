import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../context/AuthContext"

import styles from './Forms.module.css'

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Login = () => {

  const {isLoggedIn, isAuthenticated} = useAuth()
  const [url, setUrl] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const oldUrl = localStorage.getItem('resetPasswordRoute')
    if(oldUrl) {
      setUrl(oldUrl)
      localStorage.removeItem("resetPasswordRoute")
    } 
  }, [url])

  useEffect(() => {
    isLoggedIn()
    if(isAuthenticated == true) navigate('/')
  }, [isAuthenticated])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [text_password, setTextPassword] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async(e) => {

    e.preventDefault()

    const user = {email, password}

    const response = await fetch('http://localhost:3001/auth/login', {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(user)
    })

    const data = await response.json()

    if(data.token) {
      localStorage.setItem('authToken', data.token)
      await isLoggedIn()
      if (url) {
        navigate(`${url}`)
      }
    } else {
      setError(data.error)
    }

  }

  const changeInputPasswordType = () => {

    if(text_password == true) {
      setTextPassword(false)
    } else {
      setTextPassword(true)
    }

  }

  return (
    <div className={styles.forms_container}>

      <div className={styles.form_container}>

        <h3> Login </h3>

        <form onSubmit={handleLogin} className={styles.login_register_form}>

          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <div className={styles.password_div}>
            <input type={text_password ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            {text_password ? <FaRegEye onClick={changeInputPasswordType} className={styles.eye} /> : <FaRegEyeSlash onClick={changeInputPasswordType} className={styles.eye}/> }
          </div>

          <div className={styles.form_buttons}>
            <button type="submit"> Login </button>
            {error && <p className='error'> {error} </p>}
            <a href="/register"> Do not have an account </a>
            <a href="/forgot-password"> Forgot Password </a>
          </div>
        </form>

      </div>

    </div>
  )
}

export default Login