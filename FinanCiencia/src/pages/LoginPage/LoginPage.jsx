import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import authService from '../../services/authService';
import style from './LoginPage.module.css'
import logo from '../../assets/images/logo-financiencia.png';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !senha) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        try {
            // 2. SUBSTITUA A SIMULAÇÃO PELA CHAMADA REAL
            const response = await authService.login(email, senha);

            // 3. EXTRAIA O TOKEN DA RESPOSTA DA API
            // O backend deve retornar um objeto JSON com uma chave "token". Ex: { "token": "..." }
            const token = response.data.token;

            if (token) {
                // 4. CHAME A FUNÇÃO DE LOGIN DO CONTEXTO COM O TOKEN REAL
                login(token); //

                // 5. NAVEGUE PARA A PÁGINA PRIVADA
                navigate('/AdministrationPage'); // Ou sua página inicial privada
            } else {
                setError('Não foi possível obter o token de autenticação.');
            }

        } catch (err) {
            // O axios lança um erro para status como 401 (Não Autorizado) ou 500.
            if (err.response && err.response.status === 401) {
                setError('Usuário ou senha inválidos.');
            } else {
                setError('Ocorreu um erro no servidor. Tente novamente mais tarde.');
            }
            console.error("Erro de login:", err);
        }
    };

    // O restante do JSX (a parte do return) continua exatamente o mesmo
    return (
        <div className={style.loginContainer}>

            <div className={style.loginBox}>

                <img src={logo} alt="Logo FinanCiência" className={style.logo} />

                <form className={style.form} onSubmit={handleLogin}>

                    <div className={style.formGroup}>
                        <h2 className="login-title">Olá, administradores!</h2>

                        <div className={style.email}>
                            <label htmlFor="email">E-mail:</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Digite seu usuário"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className={style.senha}>
                            <label htmlFor="senha">Senha:</label>
                            <input
                                type="password"
                                id="senha"
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        
                        <button type="submit" className="login-button">Entrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;