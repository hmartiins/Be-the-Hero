import React, {useState, useEffect} from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FaPowerOff, FaRegTrashAlt} from 'react-icons/fa';

import api from '../../services/api';
import './style.css';

import logoImg from '../../assets/logo.svg';

export default function Profile(){
    const history = useHistory();

    const [incidents, setIncidents] = useState([]);
    
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id))    
        } catch (err) {
            alert('Erro ao tentar deletar caso, tente novamente');
        }
    }

    function handleLougout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profileContainer">
            <header>
                <img src={logoImg} alt="hero"/>
                <span>Bem vindo, {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLougout} type="button"><FaPowerOff size={25} color="#E02041" /></button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident =>(
                    <li key={incident.id}>
                        <strong>CASO: </strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÂO: </strong>
                        <p>{incident.description}</p>

                        <strong>VALOR: </strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                    
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FaRegTrashAlt size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}    
            </ul>            
        </div>
    );
}