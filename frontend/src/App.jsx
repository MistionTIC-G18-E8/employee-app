import NavBar from "./components/NavBar";

import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./routes/login"
import DashboardAdmin from "./routes/DashboardAdmin"
import DashboardNomina from "./routes/DashboardNomina"
import DescargarReporteDePago from "./routes/DescargarReporteDePago"
import EditarPerfil from "./routes/EditarPerfil"
import SolicitarPermisos from "./routes/SolicitarPermisos"
import SolicitarVacaciones from "./routes/SolicitarVacaciones"



export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        <Route path="login" element={<Login />} />
        <Route path="dashboardadmin" element={<DashboardAdmin />} />
        <Route path="dashboardnomina" element={<DashboardNomina />} />
        <Route path="descargarreportedepago" element={<DescargarReporteDePago />} />
        <Route path="editarperfil" element={<EditarPerfil />} />
        <Route path="solicitarpermisos" element={<SolicitarPermisos />} />
        <Route path="solicitarvacaciones" element={<SolicitarVacaciones />} />

        
        
    </Routes>
    </>
  );
}
