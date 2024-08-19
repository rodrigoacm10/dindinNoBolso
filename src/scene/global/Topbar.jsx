import { useContext, useState } from "react";
import { SidebarContext } from "../../context/sidebarContext";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// import { SidebarContext } from "../../barMargin.jsx";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Formik } from "formik";
import * as yup from "yup";
import { IoMdClose } from "react-icons/io";
import {
  addAddress,
  addBrand,
  addClient,
  addExpenseCategory,
  addFullProduct,
  addProduct,
  addRevenueCategory,
  addSale,
  addService,
  addStock,
  addSupplier,
  addType,
  exportFileData,
  newSupplier,
} from "../../services/APIService";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { Link } from "react-router-dom";
import { GiInfo } from "react-icons/gi";
import logo from "../../assets/logo-dindin.png";
import { IoIosMenu } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
import { IoBagOutline } from "react-icons/io5";
import { GrCart } from "react-icons/gr";
import { CiBoxes } from "react-icons/ci";
import FormProduct from "../../components/FormProduct";
import { useForm } from "react-hook-form";
import FormBrand from "../../components/FormBrand";
import FormSupplier from "../../components/FormSupplier";
import FormType from "../../components/FormType";
import FormAddStock from "../../components/FormAddStock";
import AddAttachment from "../../components/addAttachment";
import { useLocation } from "react-router-dom";
import ProductsInfos from "../../components/ProductsInfos";
import FormSale from "../../components/FormSale";
import SalesInfo from "../../components/SalesInfo";
import FormClient from "../../components/FormClient";
import SupplierInfos from "../../components/SupplierInfos";
import BuysInfo from "../../components/BuysInfo";
import ToImgBox from "../../components/ToImgBox";
import WarningReceived from "../../components/WarningRecived";
import { LiaNewspaperSolid } from "react-icons/lia";
// console.log

// Deseja adicionar
// ESTOQUE
// PRODUTO loading
const clientInitialValues = {
  name: "",
  contact: "",
  phone: "",
  email: "",
};

const productInitialValues = {
  name: "",
};

const serviceInitialValues = {
  name: "",
};

const categoryInitialValues = {
  typeCat: "revenue",
  name: "",
};

const checkoutCategorySchema = yup.object().shape({
  name: yup.string().required("preencha o campo"),
});

const checkoutProductSchema = yup.object().shape({
  name: yup.string().required("preencha o campo"),
});

const checkoutServiceSchema = yup.object().shape({
  name: yup.string().required("preencha o campo"),
});

const checkoutClientSchema = yup.object().shape({
  name: yup.string().required("preencha o campo"),
  // contact: yup.string().required("preencha o campo"),
  phone: yup.string().min(10, "número invalido").required("preencha o campo"),
  email: yup.string().email("invalid email").required("required"),
});

const checkoutClientPhoneSchema = yup.object().shape({
  name: yup.string().required("preencha o campo"),
  // contact: yup.string().required("preencha o campo"),
  phone: yup.string().min(10, "número invalido").required("preencha o campo"),
});

const checkoutClientEmailSchema = yup.object().shape({
  name: yup.string().required("preencha o campo"),
  // contact: yup.string().required("preencha o campo"),
  email: yup.string().email("invalid email").required("required"),
});

function ItemNav({
  linkTo,
  title,
  textDescription,
  iconButton,
  titleSidebar,
  setTitleSidebar,
  openMenu,
  setSidebarVisible,
  sidebarVisible,
  activaded = true,
}) {
  const isLittleHeight = useMediaQuery("(max-height:725px)");
  // handleAddStockSubmit
  return (
    // <MenuItem>
    <Box>
      {activaded ? (
        <Link to={`${linkTo}`} style={{ textDecoration: "none" }}>
          <Box
            display="flex"
            alignItems="center"
            pl="30px"
            p="20px"
            gap="20px"
            fontSize="18px"
            borderRadius="9px"
            width="225px"
            // pl="30px"
            // p={`${isLittleHeight ? '15px' : "20px"}`}
            // gap="20px"
            // fontSize={`${isLittleHeight ? '16' : "18px"}`}
            // borderRadius="9px"
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
                    color: "#7A7A7A",
                    ":hover": {
                      color: "black",
                      backgroundColor: "#E0E0E0",
                    },
                  }
            }
            onClick={() => {
              setTitleSidebar(`${title}`);
              setSidebarVisible(!sidebarVisible);
              // setSidebarVisible(!sidebarVisible)
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
          p="20px"
          gap="20px"
          fontSize="18px"
          borderRadius="9px"
          width="225px"
          sx={
            // titleSidebar == `${title}`
            // ?
            // {
            //     transition: "0.5s",
            //     color: "black",
            //     backgroundColor: "#E0E0E0",
            //     // ":hover": {
            //     //   color: "black",
            //       // backgroundColor: "#E0E0E0",
            //     // },
            //   }
            // :
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
            // console.log(" invalid button");
            // console.log(title);

            setTitleSidebar();
          }}
        >
          {iconButton}
          {openMenu && <Box>{textDescription}</Box>}
        </Box>
      )}
    </Box>

    // </MenuItem>
  );
}

