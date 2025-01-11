import React, { useState } from 'react';
import './login.css'
import { useNavigate } from 'react-router-dom';
import startService from '../start.service';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        startService.login(email, password).subscribe({
            next: (token) => {
                setError('');
                navigate('/home');
            },
            error: (err) => {
              setError('Email ou senha incorretos');
            },
        });
    };

    const handleRegister = async () => {
        navigate('/register');
    };


    return (
        <div className='white-card'>
            <p className='login'>Login</p>
            <div className='input-card'>
                <div className='input-element'>
                    <p>Email</p>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder='Insira seu email'
                        className={error !== '' ? 'error-input' : ''}
                        type="text"
                        />
                </div>
                <div className='input-element'>
                    <p>Senha</p>
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder='Insira sua senha'
                        className={error !== '' ? 'error-input' : ''}
                        type="password"
                        />
                </div>
            </div>
            <div className='input-button'>
                <button className='button-connect' onClick={handleLogin} disabled={email === '' || password === ''}>Conectar</button>
                {error !== '' && <p className='error'>{error}</p>}
                <div className='division-button'>
                    <div className='black-line'/>
                    <p>ou</p>
                    <div className='black-line'/>
                </div>
                <button className='button-creat-count' onClick={handleRegister}>Criar Conta</button>
            </div>
        </div>
    );
};

export default Login;
