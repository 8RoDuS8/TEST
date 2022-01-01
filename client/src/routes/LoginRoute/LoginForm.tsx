import { FormEventHandler, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Button, Container, Grid, Snackbar, TextField, Typography } from "@mui/material";

import Logo from "$/components/Logo";
import PasswordField from "$/components/PasswordField";

import { useAuth } from "$/context/AuthContext/AuthContext";

import login from "$/api/login";
import authUser from "$/api/authUser";

import JwtManager from "$/utils/JwtManager";
import LoadingButton from "$/components/LoadingButton";


export default function LoginForm() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setUser } = useAuth();

  const navigate = useNavigate();


  function onUserAuthenticated(_username: string, authenticateD: boolean) {
    setUser(_username);
  }

  function onUserAuthFail(_error: string) {
    alert(_error);
  }

  function onSuccess(token: string) {
    JwtManager.set(token);
    authUser()(onUserAuthenticated, onUserAuthFail);
  }

  function onError(_error: string) {
    setError(_error);
  }

  const submit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    onSumbit();
  }

  const onSumbit = async () => {
    setError("");
    setLoading(true);
    await login(username, password)(onSuccess, onError);
    setLoading(false);
  }

  const navigateToRegister = () => navigate("/register");



  return <Container maxWidth="sm">

    <form onSubmit={submit}>
      <Grid container spacing={2}>

        <Grid item xs={12}><Logo height={64} /></Grid>
        <Grid item xs={12}>
          <Typography variant="h3" color="primary">Welcome Back!</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth required variant="standard" label="Username" name="username"
            value={username} onChange={e => setUsername(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <PasswordField fullWidth required variant="standard" label="Password" name="password"
            value={password} onChange={e => setPassword(e.target.value)} />
        </Grid>
        <Grid item xs={12} container spacing={1}>
          <Grid item>
            <LoadingButton loading={loading} variant="contained" type="submit">Login</LoadingButton>
          </Grid>
          <Grid item>
            <Button disabled={loading} variant="outlined"
              onClick={navigateToRegister}>Sign-up</Button>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar open={!!error.length} message={error}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        action={<Button variant="text" onClick={() => setError("")}>Dismiss</Button>} />
    </form >
  </Container>
}