// ADICIONAR
function Topbar() {
  // const {toggleOpenPopUp, openPopUp, siderbarWid, toggleSidebarWid } = useContext(SidebarContext);

  const location = useLocation();
  const locationPath = location.pathname.split("/")[1];
  console.log(location.pathname, locationPath);

  const { toggleOpenPopUp, attData, attDataFunc } = useContext(SidebarContext);
  const { siderbarWid, toggleSidebarWid } = useContext(SidebarContext);
  const marginStyle = {
    marginLeft: `${siderbarWid}px`,
  };
  // const [clientVisible, setClientVisible] = useState(0);
  // const [productVisible, setProductVisible] = useState(0);
  // const [serviceVisible, setServiceVisible] = useState(0);
  // const [categoryVisible, setCategoryVisible] = useState(0);

  const {
    clientVisible,
    setClientVisible,
    productVisible,
    setProductVisible,
    serviceVisible,
    setServiceVisible,
    categoryVisible,
    setCategoryVisible,
    setBrandVisible,
    brandVisible,
    supplierVisible,
    setSupplierVisible,
    formTypeVisible,
    setFormTypeVisible,
    toOther,
    setToOther,
    addStockVisible,
    setAddStockVisible,
    productsInfosVisible,
    setProductsInfosVisible,
    saleVisible,
    setSaleVisible,
    setSalesInfosVisible,
    salesInfosVisible,
    supplierInfosVisible,
    setSupplierInfosVisible,
    setBuysInfosVisible,
    buysInfosVisible,
    toImgVisible,
    setToImgVisible,
    addImgBox,
    setAddImgBox,
    image,
    setImage,
    fileInfos,
    setFileInfos,
    checkRec,
    setCheckRec,
    receiveVisible,
    setReceiveVisible,
    typeWarning,
    setTypeWarning,
    catsRevArr,
    catsExpArr,
    clientsArr,
    productsArr,
    servicesArr,
    supplierArr,
    brandArr,
    typeArr,
    repeatNameErr,
    setRepeatNameErr,
    isConcluded,
    setIsConcluded,
    saleErr,
    setSaleErr,

    loading,
    setLoading,
  } = useContext(SidebarContext);

  // const [loading, setLoading] = useState(false);
  // const [isConcluded, setIsConcluded] = useState(false);

  const [isWhatsappYes, setIsWhatsappYes] = useState(false);
  const [isWhatsappNo, setIsWhatsappNo] = useState(false);
  const [contactType, setContactType] = useState("phoneAndEmail");

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const [titleSidebar, setTitleSidebar] = useState("initialPage");
  const [openMenu, setOpenMenu] = useState(true);
  // const [openMenu, setOpenMenu] = useState(true);

  const [addMovInfos, setAddMovInfos] = useState(false);

  const [confirmVisible, setConfirmVisible] = useState(false);

  const noSidebar = useMediaQuery("(max-width:975px)");
  const noItensTop = useMediaQuery("(max-width:750px)");
  const mobileView = useMediaQuery("(max-width:650px)");

  const [showProductSidebar, setShowProductSidebar] = useState(false);
  const [showReportSidebar, setShowReportSidebar] = useState(false);

  let widthAddInfo = {};

  if (mobileView) {
    widthAddInfo = { width: "400px" };
  }

  const formMethods = useForm();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = formMethods;

  const onSubmitReact = (values) => {
    // values.preventDefault();

    console.log(values);
  };

  const schemaClient = () => {
    if (contactType == "phoneAndEmail") {
      return checkoutClientSchema;
    } else if (contactType == "phone") {
      return checkoutClientPhoneSchema;
    } else if (contactType == "email") {
      return checkoutClientEmailSchema;
    }
  };

  const handleClientSubmit = async (values) => {
    console.log(values);

    // console.log(values);
    setLoading(true);
    setIsConcluded(false);

    if (!!clientsArr.find((e) => e.nome == values.name)) {
      setLoading(false);

      setRepeatNameErr(true);
      return;
    }

    const response = await addClient(
      values.name,
      values.phone,
      values.email,
      isWhatsappNo
    );
    setRepeatNameErr(false);
    if (response) {
      setIsConcluded(true);
    }
    setLoading(false);
    // console.log(response);

    setTimeout(function () {
      setClientVisible(0);
      setIsConcluded(false);
    }, 1000);
    attDataFunc();
  };

  const handleProductSubmit = async (values) => {
    console.log(values);
    setLoading(true);
    setIsConcluded(false);

    // console.log(productsArr);

    if (!!productsArr.find((e) => e.nome == values.name)) {
      setLoading(false);

      setRepeatNameErr(true);
      return;
    }

    // const response = await addProduct(values.name);
    const response = await addFullProduct(values);
    setRepeatNameErr(false);
    setLoading(false);
    if (response) {
      setIsConcluded(true);
    }
    // console.log(response);
    setTimeout(function () {
      setProductVisible(0);
      setIsConcluded(false);
    }, 1000);
    attDataFunc();
  };

  const handleServiceSubmit = async (values) => {
    // console.log(values);
    setLoading(true);
    setIsConcluded(false);

    if (!!servicesArr.find((e) => e.nome == values.name)) {
      setLoading(false);

      setRepeatNameErr(true);
      return;
    }

    const response = await addService(values.name);
    setRepeatNameErr(false);

    setLoading(false);
    if (response) {
      setIsConcluded(true);
    }

    // console.log(response);
    setTimeout(function () {
      setServiceVisible(0);
      setIsConcluded(false);
    }, 1000);

    attDataFunc();
  };

  const handleCategorySubmit = async (values) => {
    // console.log(values);

    if (values.typeCat == "revenue") {
      setLoading(true);
      // setIsConcluded(true);
      setIsConcluded(false);

      if (!!catsRevArr.find((e) => e.nome == values.name)) {
        setLoading(false);

        setRepeatNameErr(true);
        return;
      }

      const response = await addRevenueCategory(values.name);

      setRepeatNameErr(false);

      if (response) {
        setIsConcluded(true);
      }

      setLoading(false);

      // setIsConcluded(false);
      // setIsConcluded(true);
      // await setTimeout(() => {
      console.log("aaaaaaaaaaa");
      // }, 4000);
      // setIsConcluded(false);

      // console.log(response);
      setTimeout(function () {
        setCategoryVisible(0);
      }, 1000);
      attDataFunc();
      setIsConcluded(false);

      // if (response) {
      //   concluded();
      // }
    } else if (values.typeCat == "expense") {
      setLoading(true);
      setIsConcluded(false);

      if (!!catsExpArr.find((e) => e.nome == values.name)) {
        setLoading(false);

        setRepeatNameErr(true);
        return;
      }

      const response = await addExpenseCategory(values.name);
      setRepeatNameErr(false);

      setLoading(false);
      if (response) {
        setIsConcluded(true);
      }
      setTimeout(function () {
        setCategoryVisible(0);
        setIsConcluded(false);
      }, 1000);
      attDataFunc();
      // if (response) {
      //   concluded();
      // }
    }
  };
  // MARCA

  // addType
  // addFullProduct
  // addSupplier
  // addAddress

  const handleBrandSubmit = async (values) => {
    console.log(values);

    setLoading(true);
    setIsConcluded(false);

    if (!!brandArr.find((e) => e.nome == values.name)) {
      setLoading(false);

      setRepeatNameErr(true);
      return;
    }

    const createBrand = await addBrand(values.name);
    setRepeatNameErr(false);

    console.log(createBrand);
    setLoading(false);
    if (createBrand) {
      setIsConcluded(true);
    }

    if (toOther) {
      setBrandVisible(0);
      setProductVisible(1);
      setToOther(0);
    }

    setTimeout(function () {
      setBrandVisible(0);
      setIsConcluded(false);
    }, 1000);
    attDataFunc();
  };

  const handleSupplierSubmit = async (values) => {
    console.log(values);

    setLoading(true);
    setIsConcluded(false);

    console.log(
      supplierArr.find((e) => e.nome == values.name),
      values.name
    );

    if (!!supplierArr.find((e) => e.nome_contato == values.name)) {
      setLoading(false);

      setRepeatNameErr(true);
      return;
    }

    const createSuplier = await addSupplier(values);
    const createAddress = await addAddress(
      createSuplier.data.fornecedor_id,
      values
    );
    setLoading(false);
    setRepeatNameErr(false);

    console.log("supplier", createSuplier);
    console.log("address", createAddress);

    if (createSuplier) {
      setIsConcluded(true);
    }

    if (toOther) {
      setSupplierVisible(0);
      setProductVisible(1);
      setToOther(0);
    }

    setTimeout(function () {
      setSupplierVisible(0);
      setIsConcluded(false);
    }, 1000);

    attDataFunc();
  };

  const handleFormTypeSubmit = async (values) => {
    setLoading(true);
    setIsConcluded(false);

    console.log(values, "aa");

    if (!!typeArr.find((e) => e.nome == values.name)) {
      setLoading(false);

      setRepeatNameErr(true);
      return;
    }
    const createType = await addType(values.name);

    setRepeatNameErr(false);

    console.log(createType);
    setLoading(false);
    if (createType) {
      setIsConcluded(true);
    }

    if (toOther) {
      setFormTypeVisible(0);
      setProductVisible(1);
      setToOther(0);
    }

    setTimeout(function () {
      setFormTypeVisible(0);
      setIsConcluded(false);
    }, 1000);

    attDataFunc();
  };

  const handleAddStockSubmit = async (values) => {
    console.log(values);
    console.log("img", image);
    console.log("file", fileInfos);
    setLoading(true);
    setIsConcluded(false);

    const formData = new FormData();
    formData.append("file", image);

    const reponseFile = await exportFileData(formData);
    console.log(reponseFile);
    console.log(reponseFile.file);

    const stock = await addStock(values, reponseFile.file, checkRec);
    console.log(stock);
    setLoading(false);
    if (stock) {
      setIsConcluded(true);
    }

    // const reponseFile = await exportFileData(formData);
    setTimeout(function () {
      setImage(false);
      setAddStockVisible(0);
      setIsConcluded(false);
    }, 1000);

    attDataFunc();
  };

  const handleAddSaleSubmit = async (values) => {
    console.log(values);
    console.log("img", image);
    console.log("file", fileInfos);
    setLoading(true);
    setIsConcluded(false);

    const formData = new FormData();
    formData.append("file", image);

    const reponseFile = await exportFileData(formData);
    console.log(reponseFile);
    console.log(reponseFile.file);

    // const stock = await addStock(values, reponseFile.file, checkRec);
    // console.log(stock);
    const createSale = await addSale(values, reponseFile.file, checkRec);
    console.log("aasd", createSale);
    setLoading(false);
    // setIsConcluded(true);
    // setSaleErr(false);

    // if (!createSale) {
    //   setSaleErr(true);
    //   return;
    // }
    if (createSale) {
      setIsConcluded(true);
      setSaleErr(false);
    } else if (createSale) {
      setSaleErr(true);
      return;
    }

    // const reponseFile = await exportFileData(formData);
    setTimeout(function () {
      setImage(false);
      setSaleVisible(0);
      setIsConcluded(false);
    }, 1000);

    attDataFunc();
  };

  const typeCategory = [
    {
      optionValue: "revenue",
      optionText: "receita",
    },
    {
      optionValue: "expense",
      optionText: "despesa",
    },
  ];

  return (
    <div
      style={noSidebar ? {} : marginStyle}
      className="top-bar animationStartTop"
    >
      <Box
        display="grid"
        gridTemplateColumns="1fr  99fr"
        gap={noItensTop ? "10px" : ""}
      >
        {/* <Box></Box> */}
        {noItensTop && (
          <Box display="flex">
            {locationPath == "sales" ||
            locationPath == "products" ||
            locationPath == "buys" ||
            locationPath == "finance" ||
            locationPath == "sales" ||
            locationPath == "buys" ? (
              <Button
                onClick={(e) => setAddMovInfos(!addMovInfos)}
                variant="contained"
                fullWidth
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  fontFamily: "Poppins",
                  textTransform: "none",
                  background: "#B23F30",
                  ":hover": {
                    backgroundColor: "#8b3226",
                  },
                }}
              >
                <AddIcon style={{ width: "20px", height: "20px" }} /> Opções
                {/* detalhes movimento */}
              </Button>
            ) : (
              ""
            )}
          </Box>
        )}

        <Box
          display="flex"
          alignItems="center"
          justifyContent={`${noItensTop ? "end" : "start"}`}
        >
          {!noItensTop && noSidebar && (
            <Button
              sx={{
                color: "#aaa",
              }}
              onClick={(e) => setSidebarVisible(!sidebarVisible)}
            >
              <IoIosMenu style={{ width: "30px", height: "30px" }} />
            </Button>
          )}

          {noItensTop && (
            <Button
              sx={{
                color: "#aaa",
              }}
              onClick={(e) => setSidebarVisible(!sidebarVisible)}
            >
              <IoIosMenu style={{ width: "30px", height: "30px" }} />
            </Button>
          )}
        </Box>

        {noItensTop ? (
          ""
        ) : (
          <Box display="flex" gap="5px">
            {locationPath == "sales" && (
              <Button
                onClick={() => {
                  setSaleVisible(1);
                  setIsConcluded(false);
                  setImage(false);
                }}
                variant="contained"
                fullWidth
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  fontFamily: "Poppins",
                  background: "#B23F30",
                  ":hover": {
                    backgroundColor: "#8b3226",
                  },
                }}
              >
                <AddIcon style={{ width: "20px", height: "20px" }} /> VENDAS
              </Button>
            )}
            {locationPath == "products" || locationPath == "buys" ? (
              <Button
                onClick={() => {
                  setAddStockVisible(1);
                  setIsConcluded(false);
                  setImage(false);
                }}
                variant="contained"
                fullWidth
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  fontFamily: "Poppins",
                  background: "#B23F30",
                  ":hover": {
                    backgroundColor: "#8b3226",
                  },
                }}
              >
                <AddIcon style={{ width: "20px", height: "20px" }} /> ESTOQUE
              </Button>
            ) : (
              ""
            )}
            {locationPath == "products" ||
            locationPath == "finance" ||
            locationPath == "sales" ||
            locationPath == "buys" ? (
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  setProductVisible(1);
                  setIsConcluded(false);
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  fontFamily: "Poppins",
                  background: "#B23F30",
                  ":hover": {
                    backgroundColor: "#8b3226",
                  },
                }}
              >
                {/* -/ */}
                <AddIcon style={{ width: "20px", height: "20px" }} /> Produto
              </Button>
            ) : (
              ""
            )}

            {locationPath == "products" || locationPath == "buys" ? (
              <Button
                onClick={() => {
                  setSupplierVisible(1);
                  setIsConcluded(false);
                }}
                variant="contained"
                fullWidth
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  fontFamily: "Poppins",
                  background: "#B23F30",
                  ":hover": {
                    backgroundColor: "#8b3226",
                  },
                }}
              >
                <AddIcon style={{ width: "20px", height: "20px" }} /> fornecedor
              </Button>
            ) : (
              ""
            )}
            {locationPath == "products" ? (
              <Button
                onClick={() => {
                  setBrandVisible(1);
                  setIsConcluded(false);
                }}
                variant="contained"
                fullWidth
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  fontFamily: "Poppins",
                  background: "#B23F30",
                  ":hover": {
                    backgroundColor: "#8b3226",
                  },
                }}
              >
                <AddIcon style={{ width: "20px", height: "20px" }} /> MARCA
              </Button>
            ) : (
              ""
            )}
            {locationPath == "products" ? (
              <Button
                onClick={() => {
                  setFormTypeVisible(1);
                  setIsConcluded(false);
                }}
                variant="contained"
                fullWidth
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  fontFamily: "Poppins",
                  background: "#B23F30",
                  ":hover": {
                    backgroundColor: "#8b3226",
                  },
                }}
              >
                <AddIcon style={{ width: "20px", height: "20px" }} /> TIPO
              </Button>
            ) : (
              ""
            )}
            {locationPath == "finance" || locationPath == "sales" ? (
              <Button
                onClick={() => {
                  setClientVisible(1);
                  setIsConcluded(false);
                }}
                variant="contained"
                fullWidth
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  fontFamily: "Poppins",
                  background: "#B23F30",
                  ":hover": {
                    backgroundColor: "#8b3226",
                  },
                }}
              >
                {/* -/ */}
                <AddIcon style={{ width: "20px", height: "20px" }} /> Cliente
              </Button>
            ) : (
              ""
            )}
            {locationPath == "finance" && (
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  setIsConcluded(false);
                  setServiceVisible(1);
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  fontFamily: "Poppins",
                  background: "#B23F30",
                  ":hover": {
                    backgroundColor: "#8b3226",
                  },
                }}
              >
                {/* -/ */}
                <AddIcon style={{ width: "20px", height: "20px" }} /> serviço
              </Button>
            )}
            {locationPath == "finance" && (
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  setIsConcluded(false);
                  setCategoryVisible(1);
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  fontFamily: "Poppins",
                  background: "#B23F30",
                  ":hover": {
                    backgroundColor: "#8b3226",
                  },
                }}
              >
                {/* -/ */}
                <AddIcon style={{ width: "20px", height: "20px" }} /> Categoria
              </Button>
            )}
          </Box>
        )}
      </Box>

      {clientVisible ? (
        <FormClient
          handleClientSubmit={handleClientSubmit}
          setClientVisible={setClientVisible}
          setIsConcluded={setIsConcluded}
          clientVisible={clientVisible}
          isConcluded={isConcluded}
          setIsWhatsappNo={setIsWhatsappNo}
          isWhatsappYes={isWhatsappYes}
          loading={loading}
        />
      ) : (
        ""
      )}

      {productVisible ? (
        <FormProduct
          checkoutProductSchema={checkoutProductSchema}
          productInitialValues={productInitialValues}
          handleProductSubmit={handleProductSubmit}
          setProductVisible={setProductVisible}
          setIsConcluded={setIsConcluded}
          productVisible={productVisible}
          isConcluded={isConcluded}
          register={register}
          error={errors.name}
          loading={loading}
        />
      ) : (
        ""
      )}

      {supplierVisible ? (
        <FormSupplier
          handleSupplierSubmit={handleSupplierSubmit}
          setSupplierVisible={setSupplierVisible}
          setIsConcluded={setIsConcluded}
          supplierVisible={supplierVisible}
          isConcluded={isConcluded}
          loading={loading}
        />
      ) : (
        ""
      )}

      {brandVisible ? (
        <FormBrand
          handleBrandSubmit={handleBrandSubmit}
          setBrandVisible={setBrandVisible}
          setIsConcluded={setIsConcluded}
          brandVisible={brandVisible}
          isConcluded={isConcluded}
          loading={loading}
        />
      ) : (
        ""
      )}

      {formTypeVisible ? (
        <FormType
          handleFormTypeSubmit={handleFormTypeSubmit}
          setFormTypeVisible={setFormTypeVisible}
          setIsConcluded={setIsConcluded}
          formTypeVisible={formTypeVisible}
          isConcluded={isConcluded}
          loading={loading}
        />
      ) : (
        ""
      )}

      {addStockVisible ? (
        <FormAddStock
          handleAddStockSubmit={handleAddStockSubmit}
          setAddStockVisible={setAddStockVisible}
          setIsConcluded={setIsConcluded}
          addStockVisible={addStockVisible}
          isConcluded={isConcluded}
          loading={loading}
        />
      ) : (
        ""
      )}

      {productsInfosVisible ? (
        <ProductsInfos
          setProductsInfosVisible={setProductsInfosVisible}
          setIsConcluded={setIsConcluded}
          productsInfosVisible={productsInfosVisible}
          isConcluded={isConcluded}
        />
      ) : (
        ""
      )}

      {supplierInfosVisible ? (
        <SupplierInfos
          setSupplierInfosVisible={setSupplierInfosVisible}
          supplierInfosVisible={supplierInfosVisible}
          setIsConcluded={setIsConcluded}
          isConcluded={isConcluded}
        />
      ) : (
        ""
      )}

      {buysInfosVisible ? (
        <BuysInfo
          setBuysInfosVisible={setBuysInfosVisible}
          setIsConcluded={setIsConcluded}
          buysInfosVisible={buysInfosVisible}
          isConcluded={isConcluded}
        />
      ) : (
        ""
      )}

      {saleVisible ? (
        <FormSale
          saleVisible={saleVisible}
          setSaleVisible={setSaleVisible}
          setIsConcluded={setIsConcluded}
          isConcluded={isConcluded}
          handleAddSaleSubmit={handleAddSaleSubmit}
          loading={loading}
        />
      ) : (
        ""
      )}

      {salesInfosVisible ? (
        <SalesInfo
          setSalesInfosVisible={setSalesInfosVisible}
          setIsConcluded={setIsConcluded}
          salesInfosVisible={salesInfosVisible}
          isConcluded={isConcluded}
        />
      ) : (
        ""
      )}

      <ToImgBox toImgVisible={toImgVisible} setToImgVisible={setToImgVisible} />

      <WarningReceived
        type={typeWarning}
        receiveVisible={receiveVisible}
        setReceiveVisible={setReceiveVisible}
      />

      <Box
        top="0"
        left="0"
        position="fixed"
        height="100vh"
        backgroundColor="rgba(0, 0, 0, 0.5)"
        width="100%"
        zIndex="100"
        transition="all 0.5s"
        sx={{
          visibility: `${serviceVisible == 0 ? "hidden" : "none"}`,
        }}
        className={`${serviceVisible == 0 ? "" : "animationOpacity"}`}
      >
        <Box
          className="centralized"
          transition="all 0.5s"
          backgroundColor="#7A7A7A"
          borderRadius="9px"
          zIndex="101"
          p="10px 10px"
          sx={{
            width: "calc(100vw - 50%)",
            maxWidth: "400px",
            margin: "0 auto",
            padding: "10px",
            "@media (max-width: 768px)": {
              width: "calc(100vw - 20%)",
              maxWidth: "400px",
            },
            "@media (max-width: 480px)": {
              width: "calc(100vw - 10%)",
              maxWidth: "400px",
              padding: "1px",
            },
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="end">
            <Button
              sx={{ color: "black" }}
              onClick={(e) => {
                setServiceVisible(0);
                setRepeatNameErr(false);
                setIsConcluded(false);
              }}
            >
              <IoMdClose style={{ height: "28px", width: "28px" }} />
            </Button>
          </Box>
          <Box textAlign="center" p="40px">
            <h1 className="text-2xl sm:text-3xl font-bold">
              Deseja adicionar{" "}
            </h1>
            <h1 className="text-2xl sm:text-3xl font-bold">um novo Serviço?</h1>
            <Typography textAlign="center" pt="15px" fontFamily="Poppins">
              {" "}
              preencha as informações abaixo
            </Typography>
            <Box>
              <Formik
                validationSchema={checkoutServiceSchema}
                initialValues={serviceInitialValues}
                onSubmit={handleServiceSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box
                      pt="30px"
                      display="flex"
                      flexDirection="column"
                      gap="20px"
                    >
                      <TextField
                        type="text"
                        label="Nome"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        name="name"
                        sx={{
                          bgcolor: "#F3E2E0",
                          borderRadius: "4px",
                          "& .MuiFormLabel-root": {
                            backgroundColor: "#F3E2E0",
                            borderRadius: "4px",
                            pr: "10px",
                            pl: "10px",
                            color: "black",
                          },
                        }}
                        error={!!touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                      />
                    </Box>
                    <Box pt="20px">
                      {repeatNameErr && (
                        <p
                          className="animationStartBottom"
                          style={{
                            color: "#B23F30",
                          }}
                        >
                          nome já existente
                        </p>
                      )}
                      {isConcluded && (
                        <p
                          className="animationStartBottom"
                          style={{
                            color: "#B23F30",
                          }}
                        >
                          Adicionado!
                        </p>
                      )}
                      <Button
                        type="submit"
                        disabled={loading}
                        fullWidth
                        variant="contained"
                        sx={{
                          p: "13.5px 11px ",
                          textTransform: "none",
                          display: "block",
                          backgroundColor: "#B23F30",
                          ":hover": {
                            backgroundColor: "#8b3226",
                          },
                          ":disabled": {
                            backgroundColor: "#8b3226",
                          },
                        }}
                      >
                        {loading ? (
                          <CircularProgress
                            size="24px"
                            style={{ color: "#ffffff" }}
                          />
                        ) : (
                          "ADICIONAR"
                        )}
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        top="0"
        left="0"
        position="fixed"
        height="100vh"
        backgroundColor="rgba(0, 0, 0, 0.5)"
        width="100%"
        zIndex="100"
        transition="all 0.5s"
        sx={{
          visibility: `${categoryVisible == 0 ? "hidden" : "none"}`,
        }}
        className={`${categoryVisible == 0 ? "" : "animationOpacity"}`}
      >
        <Box
          className="centralized"
          transition="all 0.5s"
          backgroundColor="#7A7A7A"
          borderRadius="9px"
          zIndex="101"
          p="10px 10px"
          // width={`${"400px"}`}
          // sx={widthAddInfo}
          sx={{
            width: "calc(100vw - 50%)",
            maxWidth: "400px",
            margin: "0 auto",
            padding: "10px",
            "@media (max-width: 768px)": {
              width: "calc(100vw - 20%)",
              maxWidth: "400px",
            },
            "@media (max-width: 480px)": {
              width: "calc(100vw - 10%)",
              maxWidth: "400px",
              padding: "1px",
            },
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="end">
            <Button
              sx={{ color: "black" }}
              onClick={(e) => {
                // console.log(e.target.style.color);
                setCategoryVisible(0);
                setRepeatNameErr(false);
                setIsConcluded(false);
              }}
            >
              <IoMdClose style={{ height: "28px", width: "28px" }} />
            </Button>
          </Box>
          <Box textAlign="center" p="40px">
            <h1 className="text-2xl sm:text-3xl font-bold">
              Deseja adicionar{" "}
            </h1>
            <h1 className="text-2xl sm:text-3xl font-bold">
              uma nova categoria?
            </h1>
            <Typography textAlign="center" pt="15px" fontFamily="Poppins">
              {" "}
              preencha as informações abaixo
            </Typography>
            <Box>
              <Formik
                validationSchema={checkoutCategorySchema}
                initialValues={categoryInitialValues}
                onSubmit={handleCategorySubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box
                      pt="30px"
                      display="flex"
                      flexDirection="column"
                      gap="20px"
                      // sx={{
                      //   transition: "0.5s",
                      // }}
                    >
                      <TextField
                        fullWidth
                        select
                        sx={{
                          bgcolor: "#F3E2E0",
                          borderRadius: "4px",
                          "& .MuiFormLabel-root": {
                            // borderTop: "none",
                            backgroundColor: "#F3E2E0",
                            borderRadius: "4px",
                            pr: "10px",
                            pl: "10px",
                            color: "black",
                            fontFamily: "Poppins",
                            // fontWeight: 700,
                            "& .MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                              {
                                fontFamily: "Poppins",
                                fontWeight: 700,
                              },
                          },
                        }}
                        onChange={handleChange}
                        value={values.typeCat}
                        name="typeCat"
                        label="Tipo de Categoria"
                        defaultValue="revenue"
                        color={
                          !!touched.typeCat && !!errors.typeCat ? "warning" : ""
                        }
                        focused={
                          !!touched.typeCat && !!errors.typeCat ? true : false
                        }
                      >
                        {typeCategory.map((option, i) => (
                          <MenuItem
                            sx={{ fontFamily: "Poppins", fontWeight: 700 }}
                            key={i}
                            value={option.optionValue}
                          >
                            {option.optionText}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        type="text"
                        label="Nome"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        name="name"
                        sx={{
                          bgcolor: "#F3E2E0",
                          borderRadius: "4px",
                          "& .MuiFormLabel-root": {
                            backgroundColor: "#F3E2E0",
                            borderRadius: "4px",
                            pr: "10px",
                            pl: "10px",
                            color: "black",
                          },
                        }}
                        error={!!touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                      />
                    </Box>
                    <Box pt="20px">
                      {/* {concluded ?} */}
                      {repeatNameErr && (
                        <p
                          className="animationStartBottom"
                          style={{
                            color: "#B23F30",
                          }}
                        >
                          nome já existente
                        </p>
                      )}
                      {isConcluded && (
                        <p
                          className="animationStartBottom"
                          style={{
                            color: "#B23F30",
                          }}
                        >
                          Adicionado!
                        </p>
                      )}
                      <Button
                        type="submit"
                        disabled={loading}
                        fullWidth
                        variant="contained"
                        sx={{
                          p: "13.5px 11px ",
                          textTransform: "none",
                          display: "block",
                          backgroundColor: "#B23F30",
                          ":hover": {
                            backgroundColor: "#8b3226",
                          },
                          ":disabled": {
                            backgroundColor: "#8b3226",
                          },
                        }}
                      >
                        {loading ? (
                          <CircularProgress
                            size="24px"
                            style={{ color: "#ffffff" }}
                          />
                        ) : (
                          "ADICIONAR"
                        )}
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        top="0"
        left="0"
        position="fixed"
        height="100vh"
        backgroundColor="rgba(0, 0, 0, 0.5)"
        width="100vw"
        zIndex="100"
        transition="all 0.5s"
        sx={{
          // visibility: `${!sidebarVisible ? "hidden" : "none"}`,
          opacity: `${!sidebarVisible ? "0" : "1"}`,
          pointerEvents: `${!sidebarVisible ? "none" : "1"}`,
        }}
        className={`${
          !sidebarVisible ? "animationOpacityOut" : "animationOpacity"
        }`}
        // display={}
      >
        <Box
          top="0"
          left="0"
          position="fixed"
          // className="centralized"
          transition="all 0.5s"
          backgroundColor="#ffffff"
          // borderRadius="9px"
          zIndex="150"
          p="10px 10px"
          width="100vw"
          height="100vh"
        >
          <Box display="flex" justifyContent="end">
            <Button
              onClick={(e) => setSidebarVisible(!sidebarVisible)}
              sx={{ color: "black" }}
            >
              <IoMdClose style={{ height: "28px", width: "28px" }} />
            </Button>
          </Box>
          <Box
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <ItemNav
              linkTo="/initialPage"
              title="start"
              textDescription="INÍCIO"
              titleSidebar={titleSidebar}
              setTitleSidebar={setTitleSidebar}
              openMenu={openMenu}
              iconButton={<FaHome style={{ width: "20px", height: "20px" }} />}
              setSidebarVisible={setSidebarVisible}
              sidebarVisible={sidebarVisible}
            />
            {/* Financeiro */}
            <ItemNav
              linkTo="/finance"
              title="finance"
              textDescription="FINANCEIRO"
              titleSidebar={titleSidebar}
              setTitleSidebar={setTitleSidebar}
              openMenu={openMenu}
              iconButton={
                <BsCashCoin style={{ width: "20px", height: "20px" }} />
              }
              setSidebarVisible={setSidebarVisible}
              sidebarVisible={sidebarVisible}
            />

            {/* Produtos = estoque e compras */}

            <Box
              display="flex"
              alignItems="center"
              pl="30px"
              p="20px"
              gap="20px"
              fontSize="18px"
              borderRadius="9px"
              width="225px"
              sx={{
                transition: "0.5s",
                color: "#7A7A7A",
                ":hover": {
                  color: "black",
                  backgroundColor: "#E0E0E0",
                },
              }}
              onClick={(e) => setShowProductSidebar(!showProductSidebar)}
            >
              <GrCart style={{ width: "20px", height: "20px" }} />
              PRODUTOS
            </Box>

            {/* open products */}

            {showProductSidebar && (
              <Box
                top="0"
                left="0"
                position="fixed"
                transition="all 0.5s"
                backgroundColor="#ffffff"
                zIndex="150"
                p="10px 10px"
                width="100vw"
                height="100vh"
              >
                <Box display="flex" justifyContent="end">
                  <Button
                    onClick={(e) => setShowProductSidebar(!showProductSidebar)}
                    sx={{ color: "black" }}
                  >
                    <IoMdClose style={{ height: "28px", width: "28px" }} />
                  </Button>
                </Box>
                <Box
                  height="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                >
                  <Box
                    display="flex"
                    padding="15px"
                    gap="20px"
                    fontSize="18px"
                    borderBottom="1px solid black"
                  >
                    <GrCart style={{ width: "20px", height: "20px" }} />
                    PRODUTOS
                  </Box>

                  <Link to="/products" style={{ textDecoration: "none" }}>
                    <Box
                      marginTop="20px"
                      display="flex"
                      padding="15px"
                      gap="20px"
                      fontSize="18px"
                      sx={{
                        borderRadius: "10px",
                        transition: "0.5s",
                        color: "black",
                        ":hover": {
                          backgroundColor: "#E0E0E0",
                        },
                      }}
                      onClick={() => {
                        setShowProductSidebar(!showProductSidebar);
                        setSidebarVisible(!sidebarVisible);
                      }}
                    >
                      ESTOQUE
                    </Box>
                  </Link>

                  <Link to="/buys" style={{ textDecoration: "none" }}>
                    <Box
                      display="flex"
                      padding="15px"
                      gap="20px"
                      fontSize="18px"
                      sx={{
                        borderRadius: "10px",
                        transition: "0.5s",
                        color: "black",
                        ":hover": {
                          backgroundColor: "#E0E0E0",
                        },
                      }}
                      onClick={() => {
                        setShowProductSidebar(!showProductSidebar);
                        setSidebarVisible(!sidebarVisible);
                      }}
                    >
                      COMPRAS
                    </Box>
                  </Link>
                </Box>
              </Box>
            )}
            {/* <ItemNav
              linkTo="/products"
              title={confirmVisible}
              textDescription="ESTOQUE"
              titleSidebar={titleSidebar}
              setTitleSidebar={setTitleSidebar}
              openMenu={openMenu}
              iconButton={<CiBoxes style={{ width: "20px", height: "20px" }} />}
              setSidebarVisible={setSidebarVisible}
              sidebarVisible={sidebarVisible}
            />

            <ItemNav
              linkTo="/buys"
              title="buys"
              textDescription="COMPRAS"
              titleSidebar={titleSidebar}
              setTitleSidebar={setTitleSidebar}
              openMenu={openMenu}
              iconButton={<GrCart style={{ width: "20px", height: "20px" }} />}
              setSidebarVisible={setSidebarVisible}
              sidebarVisible={sidebarVisible}
            />
             */}
            {/* Vendas */}
            <ItemNav
              linkTo="/sales"
              title="/sales"
              textDescription="VENDAS"
              titleSidebar={titleSidebar}
              setTitleSidebar={setTitleSidebar}
              openMenu={openMenu}
              iconButton={
                <IoBagOutline style={{ width: "20px", height: "20px" }} />
              }
              setSidebarVisible={setSidebarVisible}
              sidebarVisible={sidebarVisible}
            />

            {/* Relatórios = compras, estoque e dashboard */}

            <Box
              display="flex"
              alignItems="center"
              pl="30px"
              p="20px"
              gap="20px"
              fontSize="18px"
              borderRadius="9px"
              width="225px"
              sx={{
                transition: "0.5s",
                color: "#7A7A7A",
                ":hover": {
                  color: "black",
                  backgroundColor: "#E0E0E0",
                },
              }}
              onClick={(e) => setShowReportSidebar(!showReportSidebar)}
            >
              <LiaNewspaperSolid style={{ width: "24px", height: "24px" }} />
              RELATÓRIOS
            </Box>
            {/* open reports */}

            {showReportSidebar && (
              <Box
                top="0"
                left="0"
                position="fixed"
                transition="all 0.5s"
                backgroundColor="#ffffff"
                zIndex="150"
                p="10px 10px"
                width="100vw"
                height="100vh"
              >
                <Box display="flex" justifyContent="end">
                  <Button
                    onClick={(e) => setShowReportSidebar(!showReportSidebar)}
                    sx={{ color: "black" }}
                  >
                    <IoMdClose style={{ height: "28px", width: "28px" }} />
                  </Button>
                </Box>
                <Box
                  height="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                >
                  <Box
                    display="flex"
                    padding="15px"
                    gap="20px"
                    fontSize="18px"
                    borderBottom="1px solid black"
                  >
                    <LiaNewspaperSolid
                      style={{ width: "24px", height: "24px" }}
                    />
                    RELATÓRIOS
                  </Box>

                  <Link to="/reports/sales" style={{ textDecoration: "none" }}>
                    <Box
                      marginTop="20px"
                      display="flex"
                      padding="15px"
                      gap="20px"
                      fontSize="18px"
                      sx={{
                        borderRadius: "10px",
                        transition: "0.5s",
                        color: "black",
                        ":hover": {
                          backgroundColor: "#E0E0E0",
                        },
                      }}
                      onClick={() => {
                        setShowReportSidebar(!showReportSidebar);
                        setSidebarVisible(!sidebarVisible);
                      }}
                    >
                      VENDAS
                    </Box>
                  </Link>

                  <Link to="/reports/stock" style={{ textDecoration: "none" }}>
                    <Box
                      display="flex"
                      padding="15px"
                      gap="20px"
                      fontSize="18px"
                      sx={{
                        borderRadius: "10px",
                        transition: "0.5s",
                        color: "black",
                        ":hover": {
                          backgroundColor: "#E0E0E0",
                        },
                      }}
                      onClick={() => {
                        setShowReportSidebar(!showReportSidebar);
                        setSidebarVisible(!sidebarVisible);
                      }}
                    >
                      ESTOQUE
                    </Box>
                  </Link>

                  <Link
                    to="/reports/finances"
                    style={{ textDecoration: "none" }}
                  >
                    <Box
                      display="flex"
                      padding="15px"
                      gap="20px"
                      fontSize="18px"
                      sx={{
                        borderRadius: "10px",
                        transition: "0.5s",
                        color: "black",
                        ":hover": {
                          backgroundColor: "#E0E0E0",
                        },
                      }}
                      onClick={() => {
                        setShowReportSidebar(!showReportSidebar);
                        setSidebarVisible(!sidebarVisible);
                      }}
                    >
                      FINANCEIRO
                    </Box>
                  </Link>
                </Box>
              </Box>
            )}

            <ItemNav
              linkTo="/dashboard"
              title="dashboard"
              textDescription="DASHBOARD"
              titleSidebar={titleSidebar}
              setTitleSidebar={setTitleSidebar}
              openMenu={openMenu}
              iconButton={
                <MdOutlineDashboard style={{ width: "20px", height: "20px" }} />
              }
              setSidebarVisible={setSidebarVisible}
              sidebarVisible={sidebarVisible}
            />
            {/* <ItemNav
              linkTo="/QRcodeReader"
              title="QRcodeReader"
              textDescription="LEITOR QRcode"
              titleSidebar={confirmVisible}
              setTitleSidebar={toggleOpenPopUp}
              openMenu={openMenu}
              iconButton={
                <MdOutlineQrCodeScanner
                  style={{ width: "20px", height: "20px" }}
                />
              }
              setSidebarVisible={setSidebarVisible}
              sidebarVisible={sidebarVisible}
              activaded={false}
            /> */}
            <ItemNav
              linkTo="/perfil"
              title="profile"
              textDescription="MEU PERFIL"
              titleSidebar={titleSidebar}
              setTitleSidebar={setTitleSidebar}
              openMenu={openMenu}
              iconButton={
                <FaRegCircleUser style={{ width: "20px", height: "20px" }} />
              }
              setSidebarVisible={setSidebarVisible}
              sidebarVisible={sidebarVisible}
            />
            <ItemNav
              linkTo="/FAQ"
              title="FAQ"
              textDescription="FAQ"
              titleSidebar={titleSidebar}
              setTitleSidebar={setTitleSidebar}
              openMenu={openMenu}
              iconButton={<GiInfo style={{ width: "20px", height: "20px" }} />}
              setSidebarVisible={setSidebarVisible}
              sidebarVisible={sidebarVisible}
            />
          </Box>
        </Box>
      </Box>

      <Box
        top="0"
        left="0"
        position="fixed"
        height="100vh"
        backgroundColor="rgba(0, 0, 0, 0.5)"
        width="100vw"
        zIndex="100"
        transition="all 0.5s"
        sx={{
          // visibility: `${!sidebarVisible ? "hidden" : "none"}`,
          opacity: `${!addMovInfos ? "0" : "1"}`,
          pointerEvents: `${!addMovInfos ? "none" : "1"}`,
        }}
        className={`${
          !addMovInfos ? "animationOpacityOut" : "animationOpacity"
        }`}
        // display={}
      >
        <Box
          top="0"
          left="0"
          position="fixed"
          // className="centralized"
          transition="all 0.5s"
          backgroundColor="#ffffff"
          // borderRadius="9px"
          zIndex="150"
          p="10px 10px"
          width="100vw"
          height="100vh"
        >
          <Box display="flex" justifyContent="end">
            <Button
              onClick={(e) => setAddMovInfos(!addMovInfos)}
              sx={{ color: "black" }}
            >
              <IoMdClose style={{ height: "28px", width: "28px" }} />
            </Button>
          </Box>

          <Box
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            gap="15px"
          >
            {locationPath == "sales" && (
              <Button
                onClick={() => {
                  setSaleVisible(1);
                  setIsConcluded(false);
                  setImage(false);
                  setAddMovInfos(!addMovInfos);
                }}
                variant="contained"
                fullWidth
                sx={{
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  fontFamily: "Poppins",
                  background: "#B23F30",
                  ":hover": {
                    backgroundColor: "#8b3226",
                  },
                }}
              >
                <AddIcon style={{ width: "20px", height: "20px" }} /> VENDAS
              </Button>
            )}
            {locationPath == "products" || locationPath == "buys" ? (
              <Button
                onClick={() => {
                  setAddStockVisible(1);
                  setIsConcluded(false);
                  setImage(false);
                  setAddMovInfos(!addMovInfos);
                }}
                variant="contained"
                fullWidth
                sx={{
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  fontFamily: "Poppins",
                  background: "#B23F30",
                  ":hover": {
                    backgroundColor: "#8b3226",
                  },
                }}
              >
                <AddIcon style={{ width: "20px", height: "20px" }} /> ESTOQUE
              </Button>
            ) : (
              ""
            )}
            {locationPath == "products" ||
            locationPath == "finance" ||
            locationPath == "sales" ||
            locationPath == "buys" ? (
              <Button
                onClick={() => {
                  setProductVisible(1);
                  setIsConcluded(false);
                  setAddMovInfos(!addMovInfos);
                }}
                variant="contained"
                fullWidth
                sx={{
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  fontFamily: "Poppins",
                  background: "#B23F30",
                  ":hover": {
                    backgroundColor: "#8b3226",
                  },
                }}
              >
                {/* -/ */}
                <AddIcon style={{ width: "20px", height: "20px" }} /> Produto
              </Button>
            ) : (
              ""
            )}

            {locationPath == "products" || locationPath == "buys" ? (
              <Button
                onClick={() => {
                  setSupplierVisible(1);
                  setIsConcluded(false);
                  setAddMovInfos(!addMovInfos);
                }}
                variant="contained"
                fullWidth
                sx={{
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  fontFamily: "Poppins",
                  background: "#B23F30",
                  ":hover": {
                    backgroundColor: "#8b3226",
                  },
                }}
              >
                <AddIcon style={{ width: "20px", height: "20px" }} /> fornecedor
              </Button>
            ) : (
              ""
            )}
            {locationPath == "products" ? (
              <Button
                onClick={() => {
                  setBrandVisible(1);
                  setIsConcluded(false);
                  setAddMovInfos(!addMovInfos);
                }}
                variant="contained"
                fullWidth
                sx={{
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  fontFamily: "Poppins",
                  background: "#B23F30",
                  ":hover": {
                    backgroundColor: "#8b3226",
                  },
                }}
              >
                <AddIcon style={{ width: "20px", height: "20px" }} /> MARCA
              </Button>
            ) : (
              ""
            )}
            {locationPath == "products" ? (
              <Button
                onClick={() => {
                  setFormTypeVisible(1);
                  setIsConcluded(false);
                  setAddMovInfos(!addMovInfos);
                }}
                variant="contained"
                fullWidth
                sx={{
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  fontFamily: "Poppins",
                  background: "#B23F30",
                  ":hover": {
                    backgroundColor: "#8b3226",
                  },
                }}
              >
                <AddIcon style={{ width: "20px", height: "20px" }} /> TIPO
              </Button>
            ) : (
              ""
            )}
            {locationPath == "finance" || locationPath == "sales" ? (
              <Button
                onClick={() => {
                  setClientVisible(1);
                  setIsConcluded(false);
                  setAddMovInfos(!addMovInfos);
                }}
                variant="contained"
                fullWidth
                sx={{
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  fontFamily: "Poppins",
                  background: "#B23F30",
                  ":hover": {
                    backgroundColor: "#8b3226",
                  },
                }}
              >
                {/* -/ */}
                <AddIcon style={{ width: "20px", height: "20px" }} /> Cliente
              </Button>
            ) : (
              ""
            )}
            {locationPath == "finance" && (
              <Button
                onClick={() => {
                  setIsConcluded(false);
                  setServiceVisible(1);
                  setAddMovInfos(!addMovInfos);
                }}
                variant="contained"
                fullWidth
                sx={{
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  fontFamily: "Poppins",
                  background: "#B23F30",
                  ":hover": {
                    backgroundColor: "#8b3226",
                  },
                }}
              >
                {/* -/ */}
                <AddIcon style={{ width: "20px", height: "20px" }} /> serviço
              </Button>
            )}
            {locationPath == "finance" && (
              <Button
                onClick={() => {
                  setIsConcluded(false);
                  setCategoryVisible(1);
                  setAddMovInfos(!addMovInfos);
                }}
                variant="contained"
                fullWidth
                sx={{
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  fontFamily: "Poppins",
                  background: "#B23F30",
                  ":hover": {
                    backgroundColor: "#8b3226",
                  },
                }}
              >
                {/* -/ */}
                <AddIcon style={{ width: "20px", height: "20px" }} /> Categoria
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      <AddAttachment
        addImgBoxVisible={addImgBox}
        setAddImgBoxVisible={setAddImgBox}
        setImage={setImage}
        image={image}
        setFileInfos={setFileInfos}
      />
    </div>
  );
}

export default Topbar;
