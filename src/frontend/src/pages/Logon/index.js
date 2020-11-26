import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom'; // mudar a rota sem recarregar a página

import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Logon() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function hundleLogin(e) {
        e.preventDefault();

        try {
          const res = await api.post('sessions', {email, password});  
            
          localStorage.setItem("ongId", res.data.id);
          localStorage.setItem("ongName", res.data.name);

          history.push('/profile');

        } catch (error) {
            alert('Falha no login. Tente novamente.');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={hundleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="E-mail" 
                        value={email}
                        onChange={ e =>  setEmail(e.target.value)}
                    />

                    <input 
                        placeholder="Senha" 
                        value={password}
                        onChange={ e =>  setPassword(e.target.value)}
                    />
                    
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}