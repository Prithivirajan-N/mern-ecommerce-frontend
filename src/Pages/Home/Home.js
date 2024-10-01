import React, { useState, useEffect } from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Home({ data, searchQuery }) {
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        const filtered = data.filter((itemProduct) =>
            itemProduct.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchQuery, data]);

    return (
        <div className="container mt-3">
            <div className="row p-3">
                {filteredData.map((itemProduct) => (
                    <div key={itemProduct.id} className="col-12 col-md-4 mt-3 d-flex justify-content-center">
                        <div className="card h-100">
                            <img src={itemProduct.image} alt={itemProduct.title} className="imagesize p-3" />
                            <div className="card-body d-flex flex-column">
                                <h6 className="card-title">{itemProduct.title}</h6>
                                <p className="card-text">₹{itemProduct.price}</p>
                                <Link to={`/product/${itemProduct.id}`} className="btn btn-primary mt-auto">View Detail</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
