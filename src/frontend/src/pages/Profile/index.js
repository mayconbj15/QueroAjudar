import React, { useState, useEffect } from 'react';

import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Profile() {

    // Como é um conjuto de dados então 
    // começaremos com o array vazio
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();


    // Pegar da armazenamento local do navegador
    // dca0fe2a
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');


    // Toda vez que alguma var do arranjo(passado no 
    // parâmetro)for alterada, ele executa a função passada 
    // no parâmetro
    useEffect( () => {
        api.get('profile', {
            headers: { Authorization: ongId }
        }).then( res => {
            setIncidents(res.data);
        });
    }, [ongId]); // Passamos [ongId] somente por convenção

    async function hundleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: { Authorization: ongId }
            });

            await setIncidents(incidents.filter( incident => incident.id !== id ));

        } catch (error) {
            alert("Erro ao deletar o incidente. Tente novamente.");
        }
    }

    async function hundleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda a {ongName}</span>

                <Link className="button" to="/incidents/new"> Cadastrar novo caso</Link>
                <button onClick={hundleLogout} type="button"> 
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>                
                { incidents.map( incident => (
                    <li key={ incident.id }>
                    <strong>CASO:</strong>
                    <p>{ incident.title }</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{ incident.description }</p>

                    <strong>VALOR:</strong>
                    <p>{ 
                        Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value) 
                    }</p>                    
                    <button onClick={ () => { hundleDeleteIncident(incident.id) } } type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}