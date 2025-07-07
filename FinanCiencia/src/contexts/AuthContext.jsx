import React, { createContext, useState, useContext, useEffect } from 'react';

// Parte 1: Criando um objeto que guarda o contexto.
const AuthContext = createContext(null);

// Parte 2: Construindo a "Torre de Transmissão"
export function AuthProvider({ children }) {
    // O estado que guarda se o usuário está logado ou não.
    // A lógica inicial verifica se já existe um token no localStorage!
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem('userToken');
        return token ? true : false;
    });

    // Função para fazer o login
    const login = (token) => {
        // Guarda o token recebido da API no localStorage
        localStorage.setItem('userToken', token);
        // Atualiza o estado para 'autenticado'
        setIsAuthenticated(true);
    };

    // Função para fazer o logout
    const logout = () => {
        // Remove o token do localStorage
        localStorage.removeItem('userToken');
        // Atualiza o estado para 'não autenticado'
        setIsAuthenticated(false);
    };
    
    // O 'value' é o sinal que a nossa rádio vai transmitir.
    // Estamos transmitindo o status atual e as funções para login e logout.
    const value = { isAuthenticated, login, logout };

    // Aqui, engloba todo o corpo da nossa aplicação e aplica a lógica de autenticação.
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Parte 3: Criando o "Rádio Portátil"
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider.');
    }
    return context;
}