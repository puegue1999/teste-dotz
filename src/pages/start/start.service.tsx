import { API_Routes } from '../../environments/environments';
import axios from 'axios';
import { Observable } from 'rxjs';

export const login = (email: string, password: string): Observable<any> => {
    return new Observable((subscriber) => {
        axios
            .post(`${API_Routes.API_URL}/login`, { email, password })
            .then((response) => {
                const token = response.data.token;
                localStorage.setItem('authToken', token);
                subscriber.next({ token });
                subscriber.complete();
            })
            .catch((error) => {
                subscriber.error(error);
            });
    });
};

export const register = (name: string, email: string, password: string, CEP: number, city: string, neighborhood: string, adress: string, number: number, complement: string, uf: string, cell: number): Observable<any> => {
    return new Observable((subscriber) => {
        axios
            .post(`${API_Routes.API_URL}/register`,
                { 
                    name,
                    email,
                    password,
                    CEP,
                    city,
                    neighborhood,
                    adress,
                    number,
                    complement,
                    uf,
                    cell
                })
            .then((response) => {
                subscriber.next(response.data);
                subscriber.complete();
            })
            .catch((error) => {
                subscriber.error(error);
            });
    });
};

const service = { login, register };
export default service;