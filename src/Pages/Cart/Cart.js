import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';
import StripeCheckout from 'react-stripe-checkout';
import 'react-toastify/dist/ReactToastify.css';

function Cart({ cartDetail, updateCartDetail }) {
    // Load cart details from the backend
    const loadCartDetails = async () => {
        try {
            const token = localStorage.getItem('token'); // Assuming you store the token
            const result = await axios.get('http://localhost:8003/my-products', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            updateCartDetail(result.data.reverse()); // Update cart in App.js state
        } catch (err) {
            console.error(err);
            toast.error("Error loading cart details");
        }
    };

    // Load cart details on component mount
    useEffect(() => {
        loadCartDetails();
    }, []);

    // Handle payment with Stripe and place the order
    const makePayment = async (token, item) => {
        const body = {
            token,
            product: {
                name: item.productName,
                price: item.productQuantity*item.productPrice * 100, // Convert to smallest currency unit (e.g., cents)
            },
        };

        try {
            const authToken = localStorage.getItem('token'); // Retrieve the token from local storage

            const paymentResponse = await axios.post('http://localhost:8003/payment', body, {
                headers: {
                    Authorization: `Bearer ${authToken}`, // Include the token in the request headers
                },
            });
            console.log("Payment Success", paymentResponse);
            toast.success("Payment successful, placing your order...");

            // Place the order after successful payment
            await submitOrderPlaced(item);
        } catch (error) {
            console.error("Payment Error:", error.response ? error.response.data : error);
            toast.error(error.response?.data?.message || "Error during payment");
        }
    };

    // Place an order for the selected item
    const submitOrderPlaced = async (item) => {
        try {
            const orderWithDate = {
                ...item,
                orderDate: new Date(),
            };
            const token = localStorage.getItem('token'); // Assuming you store the token
            await axios.post("http://localhost:8003/orders", orderWithDate, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Order placed successfully");
            loadCartDetails(); // Refresh the cart details
        } catch (err) {
            console.error(err);
            toast.error("Error placing order");
        }
    };

    // Delete an item from the cart
    const deleteCart = async (id) => {
        try {
            const token = localStorage.getItem('token'); // Assuming you store the token
            await axios.delete(`http://localhost:8003/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Item deleted successfully");
            loadCartDetails(); // Refresh the cart details
        } catch (err) {
            console.error(err);
            toast.error("Error deleting cart item");
        }
    };

    return (
        <div className="container mt-4">
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Total Price</th>
                        <th>Place Order</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {cartDetail.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.productName}</td>
                            <td>{item.productQuantity}</td>
                            <td>{item.productPrice}</td>
                            <td>{item.productQuantity * item.productPrice}</td>
                            <td>
                                <StripeCheckout
                                    stripeKey="pk_test_51Q3VbGF7TszP8Ns5RcabOnA0YughTrl4udQRPLUAC7xSiakxVT7p7bRFSD8f8kKLkw6zCwHFd6oSqUIJWc6t31cP00lY35iJJc"
                                    token={(token) => makePayment(token, item)}
                                    name={item.productName}
                                    amount={item.productQuantity * item.productPrice * 100} // Price in smallest currency unit (cents)
                                    currency="INR"
                                >
                                    <button className="btn btn-success">Order Now</button>
                                </StripeCheckout>
                            </td>
                            <td>
                                <button 
                                    className="btn btn-danger" 
                                    onClick={() => deleteCart(item._id)}>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ToastContainer position="top-center" />
        </div>
    );
}

export default Cart;
