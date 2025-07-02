import React from 'react';
import ButtonSearch from '../ButtonSearch/ButtonSearch'; // Seu componente ButtonSearch
import './Header.css'; // CSS específico para o Header

function Header({ onSearch }) {
    return (
        <header>
            <div className="div-header" id="header">
                <ul className="navbar-nav mr-auto"> {/* Mantido mr-auto para alinhamento Bootstrap */}
                    <li className="nav-item">
                        {/* Usaria Link do react-router-dom aqui para navegação SPA */}
                        <a className="nav-link" href="/LoginPage/index.html">Administrar Projetos</a>
                    </li>
                </ul>
            </div>
            {/* Substitua o input e botão de busca por seu componente ButtonSearch */}
            <div id="buscarInput"> {/* Mantenha o ID se o CSS antigo o usa */}
                <ButtonSearch onSearch={onSearch} />
            </div>
        </header>
    );
}

export default Header;