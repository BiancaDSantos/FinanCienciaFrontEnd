import React from 'react';
import { Link } from 'react-router-dom'; // Importe o Link
import styles from './Button.module.css'; // Usando o CSS Module da conversa anterior

/**
 * Componente de botão flexível.
 * Renderiza um link se a prop 'to' for fornecida, caso contrário, um botão padrão.
 *
 * @param {object} props
 * @param {string} [props.to] - O caminho para redirecionar (ex: '/contato'). Se fornecido, o componente vira um link.
 * @param {React.ReactNode} props.children - O conteúdo do botão (o texto ou ícone).
 * @param {function} [props.onClick] - Função a ser executada no clique quando não é um link.
 * @param {string} [props.label] - Um rótulo de acessibilidade (aria-label) para leitores de tela.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - O tipo do botão.
 */
function Button({ children, to, onClick, label, type = 'button', ...props }) {
  // Se a prop 'to' existir, renderiza um componente Link
  if (to) {
    return (
      <Link 
        to={to} 
        className={styles.botao} 
        aria-label={label || (typeof children === 'string' ? children : '')}
        {...props}
      >
        {children}
      </Link>
    );
  }

  // Caso contrário, renderiza um botão padrão
  return (
    <button
      type={type}
      className={styles.botao}
      onClick={onClick}
      aria-label={label || (typeof children === 'string' ? children : '')}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;