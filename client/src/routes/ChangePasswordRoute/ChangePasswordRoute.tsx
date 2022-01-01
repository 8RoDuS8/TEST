import { Route, Routes } from "react-router";
import ChangePasswordComponent from "./ChangePasswordComponent";

export default function ChangePasswordRoute() {
  return <Routes>
    <Route path="/*" element={<ChangePasswordComponent />} />
  </Routes>
}
