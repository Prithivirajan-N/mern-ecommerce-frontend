import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css';

function Header({ cartCount, setSearchQuery }) {
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Retrieve username from local storage
    const userName = localStorage.getItem('userName');

    return (
        <Navbar expand="lg" className="bg-primary">
            <Container fluid>
                <Navbar.Brand href="#">SHOPPING CART</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/contact" className="nav-link">Contact Us</Link>
                        <Link to="/order" className="nav-link">Ordered Items</Link>
                    </Nav>
                    <Form className="d-flex">
                    <div className="d-flex flex-column align-items-center text-white ms-5 ps-3 mt-2">
  <i className="fa-solid fa-user"></i>
  <span>{userName ? userName : "Guest"}</span>
</div>

                        <Link to="/cart" className="mt-2 p-2 cartcolor">
                            <i className="fa-solid fa-cart-shopping">
                                {/* Display cart count here */}
                                <sup className="cart-count ms-1">{cartCount}</sup>
                            </i>
                        </Link>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={handleSearch}
                        />
                        <Button className="buttoncolor">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
