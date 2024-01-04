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

  const authenticateUser = async () => {
    try {
      const response = await axios.post('https://localhost:7017/api/User/authenticate', {
        email: emailOfUser,
        password: password
      });

      if (response.status === 200) {
        const token = response.data.token; 
        localStorage.setItem('token', token);
        navigate('/board');
      } else {
        setShowError(true);
      }
    } catch (error) {
      setShowError(true);
      console.error('Erro no login:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };


  return (
    <div className="container">
      <div className="inner-container">
        <Typography variant="h4" gutterBottom>
         Kanban Board
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
          <Button sx={{ mt: "1rem" }} variant="contained" onClick={handleSubmit}>
            Entrar
          </Button>
        </div>

        <Box>
          <Link href="#" color="primary">
            Faça seu cadastro.
          </Link>
        </Box>
      </div>
    </div>
  );
};
export default Login;
