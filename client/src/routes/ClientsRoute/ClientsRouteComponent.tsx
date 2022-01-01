import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import { Button, Container, Divider, Stack } from '@mui/material';
import Clients from './Clients';

const ClientsRouteComponent = () => {
  const navigate = useNavigate();


  return <Container maxWidth="md" sx={{ my: 2 }}>
    <Stack direction="column" spacing={1}>

      <Button startIcon={<Add />} variant="contained" onClick={() => navigate("new")}>Create New Client</Button>
      <Divider />
      <Clients />
    </Stack>
  </Container>

}

export default ClientsRouteComponent
