import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';


export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatasapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    // Fazer a navegação através de uma função JS
    // quando não podemos utilizar o <Link />
    const history = useHistory();
    
    /**
     * Função de cadastro.
     */
    async function handleRegister(e) {
        e.preventDefault(); // para evitar de recarregar a página        
        
        const data = {
            name, 
            email, 
            whatsapp, 
            city, 
            uf
        };
        
        try {
            const response = await api.post('ongs', data);

            alert(`Seu Id de acesso ${response.data.id}`);   

            // Assim que fizer o login vai para a Home ( '/' no caso )
            history.push('/');

        } catch (error) {
            alert('Erro no cadastro. Tente novamente.');
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>
                        Faça seu cadastro, entre na plataforma e ajude as pessoas 
                        a encontrarem os casos da sua ONG.
                    </p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Já tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatasapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input 
                            placeholder="UF" style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    );
}