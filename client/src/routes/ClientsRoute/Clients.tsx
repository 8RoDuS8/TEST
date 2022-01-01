import { useQuery } from "react-query";
import { Box } from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { LinearProgress, Typography } from "@mui/material";
import getClients, { Client } from "$/api/getClients";


const columns: GridColDef[] = [
  { field: 'FullName', headerName: 'Full name', width: 150 },
  { field: 'Email', headerName: 'Email', width: 200 },
  { field: 'Address', headerName: 'Address', width: 240 },
  { field: 'PhoneNumber', headerName: 'Phone number', width: 130 },
  { field: 'DateOfBirth', headerName: 'Date of Birth', width: 110 }
];


const clientsPromise = () => new Promise<Client[]>((resolve, reject) => {
  getClients()((data) => resolve(data.clients), reject);
});


const Clients = () => {


  const { data: clients, isLoading, error } = useQuery("clients", clientsPromise);

  if (isLoading) return <>
    <LinearProgress />
    <Typography variant="h6">Loading clients...</Typography>
  </>

  if (!clients || clients.length === 0)
    return <Typography variant="h6">You don't have any clients. Create clients by pressing the button above.</Typography>

  if (!!error || !clients) return <Typography variant="h6" textAlign="center">
    Error getting clients: {error}
  </Typography>

  return <Box height={700}>
    <DataGrid
      rows={clients.map(clientsToTableData)}
      columns={columns} />
  </Box>
}


const clientsToTableData = (v: Client) => {
  const { Id: id, FullName, Email, Address, PhoneNumber, DateOfBirth } = v;
  return { id, FullName, Email, Address, PhoneNumber, DateOfBirth: dateToBirthDay(DateOfBirth) };
};


const dateToBirthDay = (isoDate: string) => {
  const d = new Date(isoDate);
  return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join("/");
}


export default Clients
