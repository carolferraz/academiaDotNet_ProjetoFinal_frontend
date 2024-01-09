import { Typography, TextField, Button, Link } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Box } from "@mui/material";
import api from "../../../api/api";
import logo from "../../../assets/logo-green.png";

const SignUp = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nameOfUser, setNameOfUser] = useState('');
  const [emailOfUser, setEmailOfUser] = useState('');
  const [password, setPassword] = useState('');
  const btnEnterRef = useRef(null);

  const handleSignUp = async () => {
    try {
        if (!validateEmail(emailOfUser)) {
            setEmailError(true);
            return;
          }

      const response = await api.post('User/register', {
        name: nameOfUser,
        email: emailOfUser,
        password: password
      });

      if (response.status === 200 || response.status === 201) {
        navigate('/');
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
    handleSignUp();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSignUp();
      if (btnEnterRef.current) {
        btnEnterRef.current.click();
      }
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  

  return (
    <div className="container">
      <div className="inner-container">
      <Box
          alignSelf={"center"}
          component="img"
          sx={{
            height: "40%",
            width: "40%",
            mb: '0.5rem'
          }}
          alt="logo"
          src={logo}
        />
        <Typography variant="h6" mb={'1rem'}>
         Faça seu cadastro!
        </Typography>

        <TextField
          sx={{ mb: "1rem" }}
          label="Nome"
          value={nameOfUser}
          onChange={(e) => setNameOfUser(e.target.value)}
        />

        <TextField
          sx={{ mb: "1rem" }}
          label="E-mail"
          value={emailOfUser}
          onChange={(e) => setEmailOfUser(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <TextField
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyPress}
          
          />
          {showError && (
            <Typography variant="paragraph" color="error">
             Ocorreu um erro no cadastro. Por favor, tente novamente.

            </Typography>
          )}
          {emailError && (
            <Typography variant="paragraph" color="error">
             Formato de e-mail inválido. Verifique o e-mail digitado.

            </Typography>
          )}

        <div className="align-btn">
          <Button sx={{ mt: "1rem", mb: "1rem" }} variant="contained" onClick={handleSubmit} ref={btnEnterRef}>
            Cadastrar
          </Button>
        </div>
        <Box>
          <Typography variant='subtitle2'>
            Já tem uma conta? 
            <Link ml={'0.5rem'} href="/" color="primary">Faça seu login</Link>
          </Typography>
        </Box>
      </div>
    </div>
  );
};
export default SignUp;
