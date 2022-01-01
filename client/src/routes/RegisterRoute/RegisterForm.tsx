import { FormEventHandler, useState } from "react"
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { Button, Container, Grid, Snackbar, TextField, TextFieldProps, Typography } from "@mui/material";

import Logo from "../../components/Logo";
import PasswordStrength from "../../components/PasswordStrength";

import { useAuth } from "../../context/AuthContext/AuthContext";

import authUser from "../../api/authUser";
import register from "../../api/register";
import JwtManager from "../../utils/JwtManager";
import PasswordField from "../../components/PasswordField";

const USERNAME_MIN_LENGTH = 6;



export default function RegisterForm() {

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("")

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setUser } = useAuth();

  const navigate = useNavigate();

  const onChangeEmail = (value: string) => {
    setEmail(value);
    setEmailError(validator.isEmail(value) ? "" : "Email is invalid");
  }
  const onChangeUsername = (value: string) => {
    setUsername(value);
    setUsernameError(value.length < USERNAME_MIN_LENGTH ? "Username too short" : "");
  }



  function onUserAuthenticated(_username: string, authenticateD: boolean) {
    setUser(_username);
  }

  function onSuccess(token: string) {
    JwtManager.set(token);
    authUser()(onUserAuthenticated, onError);
  }

  function onError(_error: string) {
    setError(_error);
  }

  const submit: FormEventHandler<HTMLFormElement> = async e => {



    e.preventDefault();
    setError("");
    setLoading(true);
    await register(email, username, password)(onSuccess, onError);
    setLoading(false);

  }

  const navigateToLogin = () => navigate("/login");


  return <Container maxWidth="sm">

    <form onSubmit={submit}>
      <Grid container spacing={2}>
        <Grid item xs={12}><Logo height={64} /></Grid>
        <Grid item xs={12}><Typography variant="h3" color="primary">Register</Typography></Grid>

        <Grid item xs={12}>
          <TextField fullWidth required variant="standard" label="Email" name="email"
            value={email} helperText={emailError} error={!!emailError}
            onChange={e => onChangeEmail(e.target.value)} />
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth required variant="standard" label="Username" name="username"
            value={username} helperText={usernameError} error={!!usernameError}
            onChange={e => onChangeUsername(e.target.value)} />
        </Grid>

        <Grid item xs={12}>
          <PasswordField fullWidth required variant="standard" label="Password" name="password"
            value={password}
            onChange={e => setPassword(e.target.value)} />
        </Grid>

        <Grid item xs={12}><PasswordStrength value={password} /></Grid>
        <Grid item container xs={12} spacing={1}>
          {loading ?
            <p>Loading...</p>
            : <>
              <Grid item><Button type="submit" variant="contained" >Sign-up</Button></Grid>
              <Grid item><Button variant="outlined" onClick={navigateToLogin} >Go to Login</Button></Grid>
            </>
          }</Grid>
      </Grid>
      <Snackbar open={!!error.length} message={error}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        action={<Button variant="contained" color="secondary" onClick={() => setError("")}>Dismiss</Button>} />
    </form >
  </Container >
}
