import { useEffect } from "react"
import { Container } from "react-bootstrap"
import { useSearchParams, useNavigate } from "react-router-dom"

const OauthSuccess = ({ onLoginSuccess }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()

  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      console.log("Token ricevuto con successo:", token);
      
      localStorage.setItem("token", token);
      
      if (onLoginSuccess) {
        onLoginSuccess(token); 
      }

      setTimeout(() => {
        navigate("/")
      }, 3000);
    } else {
      console.error("Nessun token trovato nell'URL");
    }
  }, [token, navigate, onLoginSuccess]);

  return (
    <Container 
    fluid 
    className="d-flex flex-column justify-content-center align-items-center" 
    style={{ minHeight: "80vh" }}
  >
    <div className="text-center p-4 shadow-sm rounded-3 bg-light" style={{ maxWidth: "400px" }}>
      <div className="spinner-border text-primary mb-3" role="status">
        <span className="visually-hidden">Caricamento...</span>
      </div>
      
      <h2 className="blog-main-title h4 mb-2">Autenticazione in corso</h2>
      <p className="text-muted small mb-0">
        Ti stiamo reindirizzando su Strive Blog, un attimo di pazienza!
      </p>
    </div>
  </Container>
  );
};

export default OauthSuccess;