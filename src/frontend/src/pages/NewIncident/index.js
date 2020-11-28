import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';


export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title, description, value
        }

        try {
            await api.post('incidents', data, {
                headers: { Authorization: ongId }
            });

            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadastrar novo incidente.');
        }
    }

    // function formatarMoeda(e) {
    //     var elemento = e.target;
    //     var valor = elemento.value;

    //     valor = valor + '';
    //     valor = parseInt(valor.replace(/[\D]+/g, ''));
    //     valor = valor + '';
    //     valor = valor.replace(/([0-9]{2})$/g, ",$1");

    //     if (valor.length > 6) {
    //         valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    //     }

    //     elemento.value = valor;
    //     if(valor == 'NaN') elemento.value = '';
    // }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Quero Ajudar" />

                    <h1>Cadastrar novo caso</h1>
                    <p> Descreva o caso detalhadamente para encontrar um ajudante para resolver isso. </p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#2FB86E" />
                    Voltar para Home
                </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do caso" 
                        value={title}
                        onChange={ e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição do caso" 
                        value={description}
                        onChange={ e => setDescription(e.target.value)}
                    />
                    <input 
                        id="valor"
                        //maxlength="9"
                        placeholder="Valor em R$" 
                        value={value}
                        onChange={ e => setValue(e.target.value)}
                        //onKeyUp={e => formatarMoeda(e)}
                    />
                    

                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    );
}