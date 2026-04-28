import React from 'react'
import { AuthContext } from '../context/AuthContext'
import { useEffect, useState } from 'react'

const AUTH_STORAGE_KEY = "authUser";

function AuthProvider({children}) {
    const [user, setUSer] = useState(() => {
        try {
            const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
            return storedUser ? JSON.parse(storedUser) : null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        try {
            if (user) {
                localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
            } else {
                localStorage.removeItem(AUTH_STORAGE_KEY);
            }
        } catch {
            // Ignore storage write errors to keep app functional.
        }
    }, [user]);

  return (
    <AuthContext.Provider value={{user, setUSer}}>
        {children}
    </AuthContext.Provider> 
    
  )
}

export default AuthProvider