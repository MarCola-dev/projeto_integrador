import React, { useState } from 'react';
import { Link, useHistory} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [nameC, setNameC] = useState('');
    const [type, setType] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')

    const history = useHistory()

    async function handleNewIncident(e)  {
        e.preventDefault()

        const data = {
            title,
            description,
            nameC,
            type,
            city,
            uf,
        };

        try {
            await api.post('cases', data )
            
            history.push('/profile')
        } catch (err) {
            alert('Error ao cadastrar caso, tente novamente!')
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <h1>Cadastrar novo caso</h1>

                    <p>Descreva o caso detalhadamente para encontrar um doador para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Titulo do caso" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <div className="input-group">
                        <input
                            placeholder="Nome"
                            value={nameC}
                            onChange={e => setNameC(e.target.value)} 
                        />
                        
                        <select name="Tipo sanguineo" onChange={e => setType(e.target.value)}>
                            <option value="">Tipo</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)} 
                        />

                        <input
                            className="state"
                            placeholder="UF"
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