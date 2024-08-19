import { createContext, useEffect, useState } from "react";
import {
  getExpenseCategorys,
  getRevenueCategorys,
} from "../services/APIService";

// console.log

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [siderbarWid, setSidebarWid] = useState(10);
  const [attData, setAttData] = useState(1);
  const [attFaq, setAttFaq] = useState(1);
  const [revenueCats, setRevenueCats] = useState(null);
  const [expenseCats, setExpenseCats] = useState(null);
  // const [catRevenue, setCatRevenue] = useState([]);
  // const [catExpense, setCatExpense] = useState([]);
  const [clients, setClients] = useState([]);
  // const [products, setProducts] = useState([]);
  // const [services, setServices] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);

  const [toOther, setToOther] = useState(0);
  const [addStockVisible, setAddStockVisible] = useState(0);
  const [supplierVisible, setSupplierVisible] = useState(0);
  const [formTypeVisible, setFormTypeVisible] = useState(0);
  const [brandVisible, setBrandVisible] = useState(0);
  const [clientVisible, setClientVisible] = useState(0);
  const [productVisible, setProductVisible] = useState(0);
  const [serviceVisible, setServiceVisible] = useState(0);
  const [categoryVisible, setCategoryVisible] = useState(0);
  const [productsInfosVisible, setProductsInfosVisible] = useState(0);
  const [valuesProduct, setValuesProduct] = useState({});
  const [supplierValues, setSupplierValues] = useState({});
  const [saleVisible, setSaleVisible] = useState(0);
  const [salesInfosVisible, setSalesInfosVisible] = useState(0);
  const [supplierInfosVisible, setSupplierInfosVisible] = useState(0);
  const [toImgVisible, setToImgVisible] = useState(0);
  const [receiveVisible, setReceiveVisible] = useState(0);
  const [editEntry, setEditEntry] = useState({});

  const [checkRec, setCheckRec] = useState(true);

  const [valuesBuy, setValuesBuy] = useState({});

  const [imgUrl, setImgUrl] = useState("");
  const [imgUrlProfile, setImgUrlProfile] = useState("");

  const [buysInfosVisible, setBuysInfosVisible] = useState(0);

  const [addImgBox, setAddImgBox] = useState(false);
  const [image, setImage] = useState(false);
  const [fileInfos, setFileInfos] = useState(false);

  const [movs, setMovs] = useState([]);
  const [catsRevArr, setCatsRev] = useState([]);
  const [catsExpArr, setCatsExpArr] = useState([]);
  const [clientsArr, setClientsArr] = useState([]);
  const [productsArr, setProductsArr] = useState([]);
  const [servicesArr, setServicesArr] = useState([]);

  const [supplierArr, setSupplierArr] = useState([]);
  const [brandArr, setBrandArr] = useState([]);
  const [typeArr, setTypeArr] = useState([]);

  const [salesArr, setSalesArr] = useState([]);
  const [salesInfo, setSalesInfo] = useState({});

  const [repeatNameErr, setRepeatNameErr] = useState(false);

  const [typeWarning, setTypeWarning] = useState("stock");
  const [isConcluded, setIsConcluded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saleErr, setSaleErr] = useState(false);

  const toggleOpenPopUp = () => {
    setOpenPopUp(!openPopUp);
  };

  const toggleSidebarWid = (width) => {
    setSidebarWid(width);
  };

  const attFaqFunc = () => {
    setAttFaq(attFaq + 1);
  };

  const attDataFunc = () => {
    setAttData(attData + 1);
  };

  const attAllCats = (revCats, expCats) => {
    setRevenueCats(revCats);
    setExpenseCats(expCats);
    // console.log("------->>>>>", revenueCats, expenseCats);
  };

  const passClients = (cli) => {
    setClients(cli);
  };

  // const initDatas = async () => {
  //   const responseCat = await getRevenueCategorys();
  //   const responseCatEx = await getExpenseCategorys();

  //   setRevenueCats(responseCat.data);
  //   setExpenseCats(responseCatEx.data);
  // };

  // useEffect(() => {
  //   initDatas();
  //   console.log("aaaaaaaa");
  // }, []);

  return (
    <SidebarContext.Provider
      value={{
        siderbarWid,
        toggleSidebarWid,
        attData,
        attDataFunc,
        revenueCats,
        expenseCats,
        attAllCats,
        passClients,
        clients,
        toggleOpenPopUp,
        openPopUp,
        attFaqFunc,
        attFaq,
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
        addImgBox,
        setAddImgBox,
        image,
        setImage,
        fileInfos,
        setFileInfos,
        productsInfosVisible,
        setProductsInfosVisible,
        valuesProduct,
        setValuesProduct,
        supplierValues,
        setSupplierValues,
        setSaleVisible,
        saleVisible,
        salesInfosVisible,
        setSalesInfosVisible,
        supplierInfosVisible,
        setSupplierInfosVisible,
        setBuysInfosVisible,
        buysInfosVisible,
        valuesBuy,
        setValuesBuy,
        imgUrl,
        setImgUrl,
        imgUrlProfile,
        setImgUrlProfile,
        toImgVisible,
        setToImgVisible,
        checkRec,
        setCheckRec,
        receiveVisible,
        setReceiveVisible,
        editEntry,
        setEditEntry,
        movs,
        setMovs,
        catsRevArr,
        setCatsRev,
        catsExpArr,
        setCatsExpArr,
        clientsArr,
        setClientsArr,
        productsArr,
        setProductsArr,
        servicesArr,
        setServicesArr,
        supplierArr,
        setSupplierArr,
        brandArr,
        setBrandArr,
        typeArr,
        setTypeArr,
        salesArr,
        setSalesArr,
        salesInfo,
        setSalesInfo,
        repeatNameErr,
        setRepeatNameErr,
        typeWarning,
        setTypeWarning,
        isConcluded,
        setIsConcluded,
        saleErr,
        setSaleErr,
        loading,
        setLoading,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
