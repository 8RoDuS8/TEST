import styled from "@emotion/styled";
import { AppBar, Button, ButtonGroup, CardActions, Grid, Toolbar, Typography } from "@mui/material";
import { useMatch, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext/AuthContext";
import Logo from "../Logo";

export default function Navbar() {


  const navigate = useNavigate();

  const atHome = useMatch("home");
  const atClients = useMatch("clients/*");
  const atChangePassword = useMatch("changePassword");

  const { user, signOut } = useAuth();

  return <>
    <AppBar color="inherit">
      <Toolbar>
        <Grid container spacing={2} justifyContent="center" alignItems="center" alignContent="center" flexWrap="nowrap" >
          <Grid item><Logo height={48} /></Grid>
          <Grid item container flexGrow={1} justifyContent="center" columnSpacing={1}>
            <Grid item>
              <Button disabled={!!atHome} variant="text" onClick={() => navigate("/home")}>Home</Button>
            </Grid>
            <Grid item>
              {!!user && <Button disabled={!!atClients} variant="text" onClick={() => navigate("/clients")}>Manage Clients</Button>}
            </Grid>
            <Grid item>
              {!!user && <Button disabled={!!atChangePassword} variant="text" onClick={() => navigate("/changePassword")}>Change Password</Button>}
            </Grid>
          </Grid>
          <Grid item>
            {user && <Typography variant="body2" textAlign="center">Hi {user}</Typography>}
          </Grid>
          <Grid item>
            {user ?
              <Button variant="text" color="secondary" onClick={signOut}>Logout</Button>
              :
              <Button variant="contained" onClick={() => navigate("/login")}>Login</Button>
            }
          </Grid >
        </Grid>
      </Toolbar>
    </AppBar >
    <Toolbar />
  </>
}