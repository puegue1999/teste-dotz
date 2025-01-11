import React from 'react';
import Login from './login/login';
import Register from './register/register';
import './start.css';
import { useLocation } from 'react-router-dom';

const Start = () => {
    const location = useLocation();
    
    return (
        <div className='split-screen'>
            <div className='half-screen'>
                <p className='title'>Bem-vindo à Dotz!</p>
                <p className='sub-title'>Transforme os gastos do seu dia a dia em ganhos!</p>
            </div>
            <div className='half-screen'>
                {location.pathname === '/register' && <Register />}
                {location.pathname === '/login' && <Login />}
                {location.pathname !== '/register' && location.pathname !== '/login' && <Login />}
            </div>
        </div>
    );
};

export default Start;
