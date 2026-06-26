import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Form } from "react-bootstrap";
import {useState} from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = ({ onLoginSuccess }) => {
    const navigate = useNavigate()
    const [loginForm, setLoginForm] = useState({})
    const [decodedToken, setDecodedToken] = useState(null)

    const onChangeInput = (e) => {
        const { name, value } = e.target
        setLoginForm({
            ...loginForm,
            [name]:value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/login`,{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(loginForm)
            })

            const dataResponse = await response.json()

            if(response.ok){
                const decodedToken = jwtDecode(dataResponse.token)
                const isExpired = decodedToken.exp * 1000 < Date.now()

                if (isExpired) {
                    console.log('TOKEN SCADUTO')
                    localStorage.removeItem('token')
                    setDecodedToken(null)
                    return dataResponse
                }

                setDecodedToken(decodedToken)
                localStorage.setItem('token', dataResponse.token)

                onLoginSuccess(dataResponse.token)

                navigate('/')
            } else {
                console.error("Errore di autenticazione:", dataResponse.message)
                return dataResponse
            }
            
            return dataResponse
        } catch (error) {
            console.error("Errore di rete:", error)
            return null
        }
        
    }

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Accedi su Strive Blog!</h1>
      <Container>
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Inserire Email"
                    name="email"
                    onChange={onChangeInput}
                />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Inserire Password"
                    name="password"
                    onChange={onChangeInput}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Accedi
            </Button>
        </Form>
      </Container>
    </Container>
  )
}

export default Login