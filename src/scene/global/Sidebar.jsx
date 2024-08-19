import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarContext";
// import { SidebarContext } from "../../barMargin.jsx";
// import MenuIcon from "@mui/icons-material/Menu";
import { MenuOutlined } from "@mui/icons-material";
import { Box } from "@mui/system";
import { FaHome } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import logo from "../../assets/logo-dindin.png";
// import perfil from "https://recicont-api-tn8k.onrender.com/files/83a6a7df-126d-4bad-b12c-b0a62398326b_1705179104601.jpeg";
import { Button, Typography, useMediaQuery } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { CiCoinInsert } from "react-icons/ci";
import { GiInfo } from "react-icons/gi";
import { GrCart } from "react-icons/gr";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import ConfirmToDo from "../../components/confirmToDo";
import { getUserInfosFunc, importFileData } from "../../services/APIService";
// import "react-pro-sidebar/dist/css/styles.css";
import { BsCashCoin } from "react-icons/bs";
import { IoBagOutline } from "react-icons/io5";
// console.log
import { CiBoxes } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import Slide from "@mui/material/Slide";
import { LiaNewspaperSolid } from "react-icons/lia";
// compras

function ItemNav({
  linkTo,
  title,
  textDescription,
  iconButton,
  titleSidebar,
  setTitleSidebar,
  openMenu,
  setOpenMenu,
  activaded = true,
  showProductSidebar,
  setShowProductSidebar,
  showReportSidebar,
  setShowReportSidebar,
}) {
  const isLittleHeight = useMediaQuery("(max-height:725px)");

  return (
    // <MenuItem>
    <Box>
      {activaded ? (
        <Link to={`${linkTo}`} style={{ textDecoration: "none" }}>
          <Box
            display="flex"
            alignItems="center"
            pl="30px"
            p={`${isLittleHeight ? "15px" : "20px"}`}
            gap="20px"
            fontSize={`${isLittleHeight ? "16" : "18px"}`}
            borderRadius="9px"
            sx={
              titleSidebar == `${title}`
                ? {
                    transition: "0.5s",
                    color: "black",
                    backgroundColor: "#E0E0E0",
                    ":hover": {
                      color: "black",
                      backgroundColor: "#E0E0E0",
                    },
                  }
                : {
                    transition: "0.5s",
                    color: "black",
                    ":hover": {
                      color: "black",
                      backgroundColor: "#E0E0E0",
                    },
                  }
            }
            onClick={() => {
              setTitleSidebar(`${title}`)
              if (showProductSidebar) {
                setShowProductSidebar(!showProductSidebar);
                if(!openMenu){
                  setOpenMenu(!openMenu);
                }
              }
              if (showReportSidebar) {
                setShowReportSidebar(!showReportSidebar);
                if(!openMenu){
                  setOpenMenu(!openMenu);
                }
              }
            }}
            
          >
            {iconButton}
            {openMenu && <Box>{textDescription}</Box>}
          </Box>
        </Link>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          pl="30px"
          p={`${isLittleHeight ? "15px" : "20px"}`}
          gap="20px"
          fontSize={`${isLittleHeight ? "16" : "18px"}`}
          borderRadius="9px"
          sx={
            {
              transition: "0.5s",
              color: "#b1b1b1",
              ":hover": {
                color: "#b1b1b1",
                backgroundColor: "#f7f7f7",
              },
            }
          }
          onClick={() => {
            setTitleSidebar();
          }}
        >
          {iconButton}
          {openMenu && <Box>{textDescription}</Box>}
        </Box>
      )}
    </Box>
  );
}

