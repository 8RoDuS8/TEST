import { ReactEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { Button, Container, Grid, Snackbar, TextField, Typography } from '@mui/material';

import PasswordStrength from '$/components/PasswordStrength';
import PasswordField from '$/components/PasswordField';

import changePassword from '$/api/changePassword';
import JwtManager from '$/utils/JwtManager';
import LoadingButton from '$/components/LoadingButton';




const setPasswordPromise = (oldPassword: string, newPassword: string, newPasswordRepeat: string) =>
  new Promise<string>(changePassword(oldPassword, newPassword, newPasswordRepeat));

export default function ChangePasswordForm() {

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("")


  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading, error, mutate, reset } = useMutation<string, string>(() => setPasswordPromise(oldPassword, newPassword, newPasswordRepeat), {
    onSuccess: (token) => {
      JwtManager.set(token);
      queryClient.invalidateQueries("clients").finally(() => navigate("/clients"));
    }
  })

  const submit: ReactEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate();
  }

  return <>
    <Container maxWidth="sm" >
      <form onSubmit={submit}>
        <Grid container spacing={2}>
          <Grid item xs={12}><Typography variant="h3" color="primary">Change Password</Typography></Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Please enter you old password and create a new one.</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth required variant="standard" label="Old Password" type="password"
              value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
          </Grid>

          <Grid item xs={12}>
            <PasswordField fullWidth required variant="standard" label="New Password"
              value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </Grid>

          <Grid item xs={12}>
            <PasswordField fullWidth required variant="standard" label="New Password repeat"
              value={newPasswordRepeat} onChange={(e) => setNewPasswordRepeat(e.target.value)} />
          </Grid>

          <Grid item xs={12}><PasswordStrength value={newPassword} />
          </Grid>
          <Grid item xs={12} container spacing={1}>
            <Grid item>
              <LoadingButton loading={isLoading} variant="contained" type="submit">Change Password</LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>


    <Snackbar open={!!error} message={error}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      action={<Button variant="text" onClick={reset}>Dismiss</Button>} />
  </>

}
