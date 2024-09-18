// src/view/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../@shared/contexts/AuthContext';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        
        try {
            login(username, password);
            // Redireciona para o caminho original ou para a página inicial
            const from = location.state?.from?.pathname || '/';
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
            <Input 
                type="text" 
                label='Email'
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Digite seu email"
            />
            <Input 
                type="password" 
                label='Senha'
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Digite sua senha"
            />
            <Button title={'Login'} type='submit' className='mt-3'/>
        </form>
    );
}
