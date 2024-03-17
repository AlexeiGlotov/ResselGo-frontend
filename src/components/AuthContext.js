// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: localStorage.getItem('token'),
        isAuthenticated: false,
        role: null,
        id:null
    });

    useEffect(() => {

        if (authState.token) {
            const decodedToken = jwtDecode(authState.token);
            setAuthState({...authState, isAuthenticated: true, role: decodedToken.Role, id: decodedToken.UserID});
        }
    }, [authState.token]);

        const login = (token) => {
            localStorage.setItem('token', token);
            const decodedToken = jwtDecode(token);
            setAuthState({ ...authState, token, isAuthenticated: true ,role: decodedToken.Role, id: decodedToken.UserID});
        };

        const logout = () => {
            localStorage.removeItem('token');
            setAuthState({ ...authState, token: null, role:null, isAuthenticated: false ,id:null});
        };

        return (
            <AuthContext.Provider value={{ ...authState, login, logout }}>
                {children}
            </AuthContext.Provider>
        );
    };