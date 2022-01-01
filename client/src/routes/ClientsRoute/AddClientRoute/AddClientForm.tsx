import { ReactEventHandler, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Grid, Typography, TextField, Button, Snackbar } from '@mui/material'

import addClient from '$/api/addClient'

const AddClientForm = () => {

  const [fullname, setFullname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(" ");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")

  const navigate = useNavigate();

  const navigateBack = () => navigate("..");

  const submit: ReactEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setLoading(true);
    addClient({ fullname, dob: dateOfBirth, email, phoneNumber, address })(navigateBack, setError)
      .finally(() => setLoading(false));
  }


  return <>
    <Container maxWidth="sm">

      <form onSubmit={submit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h3" color="primary">Add a new client</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth required variant="standard" label="Full name" name="name"
              value={fullname} onChange={e => setFullname(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth required variant="standard" label="Date of Birth" name="dob" type="date"
              value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth required variant="standard" label="Email" name="email" type="email"
              value={email} onChange={e => setEmail(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth required variant="standard" label="Phone Number" name="phone" type="tel"
              value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth required variant="standard" label="Address" name="address"
              value={address} onChange={e => setAddress(e.target.value)} />
          </Grid>

          <Grid item xs={12} container spacing={1}>

            {loading ? <p>Loading...</p> :
              <>
                <Grid item><Button variant="contained" type="submit">Save</Button></Grid>
                <Grid item><Button variant="text" color="secondary" onClick={navigateBack}>Cancel</Button></Grid>
              </>}
          </Grid>
        </Grid>
      </form >
    </Container>
    <Snackbar open={!!error.length} message={error}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      action={<Button variant="text" onClick={() => setError("")}>Dismiss</Button>} />
  </>
}

export default AddClientForm
