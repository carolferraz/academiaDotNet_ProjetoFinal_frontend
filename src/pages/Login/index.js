import "./styles.css";
import { Typography, TextField, Button, Link } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Box } from "@mui/material";
import api from "../../api/api";
import logo from "../../assets/logo-green.png";

const Login = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [emailOfUser, setEmailOfUser] = useState();
  const [password, setPassword] = useState();
  const btnEnterRef = useRef(null);

  const authenticateUser = async () => {
    try {
      const response = await api.post("User/authenticate", {
        email: emailOfUser,
        password: password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/board");
      } else {
        setShowError(true);
      }
    } catch (error) {
      setShowError(true);
      console.error("Erro no login:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      authenticateUser();
      if (btnEnterRef.current) {
        btnEnterRef.current.click();
      }
    }
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
        <Typography variant="h6">Bem-vindo(a)!</Typography>
        <Typography variant="overline" mb={"1rem"}>
          Faça login para acessar seu painel!
        </Typography>

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
            Os dados de acesso estão incorretos.
          </Typography>
        )}

        <div className="align-btn">
          <Button
            sx={{ mt: "1rem", mb: "1rem" }}
            variant="contained"
            onClick={handleSubmit}
            ref={btnEnterRef}
          >
            Entrar
          </Button>
        </div>

        <Box>
          <Typography variant="subtitle2">
            <Link href="/signup" color="primary">
              Faça seu cadastro
            </Link>
          </Typography>
        </Box>
      </div>
    </div>
  );
};
export default Login;
