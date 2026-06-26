import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";
import { useEffect, useState } from "react";
const NavBar = ({ token, setToken }) => {

  const [hasToken, setHasToken] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setHasToken(!!token)
  },[token])

  const handleLogout = () => {
    setToken(null)
    navigate('/login')
  }

  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>
        <div className="d-flex gap-3">
          {hasToken ? (
            <div className="d-flex gap-3">
              <Button as={Link} to="/new" className="blog-navbar-add-button bg-dark" size="lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-plus-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
                </svg>
                Nuovo Articolo
              </Button>

              <Button variant="danger" size="lg" onClick={handleLogout}>
                Logout
              </Button>
            </div>
            
          ):(
            <div className="d-flex gap-3">
              <Button as={Link} to="/login" className="blog-navbar-add-button bg-dark" size="lg">
                <svg 
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24" 
                fill="none" stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                class="lucide lucide-user-icon lucide-user">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Login
              </Button>

              <Button as={Link} to="/signIn" className="blog-navbar-add-button bg-dark" size="lg">
                <svg 
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24" 
                fill="none" stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                class="lucide lucide-user-icon lucide-user">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Sign In
              </Button>
            </div>
            
          )}

        </div>       
      </Container>
    </Navbar>
  );
};

export default NavBar;
