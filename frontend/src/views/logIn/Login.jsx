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

    const handlerRedirectToGoogle = () => {
        window.location.href = `${import.meta.env.VITE_SERVER_BASE_URL}/auth/google`
    }

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Accedi su Strive Blog!</h1>
      <Container>
        <Button variant="light" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px' }} onClick={handlerRedirectToGoogle}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" fill="#000000">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span style={{ fontWeight: '500' }}>Accedi con Google</span>
        </Button>
        <Form onSubmit={onSubmit} className="mt-4">
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