import NavBar from "./components/NavBar";

import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./routes/login"
import DashboardAdmin from "./routes/DashboardAdmin"


export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        <Route path="login" element={<Login />} />
        <Route path="dashboardadmin" element={<DashboardAdmin />} />
    </Routes>
    </>
  );
}
