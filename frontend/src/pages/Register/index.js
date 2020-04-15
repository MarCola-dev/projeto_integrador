import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi' 

import api from '../../services/api';
import './styles.css'

import logoImg from '../../assets/logo.png'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [type, setType] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')

    const history = useHistory();


    async function handlerRegister(e) {
        e.preventDefault();

        if (password !== confirmPassword ) {
            return alert("Senhas não conferem")
        }

        if (!name || !email || !password || !confirmPassword || !whatsapp || !type || !city || !uf ) {
            return alert(`Preencha todos os campos ${type}`)            
        } 


        const data = {
            name,
            email,
            password,
            whatsapp,
            type,
            city,
            uf,
        };

        try {
            const response = await api.post('ongs', data)

            history.push('/')
        } catch (err) {
            alert('Erro no cadsatro, tente novamente.');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>

                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handlerRegister}>
                    
                    <input 
                        placeholder="Digite seu nome"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)} 
                    />

                    <input 
                        type="password" 
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)} 
                    />

                    <input 
                        type="password" 
                        placeholder="Confirme a Senha"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)} 
                    />
                    <div className="input-group">
                        <input
                            placeholder="WhatsApp"
                            value={whatsapp}
                            onChange={e => setWhatsapp(e.target.value)} 
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
                            placeholder="UF" 
                            style={{ width: 80 }}
                            maxLength="2"
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