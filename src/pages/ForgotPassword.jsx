import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from './Forms.module.css'
import { useAuth } from "../context/AuthContext"

const ForgotPassword = () => {

    const {isAuthenticated, isLoggedIn} = useAuth()
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const checkIfUserIsAuthenticated = async() => {
        await isLoggedIn()
        if(isAuthenticated === true) {
            navigate('/')
        }
    }

    useEffect(() => {
        checkIfUserIsAuthenticated()
    }, [isAuthenticated])

    const handleForgotPassword = async(e) => {

        e.preventDefault()

        if(email === "") {
            alert("Digite o seu e-mail para recuperar a senha")
            return
        }

        const response = await fetch('http://localhost:3001/recover-password', {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({email})
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

        <form onSubmit={handleForgotPassword} className={styles.login_register_form}>

          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <div className={styles.form_buttons}>
            <button type="submit"> Recover Password </button>
            {error && <p className='error'> {error} </p>}

          </div>
        </form>

      </div>
 
    </div>
  )
}

export default ForgotPassword