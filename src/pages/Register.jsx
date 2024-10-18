import { useState, useEffect } from "react"

import { useNavigate } from "react-router-dom"

import styles from "./Forms.module.css"

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Register = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [text_password, setTextPassword] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleRegister = async(e) => {

    e.preventDefault()

    const newUser = {name, email, password, confirmPassword}

    const response = await fetch("http://localhost:3001/auth/register-request", {
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(newUser)
    })

    const data = await response.json()

    if(data.message) {
      alert(`E-mail enviado para ${email} para criar conta.`)
      navigate("/login")
    }

    if(!data.ok) {
      setError(data.error)
      return
    }

  }

  const handleLoginPage = () => {
    navigate('/login')
  }

  const changePasswordType = () => {

    if(text_password == true) {
      setTextPassword(false)
    } else {
      setTextPassword(true)
    }

  }

  return (
    <div className={styles.forms_container}>

      <div className={styles.form_container}>

        <h3> Create Account </h3>

        <form onSubmit={handleRegister} className={styles.login_register_form}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div className={styles.password_div}>
            <input type={text_password ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            {text_password ? <FaRegEye onClick={changePasswordType} className={styles.eye} /> : <FaRegEyeSlash onClick={changePasswordType} className={styles.eye}/> }
          </div>
          <div className={styles.password_div}>
            <input type={text_password ? 'text' : 'password'} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            {text_password ? <FaRegEye onClick={changePasswordType} className={styles.eye} /> : <FaRegEyeSlash onClick={changePasswordType} className={styles.eye}/> }
          </div>
          <div className={styles.form_buttons}>
            <button type="submit"> Register </button>
            {error && <p className="error"> {error} </p>}
            {/*<button onClick={handleLoginPage}> Login </button>*/}
            <a href="/login"> I have an account </a>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Register