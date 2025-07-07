import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Certifique-se que o caminho para seu AuthContext está correto

/**
 * Este componente atua como um "guardião" para as rotas privadas.
 * Ele verifica se o usuário está autenticado.
 * - Se estiver, ele renderiza o componente da rota solicitada através do <Outlet />.
 * - Se NÃO estiver, ele redireciona o usuário para a página de login.
 */
function PrivateRoute() {
    // 1. Usamos nosso hook customizado para verificar o estado da autenticação.
    // É aqui que "sintonizamos a rádio" para saber se o usuário está logado.
    const { isAuthenticated } = useAuth();

    // 2. Esta é a lógica principal do "segurança":
    // A sintaxe `isAuthenticated ? <Outlet /> : <Navigate />` é um operador ternário.
    // Lê-se: "SE 'isAuthenticated' for verdadeiro, ENTÃO renderize <Outlet />, SENÃO renderize <Navigate />".
    return isAuthenticated ? <Outlet /> : <Navigate to="/LoginPage" />;
}

export default PrivateRoute;