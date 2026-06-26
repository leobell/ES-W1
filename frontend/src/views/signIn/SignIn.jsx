import { Link, useNavigate } from "react-router-dom";
import { Container, Button, InputGroup, Form } from "react-bootstrap";
import { useState } from "react";


const SignIn = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const [dataForm, setDataForm] = useState({
        name:'',
        surname:'',
        email:'',
        password:'',
        birthDate:''
    })

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const onChangeInput = (e) => {
        const { name, value } = e.target
        setDataForm({
            ...dataForm,
            [name]:value
        })
        console.log(dataForm)
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/authors`,{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(dataForm)
            })
            if (response.ok) {
                console.log('Registrazione avvenuta con successo!')
                navigate('/login');
            }
        } catch (error) {
            console.error(`Errore nell'invio del form: ${error}`)
        }
    }

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Registrati gratuitamente su Strive Blog!</h1>
      <Container>
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nome</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Scrivi il tuo nome"
                    name="name"
                    onChange={onChangeInput}
                    value={dataForm.name}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Cognome</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Scrivi il tuo Cognome"
                    name="surname"
                    onChange={onChangeInput}
                    value={dataForm.surname}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Inserisci la tua email"
                    name="email"
                    onChange={onChangeInput}
                    value={dataForm.email}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                    <Form.Control 
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password" 
                        name="password"
                        onChange={onChangeInput}
                        value={dataForm.password}
                        required
                    />
                    <Button 
                        variant="outline-secondary" 
                        onClick={togglePasswordVisibility}
                        style={{ borderLeft: 'none' }}
                        >
                        {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.089A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5a7 7 0 0 1-2.79 3.588l-1.395-1.395A3.5 3.5 0 0 0 7.44 4.192z"/>
                            <path d="M11.297 9.176 1.154 2.01a.5.5 0 0 1 .68-.74l13 9a.5.5 0 0 1-.68.74l-2.857-1.98A3.4 3.4 0 0 0 11.3 9.176z"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                            <path d="M0 8s3-5.5 8-5.5 8 5.5 8 5.5-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                            </svg>
                        )}
                    </Button>
                </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Data di Nascita</Form.Label>
                <Form.Control 
                    type="date" 
                    placeholder="Inserisci la tua email"
                    name="birthDate"
                    onChange={onChangeInput}
                    value={dataForm.birthDate}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Registrati
            </Button>
        </Form>
      </Container>
    </Container>
  )
}

export default SignIn
