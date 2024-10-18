import { useState, useEffect } from "react"

import { useNavigate } from "react-router-dom"

import { useAuth } from "../context/AuthContext"

import styles from './Forms.module.css'

const Profile = () => {

    const {isLoggedIn, isAuthenticated, name, email} = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        isLoggedIn()
        if(isAuthenticated == false) {
            navigate('/')
        }
    }, [isAuthenticated])

    const handleChangePassword = async(e) => {

        e.preventDefault()

        const response = await fetch('http://localhost:3001/request-new-password', {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({email})
        })

        const data = await response.json()

        if(response.ok) {
            alert(data.Message)
        } else {
            alert(data.Error)
        }

    }

  return (
    <div className={styles.forms_container}>

        {isAuthenticated == null ?

        (<p className="p-loading"> Carregando ... </p>)
        
        :
        
        (<div className={styles.forms_container}>

            <div className={styles.form_container}>
                
                <h3> Profile Page </h3>

                <form onSubmit={handleChangePassword} className={styles.login_register_form}>

                    <input type="text" disabled placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>

                    <input type="email" disabled placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>

                </form>

            </div>

        </div>)}

    </div>
  )
}

export default Profile