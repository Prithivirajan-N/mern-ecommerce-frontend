import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Contact from './Pages/Contact/Contact';
import Header from './Component/Header/Header';
import Cart from './Pages/Cart/Cart';
import Product from './Pages/Product/Product';
import Order from './Pages/Order/Order';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [cartDetail, setCartDetail] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [cartCount, setCartCount] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const data = [
        { id: "1", title: "OPPO F21S Pro 5G", price: 15000, image: "/images/products/1.jpg", description: "Discover the power of 5G with the OPPO F21S Pro 5G. This phone features a 6.4-inch AMOLED display, Snapdragon 695 processor, and a versatile triple-camera setup for capturing stunning photos and videos." },
        { id: "2", title: "WRISRIO HD Bluetooth Calling Smart Watch", price: 1599, image: "/images/products/2.jpg", description: "Experience cutting-edge technology on your wrist with the WRISRIO HD Bluetooth Calling Smart Watch. Features include a high-definition display, heart rate monitoring, sleep tracking, and Bluetooth calling capabilities." },
        { id: "3", title: "Dell Inspiron 3511", price: 50000, image: "/images/products/3.jpg", description: "Elevate your productivity with the Dell Inspiron 3511. This laptop comes equipped with an Intel Core i5 processor, 8GB of RAM, and a 512GB SSD, making it perfect for both work and play." },
        { id: "4", title: "PTron Newly Launched Tangent Sports, 60Hrs Playtime", price: 1500, image: "/images/products/4.jpg", description: "The PTron Tangent Sports earbuds offer an impressive 60 hours of playtime. With a sleek design and high-quality sound, these earbuds are perfect for long listening sessions." },
        { id: "5", title: "Campus Men's Maxico Running Shoes", price: 2000, image: "/images/products/5.jpg", description: "The Maxico Running Shoes from Campus are built with a responsive EVA sole and a breathable mesh upper, providing comfort and support for all your running needs." },
        { id: "6", title: "Asus Vivobook 12Gen Laptop", price: 80000, image: "/images/products/6.jpg", description: "Powered by the latest 12th Gen Intel processor, the Asus Vivobook offers top-notch performance for professionals and gamers alike. With 16GB of RAM and a 1TB SSD, it handles multitasking with ease." },
        { id: "7", title: "Lenovo IdeaPad Slim3 Laptop", price: 70000, image: "/images/products/7.jpg", description: "The Lenovo IdeaPad Slim3 combines sleek design with powerful performance. Featuring an Intel Core i5 processor, 8GB of RAM, and a 512GB SSD, it's ideal for both work and entertainment." }
    ];

    useEffect(() => {
        loadCartDetailsFromBackend();
    }, [isAuthenticated]); // Load cart details when user authenticates

    useEffect(() => {
        setCartCount(cartDetail.length); // Update cart count whenever cartDetail changes
    }, [cartDetail]);

    const addToCart = async (cartData) => {
        const token = localStorage.getItem('token');

        if (!token) {
            return; 
        }

        try {
            const response = await axios.post('http://localhost:8003/products', cartData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                setCartDetail(prevCartDetail => [...prevCartDetail, cartData]); // Update cart detail
            }
        } catch (error) {
            console.error('Failed to add to cart', error);
        }
    };

    const loadCartDetailsFromBackend = async () => {
        try {
            const token = localStorage.getItem('token');
            const result = await axios.get('http://localhost:8003/products', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCartDetail(result.data.reverse()); // Update cart details from backend
        } catch (err) {
            console.error("Error loading cart details", err);
        }
    };

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    return (
        <BrowserRouter>
            {/* Conditional rendering of Header based on the route */}
            { !['/login', '/register'].includes(window.location.pathname) && <Header setSearchQuery={setSearchQuery} cartCount={cartCount} /> }
            <Routes>
                <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={isAuthenticated ? <Home data={data} searchQuery={searchQuery} /> : <Navigate to="/login" />} />
                <Route path="contact" element={isAuthenticated ? <Contact /> : <Navigate to="/login" />} />
                <Route path="cart" element={isAuthenticated ? <Cart cartDetail={cartDetail} updateCartDetail={setCartDetail} /> : <Navigate to="/login" />} />
                <Route path="/product/:id" element={isAuthenticated ? <Product data={data} addToCart={addToCart} /> : <Navigate to="/login" />} />
                <Route path="order" element={isAuthenticated ? <Order /> : <Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
 