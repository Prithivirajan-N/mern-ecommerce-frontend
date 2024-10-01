import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function Product({ data, addToCart }) {
    const { id } = useParams();
    const productDescription = data.find((item) => item.id === id);

    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(false);

    const [cart, setCart] = useState({
        productName: '',
        productPrice: productDescription?.price || 0,
        productQuantity: count,
    });

    useEffect(() => {
        if (productDescription) {
            setCart({
                productName: productDescription.title,
                productPrice: productDescription.price,
                productQuantity: count,
            });
        }
    }, [count, productDescription]);

    const submitUserOrder = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log(cart); // Check if the cart data is correct
            await addToCart(cart); // Call the addToCart function from props
            toast.success("Product added to cart successfully");
        } catch (error) {
            console.error("Error adding product to cart:", error);
            toast.error("Failed to add product to cart");
        } finally {
            setLoading(false);
        }
    };

    const incrementCount = () => {
        setCount(prevCount => prevCount + 1);
    };

    const decrementCount = () => {
        setCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
    };

    if (!productDescription) {
        return <h4 className="text-center">Product not found</h4>;
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-12 col-sm-6">
                    <img src={productDescription.image} alt={productDescription.title} className="img-fluid rounded ms-5" />
                </div>
                <div className="col-12 col-sm-6 p-5">
                    <h3>{productDescription.title}</h3>
                    <p>{productDescription.description}</p>
                    <h5>RS {productDescription.price}</h5>
                    <div className="d-flex align-items-center mb-3">
                        <button className="btn btn-secondary me-2" onClick={decrementCount}>-</button>
                        <p className="p-3 d-flex align-items-center mt-2">{count}</p>
                        <button className="btn btn-secondary" onClick={incrementCount}>+</button>
                        <button
                            className="btn btn-warning ms-1"
                            type="button"
                            onClick={submitUserOrder}
                            disabled={loading}
                        >
                            {loading ? 'Adding...' : 'Add to Cart'}
                        </button>
                    </div>
                    <Link to={"/"} className="btn btn-danger">Back</Link>
                </div>
            </div>
            <ToastContainer position="top-center"/>
        </div>
    );
}

export default Product;
