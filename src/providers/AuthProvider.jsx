import React from 'react'
import { AuthContext } from '../context/AuthContext'
import { useState } from 'react'

function AuthProvider({children}) {
    const [user, setUSer] = useState(null)
  return (
    <AuthContext.Provider value={{user, setUSer}}>
        {children}
    </AuthContext.Provider> 
    
  )
}

export default AuthProvider