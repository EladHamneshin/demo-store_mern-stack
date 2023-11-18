import { useState, useEffect } from 'react';
import productsAPI from '../api/productsAPI';
import Product from '../types/Product';
import ProductCard from './ProductCard';

function Top5ProductsPage() {
    const [top5Products, setTop5Products] = useState<Product[]>([]);

    useEffect(() => {
        const fetchTop5Products = async () => {
            try {
                const top5Products = await productsAPI.getTop5Products();
                setTop5Products(top5Products);
            } catch (error) {
                console.error('Error fetching top 5 products:', error);
            }
        };

        fetchTop5Products();
    }, []);

    return (
        <div>
            <h1>Top 5 Products</h1>
            <ul
                style={{
                    listStyleType: 'none',
                    padding: 0,
                    display: 'flex',
                    gap: '16px',
                    flexWrap: 'wrap',
                }}
            >
                {top5Products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </ul>
        </div>
    );
}

export default Top5ProductsPage;
