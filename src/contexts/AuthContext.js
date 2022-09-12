import React, { useContext } from 'react';

// create a new React context that will be accessible in other components
const AuthContext = React.createContext();

// create custom hook that will return the current value of AuthContext
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider() {
    return (
        <AuthContext.Provider>
        
        </AuthContext.Provider>
    )
}