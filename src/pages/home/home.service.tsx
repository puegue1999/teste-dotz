import { API_Routes } from '../../environments/environments';
import axios from 'axios';
import { Observable } from 'rxjs';

export const allCategories = (token: string): Observable<any> => {
    return new Observable((subscriber) => {
        axios
            .get(`${API_Routes.API_URL}/allCategories`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const allCategories = response.data;
                subscriber.next({ allCategories });
                subscriber.complete();
            })
            .catch((error) => {
                subscriber.error(error);
            });
    });
};

export const filterSubcategories = (token: string, idCategory): Observable<any> => {
    return new Observable((subscriber) => {
        axios
            .get(`${API_Routes.API_URL}/filterSubcategories`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    idCategory,
                },
            })
            .then((response) => {
                const filterSubcategories = response.data;
                subscriber.next({ filterSubcategories });
                subscriber.complete();
            })
            .catch((error) => {
                subscriber.error(error);
            });
    });
};

export const filterProducts = (token: string, search: string = '', category: number = 0, subcategory: number = 0): Observable<any> => {
    return new Observable((subscriber) => {
        axios
            .get(`${API_Routes.API_URL}/filterProducts`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    search,
                    category,
                    subcategory
                },
            })
            .then((response) => {
                const filterProducts = response.data;
                subscriber.next({ filterProducts });
                subscriber.complete();
            })
            .catch((error) => {
                subscriber.error(error);
            });
    });
};

const service = { allCategories, filterSubcategories, filterProducts };
export default service;