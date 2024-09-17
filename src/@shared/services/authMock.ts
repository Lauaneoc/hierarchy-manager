// @shared/services/auth.ts
import { User } from "../models/User";

// Tipagem para a função de login
interface LoginCredentials {
  username: string;
  password: string;
}

export const login = ({ username, password }: LoginCredentials): User => {
  // Simula o login
  const users: User[] = [
    { id: 1, username: 'user1', password: '123' }
  ];

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } else {
    throw new Error('Invalid credentials');
  }
};

export const logout = (): void => {
  localStorage.removeItem('user');
};

export const getUser = (): User | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
