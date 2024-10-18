import { useEffect, useState } from "react"

import {Tooltip} from 'react-tooltip'

import { NavLink } from "react-router-dom"

import { useAuth } from "../context/AuthContext"

import styles from './Navbar.module.css'

import { FaHome } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";

const Navbar = ({openModal}) => {

  const {isLoggedIn, logout, isAuthenticated, email, userId} = useAuth()

  useEffect(() => {
    isLoggedIn()
  }, [])

  const handleRequestNewPassword = async() => {

    if(!email || !userId) return

    const response = await fetch("http://localhost:3001/request-new-password", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({email, userId})
    })

    const res = await response.json()

    if(res.message) {
      alert(res.message)
    } else {
      alert(res.error)
    }

  }

  return (
    <>

      <nav className={styles.navbar}>

        <div>
          <NavLink to="/" className={({isActive}) => (isActive ? styles.active : '')}> <FaHome className={styles.home}/> </NavLink>
        </div>

        <div className={styles.navbar_right_side}>

          {!isAuthenticated && <NavLink to="/login" className={({isActive}) => (isActive ? styles.active : '')}> Login </NavLink>}

          {!isAuthenticated && <NavLink to="/register" className={({isActive}) => (isActive ? styles.active : '')}> Register </NavLink>}

          {isAuthenticated && <NavLink to="/profile" className={({isActive}) => (isActive ? styles.active : '')}> Profile </NavLink>}

          {isAuthenticated && <button data-tooltip-id="signout" data-tooltip-content="sign out" data-tooltip-place="bottom" onClick={logout} className={styles.logout}> <CiLogout /> </button>}

          {isAuthenticated &&
            <div className={styles.dropdown_container}>
              {isAuthenticated && <FaGear className={styles.gear_btn} />}
              <div className={styles.dropdown_content}>
                <button onClick={handleRequestNewPassword} className={styles.dropdown_item}> Change Password </button>
                <button onClick={openModal} className={styles.dropdown_item}> Delete Account </button>
              </div>
            </div>
          }

        </div>
        
      </nav>

      <Tooltip
      id="signout"
      style={{backgroundColor: '#2A9DF4', color: "#FFF", borderRadius: '8px'}}
      delayShow={500}
      clickable
      />
    
    </>
  )
}

export default Navbar