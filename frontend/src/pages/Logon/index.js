import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import api from '../../services/api'
import login from '../../services/auth'

import './styles.css'

import logoImg from '../../assets/mascote.png'
import doeImg from '../../assets/doeSangue.svg'


export default function Logon() {
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('') 
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();
        if (!email || !password) {
            return alert("Preencha o LOGIN e SENHA para continuar!")
        } else {
            try {
                const response = await api.post("/sessions", { email, password });
                login(response.data.token)

                localStorage.setItem('Name', response.data.name)
                localStorage.setItem('Id', response.data.id)
                history.push('/profile')
            } catch (err) {
                alert('Falha no login, tente novamente!');
            }
        }
    }

    return (
        <div className="logo-container">
            <section className="form">
                <img src={logoImg} alt="Mais Sangue"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Seu email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input 
                        placeholder="Sua senha"
                        type="password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img className="doeImg" src={doeImg} alt="Heroes"/>
        </div>
    );
}