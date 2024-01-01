import "./styles.css";
import { Typography, TextField, Button, Link } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box } from "@mui/material";
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [emailOfUser, setEmailOfUser] = useState();
  const [password, setPassword] = useState();

  const navigateHome = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://localhost:7109/api/User/users/', {
        email: emailOfUser,
        senha: password,
      });

      if (response.status === 200) {
        // Login bem-sucedido - redirecionar para a página home
        navigate('/home');
      } else {
        setShowError(true);
      }
    } catch (error) {
      setShowError(true);
      console.error('Erro no login:', error);
    }
  };

  return (
    <div className="container">
      <div className="inner-container">
        <Typography variant="h4" gutterBottom>
          Seja bem vindo(a)!
        </Typography>


        <TextField
          sx={{ mb: "1rem" }}
          label="Email"
          value={emailOfUser}
          onChange={(e) => setEmailOfUser(e.target.value)}
        />

        <TextField
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          
          />
          {showError && (
            <Typography variant="paragraph" color="error">
              Os dados de acesso não são válidos.
            </Typography>
          )}

        <div className="align-btn">
          <Button sx={{ mt: "1rem" }} variant="contained" onClick={navigateHome}>
            Entrar
          </Button>
        </div>

        <Box>
          <Link href="#" color="primary">
            Esqueceu a senha?
          </Link>
          <Link href="#" color="primary">
            Faça seu cadastro.
          </Link>
        </Box>
      </div>
    </div>
  );
};
export default Login;
