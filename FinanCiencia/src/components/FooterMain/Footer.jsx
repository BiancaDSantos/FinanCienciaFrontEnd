import React from 'react';
import './Footer.css'; // CSS específico para o Footer (se houver)

function Footer() {
    return (
        <footer>
            {/* Conteúdo do seu rodapé aqui, se houver */}
            <p>&copy; {new Date().getFullYear()} Financia Ciência. Todos os direitos reservados.</p>
        </footer>
    );
}

export default Footer;