import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Order() {
    const [orderDetails, setOrderDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrderDetails();
    }, []);

    const loadOrderDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8003/my-orders', {
                headers: {
                    // Include any authentication headers if necessary
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Example for JWT token
                }
            });
            console.log('Order Details:', response.data);
            setOrderDetails(response.data.reverse());
        } catch (err) {
            console.error("Error loading order details:", err);
            toast.error("Error loading order details");
        } finally {
            setLoading(false);
        }
    };

    const deleteOrder = async (id) => {
        try {
            await axios.delete(`http://localhost:8003/orders/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Example for JWT token
                }
            });
            toast.success("Order deleted successfully");
            loadOrderDetails();
        } catch (err) {
            console.error("Error deleting order:", err);
            toast.error("Error deleting order");
        }
    };

    return (
        <div className="container mt-4">
            {loading ? (
                <p>Loading orders...</p>
            ) : (
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Order Date</th>
                            <th>Cancel Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.productName}</td>
                                <td>{item.productQuantity}</td>
                                <td>{item.productPrice}</td>
                                <td>{(item.productQuantity * item.productPrice).toFixed(2)}</td>
                                <td>{new Date(item.orderDate).toLocaleString()}</td>
                                <td>
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={() => deleteOrder(item._id)}>
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            <ToastContainer position="top-center" />
        </div>
    );
}

export default Order;
