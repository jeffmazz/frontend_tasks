import {useContext, createContext, useState} from 'react'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [userId, setUserId] = useState('')
    const [openModal, setOpenModal] = useState(false)

    const isLoggedIn = async() => {
        
        const token = localStorage.getItem('authToken')
        
        if(!token) return setIsAuthenticated(false)

        try {

            const response = await fetch("http://localhost:3001/auth", {
                method: "POST",
                headers: {
                    "authorization":`Bearer ${token}`
                }
            })

            const res = await response.json()

            if(response.ok) {
                setIsAuthenticated(true)

                const decoded = res.decoded

                setUserId(decoded.id)
                setName(decoded.name)
                setEmail(decoded.email)

            } else {
                setIsAuthenticated(false)
                logout()
            }

        } catch(err) {
            console.log(err)
        }
    
    }
        
    const logout = () => {
        localStorage.removeItem("authToken")
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, isLoggedIn, logout, userId, name, email}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)