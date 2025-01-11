import React, { useState } from 'react';
import './register.css'
import { useNavigate } from 'react-router-dom';
import startService from '../start.service';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        navigate('/login');
    };

    const handleRegister = async () => {
        startService.register(name, email, password).subscribe({
            next: (user) => {
                navigate('/login');
            },
            error: (err) => {
              console.error('Erro durante o registro:', err);
            },
        });
    };


    return (
        <div className='white-card'>
            <p className='register'>Registro</p>
            <div className='input-card'>
                <div className='input-element'>
                    <p>Nome</p>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder='Insira seu nome'
                        className={error !== '' ? 'error-input' : ''}
                        type="text"
                        />
                </div>
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
                <button className='button-connect' onClick={handleRegister} disabled={name === '' || email === '' || password === ''}>Criar</button>
                <div className='division-button'>
                    <div className='black-line'/>
                    <p>Já possui uma conta?</p>
                    <div className='black-line'/>
                </div>
                <button className='button-creat-count' onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default Register;