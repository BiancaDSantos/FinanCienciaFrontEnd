import React from 'react';

const LoginPage = () => {
    return (
        <div className="container text-center">
                <h1 className="title">FinanCiência</h1>

                <div className="login-box">
                    <h2 className="login-title">Login</h2>

                    /**Input de email */
                    <div className="form-group">
                        <label htmlFor="email">Usuário:</label>
                        <input
                        type="text"
                        id="email"
                        placeholder="Digite seu usuário"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </div>
                    /**Input de senha */
                    <div className="form-group">
                        <label htmlFor="senha">Senha:</label>
                        <input
                            type="password"
                            id="senha"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>
                    /** Botão de entrar */
            </div>
            {showDialog && <DialogMessage onClose={() => window.location.reload()} />}
        </div>
    );
}

export default LoginPage;