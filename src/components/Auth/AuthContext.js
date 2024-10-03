import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, removeToken, setToken } from '../../utils/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken('jwtToken');
        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const login = (token) => {
        setToken(token)
    };

    const logout = () => {
        removeToken('jwtToken');
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
