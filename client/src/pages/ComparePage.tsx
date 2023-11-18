import  { useContext, useEffect, useState } from 'react';
import productsAPI from '../api/productsAPI';
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useParams } from 'react-router-dom';
import Product from '../types/Product';
import cartsAPI from '../api/cartsAPI';
import * as cartLocalStorageUtils from '../utils/cartLocalStorageUtils';
import CartItem from '../types/CartItem';
import { toastError, toastSuccess } from '../utils/toastUtils';
import { UserContext } from '../UserContext';

const ComparePage = () => {
    const { pid1, pid2 } = useParams();
    const [products, setProducts] = useState<Product[] | null>(null);
    const context = useContext(UserContext)!;
    const { userInfo, setProductsInCart} = context
    const handleAddClick = async (product: Product) => {
        if (product.quantity < 1) {
            toastError('No items in stock');
        };
        if (userInfo) {
            try {
                const cart = await cartsAPI.addToCart(product._id, '1');
                setProductsInCart(cart.items.length);
                toastSuccess('Added to cart!');
            } catch (error) {
                console.error('Failed to fetch', error);
                toastError('Failed to add to cart');
            }
        } else {
            const productToAdd: CartItem = { product_id: product, quantity: 1 };
            cartLocalStorageUtils.addToCart(productToAdd);
            setProductsInCart(cartLocalStorageUtils.getCart().length);
            toastSuccess('Added to cart!');
        };
    };
    const fetchProductsData = async (pid1: string, pid2: string) => {
        try {
            const product1 = await productsAPI.getProduct(pid1);
            const product2 = await productsAPI.getProduct(pid2);
            setProducts([product1, product2]);
        } catch (error) {
            console.error('Failed to fetch');
        };
    };
    useEffect(() => {
        fetchProductsData(pid1!, pid2!);
    }, []);
    if (!products) {
        return (
            <>
                <div>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                </div>
            </>
        );
    };
    return (
        <>
            <Paper style={{ margin: 50 }} elevation={12}>
                <Table>
                    <TableHead >
                        <TableRow >
                            <TableCell align='center'>
                                Name
                            </TableCell>
                            {products.map((product, index) => <TableCell key={index} align='center'>{product!.name}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell></TableCell>
                            {products.map((product, index) => <TableCell key={index} align='center'><img src={product.imageUrl} alt={`${product.name} picture`} /></TableCell>)}
                        </TableRow>
                        <TableRow>
                            <TableCell align='center'>Description</TableCell>
                            {products.map((product, index) => <TableCell key={index} align='center'>{product!.description}</TableCell>)}
                        </TableRow>
                        <TableRow>
                            <TableCell align='center'>Popularity</TableCell>
                            {products.map((product, index) => <TableCell key={index} align='center'>{product!.clickCount}</TableCell>)}
                        </TableRow>
                        <TableRow>
                            <TableCell align='center'>Price</TableCell>
                            {products.map((product, index) => <TableCell key={index} align='center'>{product!.price}</TableCell>)}
                        </TableRow>
                        <TableRow>
                            <TableCell></TableCell>
                            {products.map((product, index) => <TableCell key={index} align='center'><Button variant='contained' onClick={() => handleAddClick(product)}>Add to cart</Button></TableCell>)}
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        </>
    )
};
export default ComparePage;