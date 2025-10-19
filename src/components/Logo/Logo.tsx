import { useNavigate } from 'react-router-dom';

import css from './Logo.module.css';

export default function Logo() {
    const navigate = useNavigate();

    const handleClick = () => navigate('/')

    return <p className={css.logo} onClick={handleClick}>Logo</p>
}