function Sidebar() {
  const { attData, attDataFunc, imgUrlProfile, setImgUrlProfile } =
    useContext(SidebarContext);

  const [titleSidebar, setTitleSidebar] = useState("initialPage");
  const { toggleOpenPopUp, openPopUp, siderbarWid, toggleSidebarWid } =
    useContext(SidebarContext);
  const [openMenu, setOpenMenu] = useState(true);
  const [userInfos, setUserInfos] = useState([]);
  const [confirmVisible, setConfirmVisible] = useState(false);

  // Para criar as opçoes de produtos
  const [showProductSidebar, setShowProductSidebar] = useState(false);
  // Para criar opções de Relatórios
  const [showReportSidebar, setShowReportSidebar] = useState(false);
  const location = useLocation();

  const isLittleHeight = useMediaQuery("(max-height:725px)");

  // console.log('--->>', isLittleHeight)

  // useEffect(() => {
  //   if (isMobileLittleScreen) {
  // console.log('yeees')
  // }
  // } ,[])

  const [widthSidebar, setWidthSidebar] = useState(400);
  const sidebarEl = useRef(null);

  const sidebarCollapseStyle = {
    width: `${widthSidebar}px`,
  };

  const API_URL = "https://recicont-api-tn8k.onrender.com";
  // const API_URL = "https://recicont-api.onrender.com/files";

  const getImage = async () => {
    const resp = await importFileData();
    // console.log("-> -> ->", resp);
    const bytes = resp.split("").map((c) => c.charCodeAt(0));
    const base64 = window.btoa(new Uint8Array(bytes).buffer);
    const image = new Image({
      src: `data:image/jpeg;base64,${base64}`,
    });
    // console.log(image);
    // console.log(image.src);
    return image.src;
  };

  const getMovs = async () => {
    const responseUserInfos = await getUserInfosFunc();

    // console.log(responseUserInfos);
    setUserInfos(responseUserInfos.data);
  };

  useEffect(() => {
    console.log("---pathName----", location.pathname);
    setTitleSidebar(location.pathname);

    toggleSidebarWid(sidebarEl.current.offsetWidth);
    getMovs();
  }, []);

  useEffect(() => {
    console.log("---pathName----", location.pathname);
    // toggleSidebarWid(sidebarEl.current.offsetWidth);
    // getMovs();
    setTitleSidebar(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    toggleSidebarWid(sidebarEl.current.offsetWidth);
    getMovs();
  }, [attData]);

  useEffect(() => {
    toggleSidebarWid(sidebarEl.current.offsetWidth);
    getMovs();
  }, [openMenu]);

  useEffect(() => {
    toggleSidebarWid(sidebarEl.current.offsetWidth);
    getMovs();
  }, [showProductSidebar]);

  useEffect(() => {
    toggleSidebarWid(sidebarEl.current.offsetWidth);
    getMovs();
  }, [showReportSidebar]);

  return (
    // <ProSidebar collapsed={!openMenu}>
    // <Menu iconShape="square">
    <div className="flex side-bar animationStartLeft" ref={sidebarEl}>
      {/* <Box display="flex" justifyContent="end"></Box> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="10px"
          paddingX="10px"
        >
          {openMenu ? (
            <img
              src={logo}
              alt="logo dindin"
              style={{
                height: `${isLittleHeight ? "120px" : "170px"}`,
                width: `${isLittleHeight ? "120px" : "170px"}`,
              }}
            />
          ) : (
            ""
          )}

          <MenuOutlined
            onClick={() => {
              setOpenMenu(!openMenu);
              // setWidthSidebar(sidebarEl.current.offsetWidth);
              if (showProductSidebar) {
                setShowProductSidebar(!showProductSidebar);
              }
              if (showReportSidebar) {
                setShowReportSidebar(!showReportSidebar);
              }
            }}
            sx={{
              width: "30px",
              height: "30px",
              textTransform: "none",
              display: "block",
              color: "#B23F30",
              ":hover": {
                color: "#8b3226",
              },
            }}
            // onMouseMove={(e) => (e.target.style.color = "blue")}
          />
        </Box>

        <Box>
          <Link to="/initialPage" style={{ textDecoration: "none" }}>
            <Box
              display="flex"
              alignItems="center"
              // justifyContent="center"
              pl="30px"
              p={`${isLittleHeight ? "15px" : "20px"}`}
              gap="20px"
              fontSize={`${isLittleHeight ? "16px" : "18px"}`}
              borderRadius="9px"
              transition="0.5s"
              sx={
                titleSidebar == "/initialPage"
                  ? {
                      transition: "0.5s",
                      color: "black",
                      backgroundColor: "#E0E0E0",
                      ":hover": {
                        color: "black",
                        backgroundColor: "#E0E0E0",
                      },
                    }
                  : {
                      transition: "0.5s",
                      color: "black",
                      ":hover": {
                        color: "black",
                        backgroundColor: "#E0E0E0",
                      },
                    }
              }
              onClick={() => {
                setTitleSidebar("/initialPage");
                
                if (showProductSidebar) {
                  setShowProductSidebar(!showProductSidebar);
                  if(!openMenu){
                    setOpenMenu(!openMenu);
                  }
                }
                if (showReportSidebar) {
                  setShowReportSidebar(!showReportSidebar);
                  if(!openMenu){
                    setOpenMenu(!openMenu);
                  }
                }
                // console.log(titleSidebar);
              }}
            >
              <FaHome />
              {openMenu ? <Box>INÍCIO</Box> : ""}
            </Box>
          </Link>

          <ItemNav
            linkTo="/finance"
            title="/finance"
            textDescription="FINANCEIRO"
            titleSidebar={titleSidebar}
            setTitleSidebar={setTitleSidebar}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            iconButton={
              <BsCashCoin style={{ width: "20px", height: "20px" }} />
            }
            showProductSidebar={showProductSidebar}
            setShowProductSidebar={setShowProductSidebar}
            showReportSidebar={showReportSidebar}
            setShowReportSidebar={setShowReportSidebar}
          />

          <Box
            display="flex"
            alignItems="center"
            // justifyContent="center"
            pl="30px"
            p={`${isLittleHeight ? "15px" : "20px"}`}
            gap="20px"
            fontSize={`${isLittleHeight ? "16px" : "18px"}`}
            borderRadius="9px"
            transition="0.5s"
            sx={
              titleSidebar == "/products" || titleSidebar == "/buys"
                ? {
                    transition: "0.5s",
                    color: "black",
                    backgroundColor: "#E0E0E0",
                    ":hover": {
                      color: "black",
                      backgroundColor: "#E0E0E0",
                    },
                  }
                : {
                    transition: "0.5s",
                    color: "black",
                    ":hover": {
                      color: "black",
                      backgroundColor: "#E0E0E0",
                    },
                  }
            }
            onClick={() => {
              setShowProductSidebar(!showProductSidebar);
              // setTitleSidebar("/product");
              // setWidthSidebar(sidebarEl.current.offsetWidth);
              if (openMenu) {
                setOpenMenu(!openMenu);
              }
              if (showReportSidebar){
                setShowReportSidebar(!showReportSidebar)
              }
            }}
          >
            <GrCart />
            {openMenu ? <Box>PRODUTOS</Box> : ""}
          </Box>

          {/* <ItemNav
          linkTo="/products"
          title={confirmVisible}
          textDescription="ESTOQUE"
          titleSidebar={titleSidebar}
          setTitleSidebar={setTitleSidebar}
          openMenu={openMenu}
          iconButton={<CiBoxes style={{ width: "20px", height: "20px" }} />}
        /> */}

          {/* <ItemNav
          linkTo="/buys"
          title="buys"
          textDescription="COMPRAS"
          titleSidebar={titleSidebar}
          setTitleSidebar={setTitleSidebar}
          openMenu={openMenu}
          iconButton={<GrCart style={{ width: "20px", height: "20px" }} />}
        /> */}

          <ItemNav
            linkTo="/sales"
            title="/sales"
            textDescription="VENDAS"
            titleSidebar={titleSidebar}
            setTitleSidebar={setTitleSidebar}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            iconButton={
              <IoBagOutline style={{ width: "20px", height: "20px" }} />
            }
            showProductSidebar={showProductSidebar}
            setShowProductSidebar={setShowProductSidebar}
            showReportSidebar={showReportSidebar}
            setShowReportSidebar={setShowReportSidebar}
          />


          <Box
            display="flex"
            alignItems="center"
            // justifyContent="center"
            pl="30px"
            p={`${isLittleHeight ? "15px" : "20px"}`}
            gap="20px"
            fontSize={`${isLittleHeight ? "16px" : "18px"}`}
            borderRadius="9px"
            transition="0.5s"
            sx={
              titleSidebar == "/reports/sales" || titleSidebar == "/reports/stock" || titleSidebar == "/reports/finances"
                ? {
                    transition: "0.5s",
                    color: "black",
                    backgroundColor: "#E0E0E0",
                    ":hover": {
                      color: "black",
                      backgroundColor: "#E0E0E0",
                    },
                  }
                : {
                    transition: "0.5s",
                    color: "black",
                    ":hover": {
                      color: "black",
                      backgroundColor: "#E0E0E0",
                    },
                  }
                }
            onClick={() => {
              setShowReportSidebar(!showReportSidebar);
              // setTitleSidebar("/product");
              // setWidthSidebar(sidebarEl.current.offsetWidth);
              if (openMenu) {
                setOpenMenu(!openMenu);
              }
              if (showProductSidebar){
                setShowProductSidebar(!showProductSidebar)
              }
            }}
          >
            <LiaNewspaperSolid style={{ width: "24px", height: "24px" }} />
            {openMenu ? <Box>RELATÓRIOS</Box> : ""}
          </Box>

          {/* <ItemNav
            linkTo="/reports/sales"
            title="/reports/sales"
            textDescription="RELATÓRIOS"
            titleSidebar={titleSidebar}
            setTitleSidebar={setTitleSidebar}
            openMenu={openMenu}
            iconButton={
              <LiaNewspaperSolid style={{ width: "24px", height: "24px" }} />
            }
          /> */}

          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <Box
              display="flex"
              alignItems="center"
              pl="30px"
              p={`${isLittleHeight ? "15px" : "20px"}`}
              gap="20px"
              fontSize={`${isLittleHeight ? "16" : "18px"}`}
              borderRadius="9px"
              sx={
                titleSidebar == "/dashboard"
                  ? {
                      transition: "0.5s",
                      color: "black",
                      backgroundColor: "#E0E0E0",
                      ":hover": {
                        color: "black",
                        backgroundColor: "#E0E0E0",
                      },
                    }
                  : {
                      transition: "0.5s",
                      color: "black",
                      ":hover": {
                        color: "black",
                        backgroundColor: "#E0E0E0",
                      },
                    }
              }
              onClick={() => {
                setTitleSidebar("dashboard")
                if (showProductSidebar) {
                  setShowProductSidebar(!showProductSidebar);
                  if(!openMenu){
                    setOpenMenu(!openMenu);
                  }
                }
                if (showReportSidebar) {
                  setShowReportSidebar(!showReportSidebar);
                  if(!openMenu){
                    setOpenMenu(!openMenu);
                  }
                }
              }}
            >
              <MdOutlineDashboard />
              {openMenu ? <Box>DASHBOARD</Box> : ""}
            </Box>
          </Link>

          {/* <ItemNav
          linkTo="/initialPage"
          // title="QRcodeReader"
          title={confirmVisible}
          textDescription="leitor QRcode"
          titleSidebar={confirmVisible}
          setTitleSidebar={toggleOpenPopUp}
          openMenu={openMenu}
          iconButton={
            <MdOutlineQrCodeScanner style={{ width: "24px", height: "24px" }} />
          }
          activaded={false}
        /> */}

          <Link to="/perfil" style={{ textDecoration: "none" }}>
            <Box
              display="flex"
              alignItems="center"
              pl="30px"
              p={`${isLittleHeight ? "15px" : "20px"}`}
              gap="20px"
              fontSize={`${isLittleHeight ? "16" : "18px"}`}
              borderRadius="9px"
              sx={
                titleSidebar == "/perfil"
                  ? {
                      transition: "0.5s",
                      color: "black",
                      backgroundColor: "#E0E0E0",
                      ":hover": {
                        color: "black",
                        backgroundColor: "#E0E0E0",
                      },
                    }
                  : {
                      transition: "0.5s",
                      color: "black",
                      ":hover": {
                        color: "black",
                        backgroundColor: "#E0E0E0",
                      },
                    }
              }
              onClick={() => {
                setTitleSidebar("perfil")
                if (showProductSidebar) {
                  setShowProductSidebar(!showProductSidebar);
                  if(!openMenu){
                    setOpenMenu(!openMenu);
                  }
                }
                if (showReportSidebar) {
                  setShowReportSidebar(!showReportSidebar);
                  if(!openMenu){
                    setOpenMenu(!openMenu);
                  }
                }
              }}
            >
              <FaRegCircleUser />
              {openMenu ? <Box>MEU PERFIL</Box> : ""}
            </Box>
          </Link>

          {/* { linkTo, title, textDescription, iconButton } */}
          <ItemNav
            linkTo="/FAQ"
            title="/FAQ"
            textDescription="FAQ"
            titleSidebar={titleSidebar}
            setTitleSidebar={setTitleSidebar}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            iconButton={<GiInfo style={{ width: "24px", height: "24px" }} />}
            showProductSidebar={showProductSidebar}
            setShowProductSidebar={setShowProductSidebar}
            showReportSidebar={showReportSidebar}
            setShowReportSidebar={setShowReportSidebar}
          />
        </Box>
        {/* <ConfirmToDo         confirmVisible={confirmVisible}
        setConfirmVisible={setConfirmVisible} /> */}
        {/* {
        // titleSidebar == 'QRcodeReader' && console.log('tá no QrCode')
      } */}

        {/* Mudança do local do perfil */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            // position: 'fixed', //Aqui que está dando problema
            // bottom: 0,
            // left: 0,
            borderTop: "1px solid #B23F30",
            height: "76px",
            // padding: '19px',
          }}
        >
          {openMenu ? (
            <Box
              display="flex"
              flexDirection="row"
              gap="10px"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                // backgroundColor="#7A7A7A"
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="1px solid black"
                sx={{
                  width: `${isLittleHeight ? "40px" : "50px"}`,
                  height: `${isLittleHeight ? "40px" : "50px"}`,
                  borderRadius: 50,
                  overflow: "hidden",
                }}
              >
                <img
                  src={`${imgUrlProfile}`}
                  alt="aa"
                  style={{
                    height: `${isLittleHeight ? "40px" : "50px"}`,
                    width: `${isLittleHeight ? "40px" : "50px"}`,
                  }}
                />
                {/* https://recicont-api-tn8k.onrender.com/files/83a6a7df-126d-4bad-b12c-b0a62398326b_1705179104601.jpeg */}
                {/* colocar a imagem aki */}
              </Box>
              <Box>
                <Typography
                  fontFamily="Poppins"
                  variant="h6"
                  sx={{ fontSize: "1rem" }}
                >
                  {userInfos.nome}
                </Typography>
                <Typography
                  fontFamily="Poppins"
                  variant="h6"
                  sx={{ fontSize: "0.8rem" }}
                >
                  {userInfos.categoria_conta}
                </Typography>
                {/* <Typography fontFamily="Poppins" variant="h7"> */}
                {/* $empresa$ */}
                {/* </Typography> */}
              </Box>
              <Link to="/" style={{ textDecoration: "none" }}>
                <IoIosLogOut />
              </Link>
            </Box>
          ) : (
            <Link to="/" style={{ textDecoration: "none" }}>
              <IoIosLogOut />
            </Link>
          )}
        </Box>
      </Box>

      {/* {showProductSidebar && ( */}
      <Slide
        direction="right"
        in={showProductSidebar}
        mountOnEnter
        unmountOnExit
        style={{ width: showProductSidebar ? "auto" : 0, overflow: "hidden" }}
      >
        <Box
          sx={{
            // position: 'fixed',
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            top: 0,
            left: 95,
            height: "100vh",
            padding: showProductSidebar ? "19px" : 0,
            backgroundColor: "#fff",
          }}
        >
          <Box>
            <Box
              display="flex"
              alignItems="center"
              gap="20px"
              sx={{
                borderBottom: "1px solid #B23F30",
                pb: "10px",
              }}
            >
              <GrCart />
              <Box>PRODUTOS</Box>
            </Box>

            <Box
              sx={{
                pt: "20px",
              }}
            >
              <Link to="/products" style={{ textDecoration: "none" }}>
                <Box
                    sx={
                      titleSidebar == "/products"
                        ? {
                            padding:"10px",
                            borderRadius: "10px",
                            transition: "0.5s",
                            color: "black",
                            backgroundColor: "#E0E0E0",
                            ":hover": {
                              color: "black",
                              backgroundColor: "#E0E0E0",
                            },
                          }
                        : {
                            padding:"10px",
                            borderRadius: "10px",
                            transition: "0.5s",
                            color: "black",
                            ":hover": {
                              color: "black",
                              backgroundColor: "#E0E0E0",
                            },
                          }
                        }
                  >
                    ESTOQUE
                </Box>
              </Link>
              <Link to="/buys" style={{ textDecoration: "none" }}>
                <Box
                    sx={
                      titleSidebar == "/buys"
                        ? {
                            padding:"10px",
                            borderRadius: "10px",
                            transition: "0.5s",
                            color: "black",
                            backgroundColor: "#E0E0E0",
                            ":hover": {
                              color: "black",
                              backgroundColor: "#E0E0E0",
                            },
                          }
                        : {
                            padding:"10px",
                            borderRadius: "10px",
                            transition: "0.5s",
                            color: "black",
                            ":hover": {
                              color: "black",
                              backgroundColor: "#E0E0E0",
                            },
                          }
                        } 
                  >
                    COMPRAS
                  </Box>
              </Link>
            </Box>
          </Box>

          <Box
            sx={{
              borderTop: "1px solid #B23F30",
              pt: "10px",
            }}
          >
            <Typography
              fontFamily="Poppins"
              variant="h6"
              sx={{ fontSize: "1rem" }}
            >
              {userInfos.nome}
            </Typography>
            <Typography
              fontFamily="Poppins"
              variant="h6"
              sx={{ fontSize: "0.8rem" }}
            >
              {userInfos.categoria_conta}
            </Typography>
          </Box>
        </Box>
      </Slide>

      {/* Report sidebar */}

      <Slide
        direction="right"
        in={showReportSidebar}
        mountOnEnter
        unmountOnExit
        style={{ width: showReportSidebar ? "auto" : 0, overflow: "hidden" }}
      >
        <Box
          sx={{
            // position: 'fixed',
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            top: 0,
            left: 95,
            height: "100vh",
            padding: showReportSidebar ? "19px" : 0,
            backgroundColor: "#fff",
          }}
        >
          <Box>
            <Box
              display="flex"
              alignItems="center"
              gap="20px"
              sx={{
                borderBottom: "1px solid #B23F30",
                pb: "10px",
              }}
            >
              <LiaNewspaperSolid style={{ width: "24px", height: "24px" }}/>
              <Box>RELATÓRIOS</Box>
            </Box>

            <Box
              sx={{
                pt: "20px",
              }}
            >
              
              <Link to="/reports/sales" style={{ textDecoration: "none" }}>
                <Box
                  sx={
                    titleSidebar == "/reports/sales"
                      ? {
                          padding:"10px",
                          borderRadius: "10px",
                          transition: "0.5s",
                          color: "black",
                          backgroundColor: "#E0E0E0",
                          ":hover": {
                            color: "black",
                            backgroundColor: "#E0E0E0",
                          },
                        }
                      : {
                          padding:"10px",
                          borderRadius: "10px",
                          transition: "0.5s",
                          color: "black",
                          ":hover": {
                            color: "black",
                            backgroundColor: "#E0E0E0",
                          },
                        }
                      }    
                >
                  VENDAS
                </Box>
              </Link>

              <Link to="/reports/stock" style={{ textDecoration: "none" }}>
                <Box
                  sx={
                    titleSidebar == "/reports/stock"
                      ? {
                          padding:"10px",
                          borderRadius: "10px",
                          transition: "0.5s",
                          color: "black",
                          backgroundColor: "#E0E0E0",
                          ":hover": {
                            color: "black",
                            backgroundColor: "#E0E0E0",
                          },
                        }
                      : {
                          padding:"10px",
                          borderRadius: "10px",
                          transition: "0.5s",
                          color: "black",
                          ":hover": {
                            color: "black",
                            backgroundColor: "#E0E0E0",
                          },
                        }
                      }   
                >
                  ESTOQUE
                </Box>
              </Link>

              <Link to="/reports/finances" style={{ textDecoration: "none" }}>
                <Box
                  sx={
                    titleSidebar == "/reports/finances"
                      ? {
                          padding:"10px",
                          borderRadius: "10px",
                          transition: "0.5s",
                          color: "black",
                          backgroundColor: "#E0E0E0",
                          ":hover": {
                            color: "black",
                            backgroundColor: "#E0E0E0",
                          },
                        }
                      : {
                          padding:"10px",
                          borderRadius: "10px",
                          transition: "0.5s",
                          color: "black",
                          ":hover": {
                            color: "black",
                            backgroundColor: "#E0E0E0",
                          },
                        }
                      }   
                >
                  FINANCEIRO
                </Box>
              </Link>
            </Box>
          </Box>

          <Box
            sx={{
              borderTop: "1px solid #B23F30",
              pt: "10px",
            }}
          >
            <Typography
              fontFamily="Poppins"
              variant="h6"
              sx={{ fontSize: "1rem" }}
            >
              {userInfos.nome}
            </Typography>
            <Typography
              fontFamily="Poppins"
              variant="h6"
              sx={{ fontSize: "0.8rem" }}
            >
              {userInfos.categoria_conta}
            </Typography>
          </Box>
        </Box>
      </Slide>

      {/* )} */}
    </div>
    // </Menu>
    // </ProSidebar>
  );
}

export default Sidebar;
