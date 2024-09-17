// src/context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { login as authenticateUser, logout as logoutUser, getUser as fetchUser } from '../services/authMock';
import { User } from '../models/User';

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => void;
    logout: () => void;
}

const defaultAuthContext: AuthContextType = {
    user: null,
    login: () => {},
    logout: () => {}
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(fetchUser());

    const login = (username: string, password: string) => {
        try {
            const loggedInUser = authenticateUser({ username, password });
            setUser(loggedInUser);
        } catch (error) {
            console.error((error as Error).message);
        }
    };

    const logout = () => {
        logoutUser();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
