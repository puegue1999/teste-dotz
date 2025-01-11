import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import homeService from './home.service'
import { Category, Subcategory, Product } from './home.interface.tsx';
import './home.css';

const Home = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('0');
    const [selectedSubcategory, setSelectedSubcategory] = useState('0');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken') || '';

    useEffect(() => {
        if (token) {
            homeService.allCategories(token).subscribe({
                next: (data) => {
                    setCategories(data.allCategories);
                },
                error: (err) => {
                    setError(err)
                },
            });

            homeService.filterProducts(token).subscribe({
                next: (data) => {
                    setProducts(data.filterProducts);
                },
                error: (err) => {
                    setError(err)
                },
            });
        } else {
          setError('Token não encontrado. Faça login.');
        }
    }, [token]);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
        homeService.filterSubcategories(token, event.target.value).subscribe({
            next: (data) => {
                setSubcategories(data.filterSubcategories);
            },
            error: (err) => {
                setError(err)
            },
        });
        homeService.filterProducts(token, search, Number(event.target.value)).subscribe({
            next: (data) => {
                setProducts(data.filterProducts);
            },
            error: (err) => {
                setError(err)
            },
        });
    };

    const handleSubcategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubcategory(event.target.value);
        homeService.filterProducts(token, search, Number(selectedCategory), Number(event.target.value)).subscribe({
            next: (data) => {
                setProducts(data.filterProducts);
            },
            error: (err) => {
                setError(err)
            },
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length >= 3) {
            homeService.filterProducts(token, e.target.value, Number(selectedCategory), Number(selectedSubcategory)).subscribe({
                next: (data) => {
                    setProducts(data.filterProducts);
                },
                error: (err) => {
                    setError(err)
                },
            });
        } else {
            homeService.filterProducts(token, '', Number(selectedCategory), Number(selectedSubcategory)).subscribe({
                next: (data) => {
                    setProducts(data.filterProducts);
                },
                error: (err) => {
                    setError(err)
                },
            });
        }
    };


    return (
        <div className='card-home'>
            <div className='card-select'>
                <div>
                    <p>Filtro</p>
                </div>
                <div>
                    <p>Buscar</p>
                    <input
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            handleInputChange(e);
                        }}
                        type="text"
                    />
                </div>
                <div>
                    <p>Categoria</p>
                    <select
                        id="category-select"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value="0">Selecione...</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <p>Subcaetgoria</p>
                    <select
                        id="subcategory-select"
                        value={selectedSubcategory}
                        onChange={handleSubcategoryChange}
                        disabled={ selectedCategory === '0' }
                    >
                        <option value="0">Selecione...</option>
                        {subcategories.map((subcategory) => (
                        <option key={subcategory.id} value={subcategory.id}>
                            {subcategory.name}
                        </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='card-list'>
                <ul>
                    {products.map((product, index) => (
                        <li key={product.id}>
                            {product.name}
                            <button>Click</button>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default Home;
