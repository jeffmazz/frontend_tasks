import styles from './ActiveAccount.module.css'
import { useParams, useNavigate } from 'react-router-dom'

// NOVA FEATURE, DECODIFICAR O TOKEN PARA ATIVAÇÃO DA CONTA NO FRONT E NO BACK


const ActiveAccount = () => {

    const navigate = useNavigate()

    const token = useParams().token
    
    const activeAccount = async() => {
        
        const response = await fetch('http://localhost:3001/auth/active-account', {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({token:token})
        })

        const res = await response.json()

        if(res.message) {
            alert(res.message)
            navigate('/login')
            return
        }

        if(res.error) {
            alert(res.error)
            return
        }

    }

  return (
    <div className={styles.active_account_container}>

        <button className={styles.active_account_btn} onClick={activeAccount}> Active </button>

    </div>
  )
  
}

export default ActiveAccount