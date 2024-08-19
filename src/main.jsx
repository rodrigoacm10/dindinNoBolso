import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Login from "./scene/login/index.jsx";
import Register from "./scene/register/index.jsx";
import Dashboard from "./scene/dashboard/index.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SidebarProvider } from "./context/sidebarContext.jsx";
import { LoginProvider } from "./context/loginContext.jsx";
import Faq from "./scene/faq/index.jsx";
import { TokenProvider } from "./context/tokenContext.jsx";
import QrCodeReader from "./scene/qrcodeReader/index.jsx";
// import { SidebarProvider } from "./barMargin.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Profile from "./scene/profile/index.jsx";
import Dash from "./scene/dash/index.jsx";
import ForgotPassword from "./scene/forgotPassword/index.jsx";
import RecoverPassword from "./scene/recoverPassword/index.jsx";
import Products from "./scene/products/index.jsx";
import Home from "./scene/home/index.jsx";
import Initial from "./scene/initial/index.jsx";
import Sales from "./scene/sales/index.jsx";
import Buys from "./scene/buys/index.jsx";
import SalesReports from "./scene/reports/SalesReports.jsx";
import StocksReports from "./scene/reports/StockReports.jsx";
import FinancesReports from "./scene/reports/FinancesReport.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Initial />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    // path: "/:id/initialPage",
    path: "/initialPage",

    element: <App />,
    children: [
      {
        // path: "/:id/initialPage",
        path: "/initialPage",

        element: <Home />,
      },
    ],
  },
  {
    // path: "/:id/initialPage",
    path: "/finance",

    element: <App />,
    children: [
      {
        // path: "/:id/initialPage",
        path: "/finance",

        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/FAQ",
    element: <App />,
    children: [
      {
        path: "/FAQ",

        element: <Faq />,
      },
    ],
  },
  {
    path: "/QRcodeReader",
    element: <App />,
    children: [
      {
        path: "/QRcodeReader",

        element: <QrCodeReader />,
      },
    ],
  },
  {
    path: "/perfil",
    element: <App />,
    children: [
      {
        path: "/perfil",

        element: <Profile />,
      },
    ],
  },
  {
    path: "/reports/sales",
    element: <App />,
    children: [
      {
        path: "/reports/sales",
        element: <SalesReports />,
      },
    ],
  },
  {
    path: "/reports/stock",
    element: <App />,
    children: [
      {
        path: "/reports/stock",
        element: <StocksReports />,
      },
    ],
  },
  {
    path: "/reports/finances",
    element: <App />,
    children: [
      {
        path: "/reports/finances",
        element: <FinancesReports />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <App />,
    children: [
      {
        path: "/dashboard",

        element: <Dash />,
      },
    ],
  },
  {
    path: "/products",
    element: <App />,
    children: [
      {
        path: "/products",

        element: <Products />,
      },
    ],
  },
  {
    path: "/buys",
    element: <App />,
    children: [
      {
        path: "/buys",
        element: <Buys />,
      },
    ],
  },
  {
    path: "/sales",
    element: <App />,
    children: [
      {
        path: "/sales",

        element: <Sales />,
      },
    ],
  },
  {
    path: "/esqueceuSenha",
    element: <ForgotPassword />,
    children: [
      {
        path: "/esqueceuSenha",

        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: "/esqueceusenha/recuperar",
    element: <RecoverPassword />,
    children: [
      {
        path: "/esqueceusenha/recuperar",

        element: <RecoverPassword />,
      },
    ],
  },
]);

// RecoverPassword

// 26231121354457000174650010001442111267101052
// 26231121354457000174650010001442111267101052

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="405712504244-i05nmrpqi8i2m4toblkk51gv8fi2diqp.apps.googleusercontent.com">
    <React.StrictMode>
      {/* <App /> */}
      {/* <Login /> */}
      {/* <Register /> */}
      <LoginProvider>
        <SidebarProvider>
          <TokenProvider>
            <RouterProvider router={router} />
          </TokenProvider>
        </SidebarProvider>
      </LoginProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
