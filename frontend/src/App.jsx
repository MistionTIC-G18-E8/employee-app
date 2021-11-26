import NavBar from "./components/NavBar";

import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
