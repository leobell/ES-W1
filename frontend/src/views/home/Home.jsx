import React from "react";
import { Container, Button } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';

const Home = ({ token }) => {

  const [user, setUser] = useState(null)

  useEffect(() => {
    if(token) {
      try {
        const decoded = jwtDecode(token)
        if (decoded && (decoded.email || decoded.id || decoded._id)) {
          setUser(decoded)
        } else {
          localStorage.removeItem('token')
        }
      } catch (error) {
        console.error(`Token non valido: ${error}`)
        localStorage.removeItem('token')
      }
    } else {
      setUser(null)
    }
  }, [token])

  return (
    <Container fluid="sm">
      {user ? (
        <>
          <h1 className="blog-main-title mb-3">Bentornato {user.displayName || (typeof user.name === 'string' ? user.name : user.name?.givenName) || "Utente"} sullo Strive Blog!</h1>
          <p>Hai effettuato l'accesso con successo.</p>
        </>
        
      ):(
        <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
      )}
      <BlogList />
    </Container>
  )
}

export default Home;
