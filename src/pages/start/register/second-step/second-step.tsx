import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './second-step.css'

interface SecondStepProps {
    saveSecondStep: (data) => void;
    changeStep: (change: number) => void;
}

const SecondStep: React.FC<SecondStepProps> = ({ saveSecondStep, changeStep }) => {
    const [cep, setCep] = useState('');
    const [city, setCity] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [adress, setAdress] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [uf, setUf] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (cep !== '' &&  city !== '' && neighborhood !== '' && adress !== '' && number !== '' && complement !== '' && uf !== '') {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [cep, city, neighborhood, adress, number, complement, uf]);

    const handleLogin = async () => {
        navigate('/login');
    };

    const sendRegister = () => {
        const dados = {
                cep,
                city,
                neighborhood,
                adress,
                number,
                complement,
                uf
            }
        saveSecondStep(dados);
    };

    const searchCep = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length === 8) {
            const response = await axios.get(`https://viacep.com.br/ws/${e.target.value}/json/`);
            if (response.data.erro) {
                return setError("CEP não encontrado.");
            }
            setCity(response.data.localidade);
            setNeighborhood(response.data.bairro);
            setAdress(response.data.logradouro);
            setComplement(response.data.complemento);
            setUf(response.data.uf);
        }
    };

    const goBack = () => {
        changeStep(-1);
    };


    return (
        <div>
            <p className='register'>Registro</p>
            <div className='input-card'>
                <div className='input-three-elements'>
                    <div className='input-element'>
                        <p>CEP</p>
                        <input
                            value={cep}
                            onChange={(e) => {
                                setCep(e.target.value);
                                searchCep(e);
                            }}
                            placeholder='Insira seu CEP'
                            className={error !== '' ? 'error-input' : ''}
                            type="text"
                            />
                    </div>
                    <div className='space'/>
                    <div className='input-element'>
                        <p>UF</p>
                        <input
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                            placeholder='Insira a UF'
                            className={error !== '' ? 'error-input' : ''}
                            type="text"
                            />
                    </div>
                </div>
                <div className='input-three-elements'>
                    <div className='input-element'>
                        <p>Cidade</p>
                        <input
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            placeholder='Insira sua Rua'
                            className={error !== '' ? 'error-input' : ''}
                            type="text"
                            />
                    </div>
                    <div className='space'/>
                    <div className='input-element'>
                        <p>Bairro</p>
                        <input
                            value={neighborhood}
                            onChange={e => setNeighborhood(e.target.value)}
                            placeholder='Insira sua Rua'
                            className={error !== '' ? 'error-input' : ''}
                            type="text"
                            />
                    </div>
                </div>
                <div className='input-three-elements'>
                    <div className='input-element'>
                        <p>Rua</p>
                        <input
                            value={adress}
                            onChange={e => setAdress(e.target.value)}
                            placeholder='Insira sua Rua'
                            className={error !== '' ? 'error-input' : ''}
                            type="text"
                            />
                    </div>
                    <div className='space'/>
                    <div className='input-element'>
                        <p>Número</p>
                        <input
                            value={number}
                            onChange={e => setNumber(e.target.value)}
                            placeholder='Insira seu Número'
                            className={error !== '' ? 'error-input' : ''}
                            type="number"
                            />
                    </div>
                </div>
                <div className='input-element'>
                    <p>Complemento</p>
                    <input
                        value={complement}
                        onChange={e => setComplement(e.target.value)}
                        placeholder='Insira o complemento'
                        className={error !== '' ? 'error-input' : ''}
                        type="text"
                        />
                </div>
            </div>
            <div className='input-button'>
                <div>
                    <button className='button-connect' onClick={goBack}>Voltar</button>
                    <button className='button-connect' onClick={sendRegister} disabled={disabled}>Registrar</button>
                </div>
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

export default SecondStep;