import { useLocation,Outlet } from "react-router-dom";
import Navbar from "../components/header/Navbar.js";
import Footer from "../components/footer/Footer.js";
import { Fragment } from "react";

const ConfigLayout = () => {
  const { pathname } = useLocation();
  return (
    <Fragment>
      <Navbar />
      <Outlet />
      {/* biểu thức bên trái đúng trả về kêt quả biểu thức bên phải, ngược lại trả lại false */}
      {!(pathname ==="/") && <Footer />} 
    </Fragment>
  );
};
export default ConfigLayout;
