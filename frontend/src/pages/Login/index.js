import React, {useState} from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';

import api from '../../services/api';

import './style.css';

import logo from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Login(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', {id});

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        }catch(err){
            alert('Falha no login, verifique o seu ID');
        }
    }

    return(
        <div className="loginContainer">
            <section className="form">
                <img src={logo} alt="lgoo"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Login</h1>
                    <input 
                        value = {id}
                        onChange={e => setId(e.target.value)}
                        type="text" 
                        placeholder="Sua Id"
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register"> 
                        <FaSignInAlt size={16} color="#E02041" /> 
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="heros"/>
        </div>
    );
}