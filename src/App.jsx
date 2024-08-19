import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./scene/global/Sidebar";
import Topbar from "./scene/global/Topbar";
import { useContext } from "react";
import { SidebarContext } from "./context/sidebarContext.jsx";
import { LoginContext } from "./context/loginContext.jsx";
import PlannedMovs from "./components/PlannedMovs.jsx";
import { useMediaQuery } from "@mui/material";
import { getPendingMovs } from "./services/APIService.js";
// import { SidebarContext } from "./barMargin.jsx";

function App() {
  const { signed } = useContext(LoginContext);
  const { siderbarWid, toggleSidebarWid } = useContext(SidebarContext);
  const [hidden, setHidden] = useState(1);

  const marginStyle = {
    marginLeft: `${siderbarWid}px`,
  };

  const noSidebar = useMediaQuery("(max-width:975px)");

  // const getInfo = async () => {
  //   const sla = await getPendingMovs();

  //   console.log("------>>>", sla);
  // };

  // useEffect(() => {
  //   getInfo();
  // }, []);

  return (
    <div className="app">
      <PlannedMovs hidden={hidden} setHidden={setHidden} />

      {noSidebar ? "" : <Sidebar />}

      <main className="content">
        <Topbar />
        <div style={noSidebar ? {} : marginStyle} className="margin-content ">
          {signed ? <Outlet /> : (window.location.href = "/")}
        </div>
      </main>
    </div>
  );
}

export default App;
