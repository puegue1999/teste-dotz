import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FirstStepProps {
    saveFirstStep: (data) => void;
    changeStep: (change: number) => void;
}

const FistStep: React.FC<FirstStepProps> = ({ saveFirstStep, changeStep }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cell, setCell] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (name !== '' &&  email !== '' && email.includes("@") && password !== '' && cell !== '') {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [name, email, password, cell]);

    const handleLogin = async () => {
        navigate('/login');
    };

    const sendRegister = () => {
        const dados = {
                name,
                email,
                password,
                cell
            }
        saveFirstStep(dados);
        changeStep(1);
    };


    return (
        <div>
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
                <div className='input-element'>
                    <p>Celular</p>
                    <input
                        value={cell}
                        onChange={e => setCell(e.target.value)}
                        placeholder='Insira o número do seu celular'
                        className={error !== '' ? 'error-input' : ''}
                        />
                </div>
            </div>
            <div className='input-button'>
                <button className='button-connect' onClick={sendRegister} disabled={disabled}>Próximo</button>
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

export default FistStep;