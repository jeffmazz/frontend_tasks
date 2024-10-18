import React from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Modal.module.css'

import { useAuth } from '../context/AuthContext'

const Modal = ({isOpen, onClose, promptText}) => {

    const navigate = useNavigate()

    if(!isOpen) return null

    const {userId} = useAuth()

    const deleteAccount = async(id) => {

        if(!id) {
            alert("O ID do usuário é obrigatório.")
            return
        }

        const response = await fetch(`http://localhost:3001/deleteaccount/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type":"application/json"
            }
        })

        if(!response.ok) {
            const errorData = await response.json()
            alert(errorData.Error || "Erro ao deletar usuário")
            return
        }

        if(response.ok) {
            localStorage.removeItem("authToken")
            onClose()
            navigate('/login')
        }

    }

  return (
    <div className={styles.modal_container}>

        <div className={styles.modal_content}>

            <p className={styles.modal_text}>{promptText}</p>
            <p className={styles.modal_text}> Essa ação é Irreversível </p>

            <div className={styles.modal_buttons}>
                <button className={styles.refuse} onClick={onClose}> Não </button>
                <button className={styles.confirm} onClick={() => deleteAccount(userId)}> Sim </button>
            </div>

        </div>
        
    </div>
  )
}

export default Modal