import React from 'react';
import ButtonSearch from '../ButtonSearch/ButtonSearch';
import Button from '../Button/Button'
import styles from './Header.module.css'
import logoSrc from '../../assets/images/logo-financiencia.png'
import { Link } from 'react-router-dom';

function Header({ onSearch }) {
    return (
        <header className={styles.header}>
            <Link to="/homepage" className={styles.logoLink}>
                <img src={logoSrc} alt="Logo FinanCiência" className={styles.logoImage} />
            </Link>

            <nav className={styles.actions}>
                <ButtonSearch onSearch={onSearch} />
                <Button to="/LoginPage">Administrar Projetos</Button>
            </nav>
        </header>
    );
}

export default Header;