import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AddClientRoute from './AddClientRoute/AddClientRoute'
import ClientsRouteComponent from './ClientsRouteComponent';

const ClientsRoute = () => {

  return <Routes>
    <Route path="/" element={<ClientsRouteComponent />} />
    <Route path="new" element={<AddClientRoute />} />
  </Routes>

}

export default ClientsRoute
