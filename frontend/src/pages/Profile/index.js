import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2} from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/mascote.png'

export default function Profile() {
    const [cases, setCases] = useState([])
    
    const history = useHistory()    
    const Id = localStorage.getItem('Id')
    const Name = localStorage.getItem('Name')

    

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: Id,
            }
        }).then(response => {
            setCases(response.data);
        })
    }, [Id]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`cases/${id}`, {
                headers: {
                    Authorization: Id,
                }
            })

            setCases(cases.filter(incident => incident.id !== id))
        } catch (err) {
            alert('Erro ao teletar caso, tente novamente!')
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {Name}</span>

                <Link className="button" to="/cases/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                    {cases.map(cases => (
                        <li key={cases.id}>
                            <strong>CASO:</strong>
                            <p>{cases.title}</p>
                            
                            <strong>DESCRIÇÃO</strong>
                            <p>{cases.description}</p>

                            <strong>ESTADO:</strong>
                            <p>{cases.uf}</p>

                            <strong>CIDADE:</strong>
                            <p>{cases.city}</p>
        
                            <strong>TIPO SANGUINEO:</strong>
                            <p>{cases.type}</p>
        
                            <button onClick={() => handleDeleteIncident(cases.id)} type="button">
                                <FiTrash2 size={20} color="#a8a8d3" />
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}