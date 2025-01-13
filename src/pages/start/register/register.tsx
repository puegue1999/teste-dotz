import React, { useState } from 'react';
import './register.css'
import { useNavigate } from 'react-router-dom';
import startService from '../start.service';
import FistStep from './first-step/first-step';
import SecondStep from './second-step/second-step';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cep, setCep] = useState('');
    const [city, setCity] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [adress, setAdress] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [uf, setUf] = useState('');
    const [cell, setCell] = useState('');
    const [step, setStep] = useState(0);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        startService.register(name, email, password, Number(cep), city, neighborhood, adress, Number(number), complement, uf, Number(cell)).subscribe({
            next: (user) => {
                navigate('/login');
            },
            error: (err) => {
              console.error('Erro durante o registro:', err);
            },
        });
    };

    const changeStep = (change: number) => {
        setStep(step+change);
    };

    const saveFirstStep = (data) => {
        setName(data.name);
        setEmail(data.email);
        setPassword(data.password);
        setCell(data.cell);
    };

    const saveSecondStep = (data) => {
        setCep(data.cep);
        setCity(data.city);
        setAdress(data.adress);
        setNumber(data.number);
        setNeighborhood(data.neighborhood);
        setComplement(data.complement);
        setUf(data.uf);

        handleRegister();
    };


    return (
        <div className='white-card'>
            {step === 0 && <FistStep saveFirstStep={saveFirstStep} changeStep={changeStep}/>}
            {step === 1 && <SecondStep saveSecondStep={saveSecondStep} changeStep={changeStep}/>}
        </div>
    );
};

export default Register;