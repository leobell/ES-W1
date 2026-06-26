import React from "react";
import { Container, Button } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';

const Home = props => {

  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if(token) {
      try {
        const decoded = jwtDecode(token)
        if (decoded && decoded.name) {
            setUser(decoded);
        } else {
            localStorage.removeItem('token');
        }
      } catch (error) {
        console.error(`Token non valido: ${error}`)
        localStorage.removeItem('token')
      }
    }
  }, [])

  return (
    <Container fluid="sm">
      {user ? (
        <>
          <h1 className="blog-main-title mb-3">Bentornato {user.name} sullo Strive Blog!</h1>
          <p>Hai effettuato l'accesso con successo.</p>
        </>
        
      ):(
        <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
      )}
      <BlogList />
    </Container>
  );
};

export default Home;
