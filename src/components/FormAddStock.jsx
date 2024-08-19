import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaPlus } from "react-icons/fa";
import { MenuItem } from "react-pro-sidebar";
import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../context/sidebarContext";
import AddAttachment from "./addAttachment";
import {
  amountMask,
  dateMask,
  entryValueMask,
  expirationMask,
  installmentsMask,
  installmentsValMask,
  totalCostMask,
} from "../utils/masks";
import { getProducts, getSupplier } from "../services/APIService";

// import { yupResolver } from "@hookform/resolvers/yup";
// revenue
// console
function FormAddStock({
  //   checkoutAddStockSchema,
  productInitialValues,
  handleAddStockSubmit,
  setAddStockVisible,
  setIsConcluded,
  addStockVisible,
  isConcluded,
  loading,
  //   novos
  //   handleSubmit,
  //   register,
  //   error,
}) {
  const {
    addImgBox,
    setAddImgBox,
    image,
    setImage,
    fileInfos,
    setFileInfos,
    attData,
    checkRec,
    setCheckRec,
  } = useContext(SidebarContext);

  const [formSchema, setFormSchema] = useState("inCash");

  const [productArr, setProductArr] = useState([]);
  const [supplierArr, setSupplierArr] = useState([]);
  const [prodSelect, setProdSelect] = useState({});

  // const [checkRec, setCheckRec] = useState(true);

  // message
  const checkoutAddStockSchema = yupResolver(
    yup.object({
      dateTest: yup.string().required("inserir campo"),
      formPayment: yup.string().required("inserir campo"),
      product: yup.string().required("inserir campo"),
      supplier: yup.string().required("inserir campo"),
      totalCost: yup.string().required("inserir campo"),
      amount: yup.string().required("inserir campo"),
      invoiceNum: yup.string(),
      observations: yup.string(),
      // test: yup.string() ,
    })
  );

  const checkoutAddStockSchemaTerm = yupResolver(
    yup.object({
      dateTest: yup.string().required("inserir campo"),
      formPayment: yup.string().required("inserir campo"),
      installmentsVal: yup.string().required("inserir campo"),
      installments: yup.string().required("inserir campo"),
      expiration: yup.string().required("inserir campo"),
      product: yup.string().required("inserir campo"),
      supplier: yup.string().required("inserir campo"),
      totalCost: yup.string().required("inserir campo"),
      amount: yup.string().required("inserir campo"),
      invoiceNum: yup.string(),
      observations: yup.string(),
    })
  );

  const checkoutAddStockSchemaEntry = yupResolver(
    yup.object({
      dateTest: yup.string().required("inserir campo"),
      formPayment: yup.string().required("inserir campo"),
      entryValue: yup.string().required("inserir campo"),
      installmentsVal: yup.string().required("inserir campo"),
      installments: yup.string().required("inserir campo"),
      expiration: yup.string().required("inserir campo"),
      product: yup.string().required("inserir campo"),
      supplier: yup.string().required("inserir campo"),
      totalCost: yup.string().required("inserir campo"),
      amount: yup.string().required("inserir campo"),
      invoiceNum: yup.string(),
      observations: yup.string(),
    })
  );

  const changeSchemaFunc = (formSchema) => {
    // console.log(formSchema);
    if (formSchema == "inCash") {
      return checkoutAddStockSchema;
    } else if (formSchema == "inTerm") {
      return checkoutAddStockSchemaTerm;
    } else if (formSchema == "entry") {
      return checkoutAddStockSchemaEntry;
    }
  };

  // const checkoutAddStockSchema = yup.object().shape({
  //   name: yup.string().required("preencha o campo"),
  // });

  const [typeDate, setTypeDate] = useState("today");
  const [valueDate, setValueDate] = useState("");

  const getInfos = async () => {
    const suppliers = await getSupplier();
    const products = await getProducts();

    setSupplierArr([...suppliers.data]);
    setProductArr([...products.data]);
    // setSupplierArr([...suppliers.data]);

    console.log(suppliers.data);
    console.log(products.data);
  };

  useEffect(() => {
    getInfos();
  }, []);

  useEffect(() => {
    getInfos();
  }, [attData]);

  useEffect(() => {
    console.log("atualiz ---");
    if (typeDate == "inCash" || typeDate == "today") {
      setValueDate(`${new Date().toISOString().split("T")[0]}`);
      console.log("RRRRAAA", `${new Date().toISOString().split("T")[0]}`);
    } else if (
      typeDate === "happened" ||
      typeDate === "schedule" ||
      typeDate === "inTerm"
    ) {
      setValueDate("");
    }
  }, [typeDate]);

  const dateTestFunc = (typeDate) => {
    if (typeDate === "today" || typeDate === "inCash") {
      return `${new Date().toISOString().split("T")[0]}`;
    } else {
      return "";
    }

    // return typeDate === "today" || typeDate === "inCash"
    //   ? `${new Date().toISOString().split("T")[0]}`
    //   : "";
  };

  const formMethods = useForm({
    defaultValues: {
      entryValue: "0.00",
      installmentsVal: "0.00",
      installments: "1",
      totalCost: "0.00",
      amount: "1",

      // dateTest: valueDate,
      dateTest:
        typeDate === "today" || typeDate === "inCash"
          ? `${new Date().toISOString().split("T")[0]}`
          : "",
      // dateTest: dateTestFunc(typeDate),
      // name: nameContact,
      // email: emailContact,
      // phone: phoneContact,
    },
    resolver: changeSchemaFunc(formSchema),
  });
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = formMethods;

  const dateTest = watch("dateTest");
  const dateValue = watch("date");
  const amountValue = watch("amount");
  const entryValueValue = watch("entryValue");
  const expirationValue = watch("expiration");
  const installmentsValValue = watch("installmentsVal");
  const installmentsValue = watch("installments");
  const totalCostvalue = watch("totalCost");
  // entryValueMask
  // expirationMask
  // installmentsMask
  // totalCostMask

  useEffect(() => {
    setValue("date", dateMask(dateValue));
    setValue("amount", amountMask(amountValue));
    setValue("entryValue", installmentsValMask(entryValueValue));
    setValue("expiration", expirationMask(expirationValue));
    setValue("installmentsVal", installmentsValMask(installmentsValValue));
    setValue("installments", installmentsMask(installmentsValue));
    setValue("totalCost", totalCostMask(totalCostvalue));
  }, [
    amountValue,
    entryValueValue,
    expirationValue,
    installmentsValValue,
    installmentsValue,
    totalCostvalue,
    dateValue,
  ]);

  const {
    setBrandVisible,
    brandVisible,
    supplierVisible,
    setSupplierVisible,
    formTypeVisible,
    setFormTypeVisible,
    toOther,
    setToOther,
    setProductVisible,
  } = useContext(SidebarContext);

  const fakeObj = [
    {
      text: "testText",
      value: "testValue",
    },
    {
      text: "testText2",
      value: "testValue2",
    },
  ];

  const fakeObj1 = [
    {
      text: "testText",
      value: "testValue",
    },
    {
      text: "testText2",
      value: "testValue2",
    },
  ];

  const fakeObj2 = [
    {
      text: "testText",
      value: "testValue",
    },
    {
      text: "testText2",
      value: "testValue2",
    },
  ];

  function InputError({ field }) {
    // @ts-expect-error
    // console.log(field, errors[field]?.message);
    return (
      <p className="text-xs text-left text-[#B23F30] px-4 font-bol">
        {errors[field].message}
      </p>
    );
  }

  return (
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
        visibility: `${addStockVisible == 0 ? "hidden" : "none"}`,
      }}
      className={`${addStockVisible == 0 ? "" : "animationOpacity"}`}
    >
      <Box
        className="centralized "
        transition="all 0.5s"
        backgroundColor="#7A7A7A"
        borderRadius="9px"
        zIndex="101"
        // p="10px 10px"
        sx={{
          width: "calc(100vw - 50%)",
          maxWidth: "450px",
          margin: "0 auto",
          padding: "10px",
          "@media (max-width: 768px)": {
            width: "calc(100vw - 20%)",
          },
          "@media (max-width: 480px)": {
            width: "calc(100vw - 10%)",
            padding: "1px",
          },
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="end">
          <Button
            sx={{ color: "black" }}
            onClick={(e) => {
              // console.log(e.target.style.color);
              setAddStockVisible(0);
              setIsConcluded(false);
            }}
          >
            <IoMdClose style={{ height: "28px", width: "28px" }} />
          </Button>
        </Box>
        <Box textAlign="center" p="40px">
          <h1 className="text-2xl sm:text-3xl font-bold">Deseja registrar </h1>
          <h1 className="text-2xl sm:text-3xl font-bold">
            uma entrada de Produto?
          </h1>
          <Typography textAlign="center" pt="15px" fontFamily="Poppins">
            {" "}
            preencha as informações abaixo
          </Typography>
          <Box>
            <form onSubmit={handleSubmit(handleAddStockSubmit)}>
              {/* <Box pt="30px" display="flex" flexDirection="column" gap="20px"> */}
              <div className="grid grid-cols-2 mt-5 gap-2 gap-y-3 max-h-80 scroll-classes overflow-scroll pt-2 px-1">
                <div className="flex items-center justify-start gap-2">
                  <input
                    checked={checkRec}
                    onChange={() => {
                      setCheckRec(!checkRec);
                    }}
                    type="checkbox"
                  />
                  <p>recebido</p>
                </div>
                <div></div>
                {typeDate === "today" ? (
                  <div>
                    {/* <Typography variant="p">nome</Typography> */}

                    <TextField
                      {...register("dateTest")}
                      fullWidth
                      // variant="filled"
                      type="date"
                      // label="date"
                      // onBlur={handleBlur}
                      // onChange={handleChange}
                      onChange={(e) => {
                        // handleChange(e);
                        // setValueDate(e.target.value);
                        console.log(e.target.value);
                      }}
                      value={valueDate}
                      // value={values.date}
                      name="dateTest"
                      // error={!!touched.date && !!errors.date}
                      // helperText={touched.date && errors.date}
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
                        },
                      }}
                    />
                  </div>
                ) : (
                  <div>
                    <TextField
                      {...register("dateTest")}
                      fullWidth
                      // variant="filled"
                      type="date"
                      // label="date"

                      // onChange={handleChange}
                      onChange={(e) => {
                        // handleChange(e);
                        // getValues

                        setValue("dateTest", e.target.value);
                        setValue("expiration", e.target.value.split("-")[2]);
                        setValueDate(e.target.value);
                        console.log(
                          e.target.value,
                          +e.target.value.split("-")[2]
                        );
                        console.log(getValues("dateTest"));
                        if (
                          getValues("dateTest") <
                          `${new Date().toISOString().split("T")[0]}`
                        ) {
                          console.log("aabbccddee");
                          // errors.dateTest.type = true;
                          errors[field].message = "teste";
                        }
                      }}
                      value={valueDate}
                      // value={values.date}
                      name="dateTest"
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
                        },
                      }}
                      error={
                        getValues("dateTest") <
                        `${new Date().toISOString().split("T")[0]}`
                      }
                      // helperText={touched.date && errors.date}
                    />
                    {getValues("dateTest") <
                      `${new Date().toISOString().split("T")[0]}` && (
                      <p className="text-xs text-left text-[#B23F30] px-4 font-bol">
                        data inválida
                      </p>
                    )}
                  </div>
                )}

                {/* <div className="">
                  <TextField
                    {...register("date")}
                    type="text"
                    label="Data"
                    name="date"
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
                    error={errors.date}
                    // helperText={errors.date.message}
                  />
                  <div>{errors?.date?.type && <InputError field="date" />}</div>
                </div> */}

                <div className=" ">
                  <div className=" ">
                    <div className="relative    w-full">
                      <select
                        style={{
                          backgroundColor: "#F3E2E0",
                          borderRadius: "4px",
                          paddingRight: "10px",
                          paddingLeft: "10px",
                          color: "black",
                          height: "56px",
                        }}
                        {...register("formPayment")}
                        id="formPayment"
                        className="peer rounded-md w-full px-3 py-3.5   text-sm border-gray-200 border-2 focus:bg-white bg-white
            placeholder-shown:bg-gray-200 placeholder-shown:border-none placeholder-transparent"
                        onChange={(e) => {
                          // console.log(e.target.value);
                          console.log("a", e.target.value);
                          console.log("valdate", valueDate);
                          console.log("aaaa", getValues("formPayment"));

                          if (
                            e.target.value == "today" ||
                            e.target.value == "inCash"
                          ) {
                            setTypeDate("inCash");
                            console.log("changeToday");
                            // colocar o set value('dateTest', valor ) aki
                            // setValue("date", dateMask(dateValue))
                            setValue(
                              "dateTest",
                              `${new Date().toISOString().split("T")[0]}`
                            );
                          } else {
                            setTypeDate("inTerm");
                            console.log("changeTerm");
                            // colocar o set value aki
                            setValue("dateTest", "");
                          }
                          setFormSchema(e.target.value);
                        }}
                      >
                        <option value="inCash">à vista</option>
                        <option value="inTerm">à prazo</option>
                        <option value="entry">entrada + parcelas</option>
                      </select>

                      <label
                        style={{
                          backgroundColor: "#F3E2E0",
                        }}
                        htmlFor="formPayment"
                        className="absolute left-2 -top-2.5 px-1 text-xs transition-all bg-white rounded text-black-500
             peer-placeholder-shown:text-xs peer-placeholder-shown:text-black-500
             peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-gray-200 peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-black-500 peer-focus:bg-white peer-focus:font-semibol"
                      >
                        Pagamento
                      </label>
                    </div>
                    <div>
                      {errors?.formPayment?.type && (
                        <InputError field="formPayment" />
                      )}
                    </div>
                  </div>
                </div>

                {/* )} */}

                <div className="col-span-2 grid grid-cols-4 items-start  gap-2">
                  <div className="col-span-3 h-full  ">
                    <div className="relative    w-full">
                      <select
                        {...register("product")}
                        style={{
                          backgroundColor: "#F3E2E0",
                          borderRadius: "4px",
                          paddingRight: "10px",
                          paddingLeft: "10px",
                          color: "black",
                          height: "56px",
                        }}
                        onChange={(e) => {
                          // entryValue: "0.00",
                          // installmentsVal: "0.00",
                          // installments: "1",
                          // totalCost: "0.00",
                          // amount: "1",

                          console.log(e.target.value);
                          const prodCur = productArr.find(
                            (prod) => prod.id == e.target.value
                          );
                          console.log(prodCur);
                          setValue("amount", "1");
                          setValue("totalCost", prodCur.valor_custo);
                          setValue("installments", "1");
                          setValue("installmentsVal", prodCur.valor_custo);
                          setValue("entryValue", "0.00");
                          setValue("supplier", `${prodCur.fornecedor_id}`);
                          setProdSelect(prodCur);
                          // console.log(productArr.find(e => e.id == ))
                        }}
                        id="product"
                        className={`peer rounded-md w-full px-3 py-3.5   text-sm border-gray-200   focus:bg-white bg-white
            placeholder-shown:bg-gray-200 placeholder-shown:border-none placeholder-transparent ${
              errors?.product?.type ? "border-red-500 border" : "border-2"
            }`}
                      >
                        <option value="">inserir valor</option>
                        {productArr.map((option, i) => (
                          <option value={option.id}>{option.nome}</option>
                        ))}
                      </select>

                      <label
                        style={{
                          backgroundColor: "#F3E2E0",
                        }}
                        htmlFor="product"
                        className={`absolute left-2 -top-2.5 px-1 text-xs transition-all bg-white rounded 
             peer-placeholder-shown:text-xs peer-placeholder-shown:text-black-500
             peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-gray-200 peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-black-500 peer-focus:bg-white peer-focus:font-semibol ${
               errors?.product?.type ? "text-red-500 border" : "text-black-500"
             }`}
                      >
                        Produto
                      </label>
                    </div>

                    <div>
                      {errors?.product?.type && <InputError field="product" />}
                    </div>
                  </div>

                  <div className="  ">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        console.log("sup");
                        setAddStockVisible(0);
                        setToOther(1);
                        setProductVisible(1);
                      }}
                      className="transition duration-200 rounded bg-[#B23F30] drop-shadow-2xl w-full py-4 flex items-center justify-center hover:bg-[#8b3226]"
                    >
                      <FaPlus size={24} className="text-white" />
                    </button>
                  </div>
                </div>

                <div className="col-span-2 grid grid-cols-4 items-start  gap-2">
                  <div className="col-span-3 h-full  ">
                    <div className="relative    w-full">
                      <select
                        style={{
                          backgroundColor: "#F3E2E0",
                          borderRadius: "4px",
                          paddingRight: "10px",
                          paddingLeft: "10px",
                          color: "black",
                          height: "56px",
                        }}
                        {...register("supplier")}
                        id="supplier"
                        className={`peer rounded-md w-full px-3 py-3.5   text-sm border-gray-200   focus:bg-white bg-white
            placeholder-shown:bg-gray-200 placeholder-shown:border-none placeholder-transparent ${
              errors?.product?.type ? "border-red-500 border" : "border-2"
            }`}
                      >
                        <option value="">inserir valor</option>
                        {supplierArr.map((option, i) => (
                          <option value={option.id}>
                            {option.nome_contato}
                          </option>
                        ))}
                      </select>

                      <label
                        style={{
                          backgroundColor: "#F3E2E0",
                        }}
                        htmlFor="supplier"
                        className={`absolute left-2 -top-2.5 px-1 text-xs transition-all bg-white rounded 
                        peer-placeholder-shown:text-xs peer-placeholder-shown:text-black-500
                        peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-gray-200 peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-black-500 peer-focus:bg-white peer-focus:font-semibol ${
                          errors?.product?.type
                            ? "text-red-500 border"
                            : "text-black-500"
                        }`}
                      >
                        Fornecedor
                      </label>
                    </div>

                    <div>
                      {errors?.supplier?.type && (
                        <InputError field="supplier" />
                      )}
                    </div>
                  </div>

                  <div className="  ">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        console.log("sup");
                        setAddStockVisible(0);
                        setToOther(1);
                        setSupplierVisible(1);
                      }}
                      className="transition duration-200 rounded bg-[#B23F30] drop-shadow-2xl w-full py-4 flex items-center justify-center hover:bg-[#8b3226]"
                    >
                      <FaPlus size={24} className="text-white" />
                    </button>
                  </div>
                </div>

                {/* <div className="">
                  <TextField
                    {...register("totalCost")}
                    type="text"
                    label="Custo total"
                    name="totalCost"
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
                    error={errors.totalCost}
                    // helperText={errors.totalCost.message}
                  />
                  <div>
                    {errors?.totalCost?.type && (
                      <InputError field="totalCost" />
                    )}
                  </div>
                </div> */}

                <div>
                  <TextField
                    {...register("totalCost")}
                    type="text"
                    label="Custo total"
                    name="totalCost"
                    sx={{
                      bgcolor: "#D6CDCC",
                      borderRadius: "4px",
                      "& .MuiFormLabel-root": {
                        backgroundColor: "#D6CDCC",
                        borderRadius: "4px",
                        pr: "10px",
                        pl: "10px",
                        color: "black",
                      },
                    }}
                    // disabled
                    InputProps={{
                      readOnly: true,
                    }}
                    onChange={(e) => {
                      // installmentsVal
                      // installments
                      // totalCost
                      // getValues
                      // setValue
                      // setValue("dateTest", e.target.value);
                      // setValueDate(e.target.value);
                      setValue("totalCost", e.target.value);
                      const installments = getValues("installments");
                      const formPayment = getValues("formPayment");
                      const totalCost = +getValues("totalCost").split(" ")[1];
                      const installmentsVal =
                        +getValues("installmentsVal").split(" ")[1];
                      if (installments && formPayment !== "inCash") {
                        console.log(installmentsVal);
                        setValue(
                          "installmentsVal",
                          `${(totalCost / installments).toFixed(2)} `
                        );
                      }
                    }}
                    error={errors.totalCost}
                    // helperText={errors.totalCost.message}
                  />
                  <div>
                    {errors?.totalCost?.type && (
                      <InputError field="totalCost" />
                    )}
                  </div>
                </div>

                <div>
                  <TextField
                    {...register("amount")}
                    type="number"
                    label="Quantidade"
                    name="amount"
                    onChange={(e) => {
                      setValue("amount", e.target.value);

                      const installments = getValues("installments");
                      const formPayment = getValues("formPayment");
                      const totalCost = +getValues("totalCost").split(" ")[1];
                      const entry = +getValues("entryValue").split(" ")[1];
                      const installmentsVal =
                        +getValues("installmentsVal").split(" ")[1];

                      //   if (totalCost && formPayment == "inTerm") {
                      //   console.log(installmentsVal);
                      //   setValue(
                      //     "installmentsVal",
                      //     `${(totalCost / installments).toFixed(2)}`
                      //   );
                      // } else if (totalCost && formPayment == "entry") {
                      //   setValue(
                      //     "installmentsVal",
                      //     `${((totalCost - entry) / installments).toFixed(2)}`
                      //   );
                      // }

                      setValue(
                        "totalCost",
                        `${+prodSelect.valor_custo * +e.target.value}`.includes(
                          "."
                        )
                          ? `${(
                              +prodSelect.valor_custo * +e.target.value
                            ).toFixed(2)}`
                          : `${+prodSelect.valor_custo * +e.target.value}.00`
                      );

                      if (totalCost && formPayment == "inTerm") {
                        setValue(
                          "installmentsVal",
                          `${(
                            (+prodSelect.valor_custo * +e.target.value) /
                            +installments
                          ).toFixed(2)}`
                        );
                      } else if (totalCost && formPayment == "entry") {
                        setValue(
                          "installmentsVal",
                          `${(
                            (+prodSelect.valor_custo * +e.target.value) /
                            installments
                          ).toFixed(2)}`
                        );
                      }
                    }}
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
                    error={errors.amount}
                    // helperText={errors.amount.message}
                  />
                  <div>
                    {errors?.amount?.type && <InputError field="amount" />}
                  </div>
                </div>

                {/* {formSchema == "entry" && ( */}
                <div
                  className={`col-span-2 ${
                    formSchema == "entry" ? "" : "hidden"
                  }`}
                >
                  <TextField
                    {...register("entryValue")}
                    type="text"
                    label="Valor entrada"
                    name="entryValue"
                    className="w-full"
                    onChange={(e) => {
                      setValue("entryValue", e.target.value);
                      const entry = +getValues("entryValue").split(" ")[1];
                      const installments = +getValues("installments");
                      const totalCost = +getValues("totalCost").split(" ")[1];

                      console.log((totalCost - entry) / installments);

                      setValue(
                        "installmentsVal",
                        `${((totalCost - entry) / installments).toFixed(2)}`
                      );
                    }}
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
                    error={errors.entryValue}
                    // helperText={errors.entryValue.message}
                  />
                  <div>
                    {errors?.entryValue?.type && (
                      <InputError field="entryValue" />
                    )}
                  </div>
                </div>

                <div
                  className={`${
                    formSchema == "entry" || formSchema == "inTerm"
                      ? ""
                      : "hidden"
                  } col-span-2`}
                >
                  <TextField
                    {...register("installmentsVal")}
                    type="text"
                    label="Valor da parcela"
                    name="installmentsVal"
                    sx={{
                      bgcolor: "#D6CDCC",
                      borderRadius: "4px",
                      "& .MuiFormLabel-root": {
                        backgroundColor: "#D6CDCC",
                        borderRadius: "4px",
                        pr: "10px",
                        pl: "10px",
                        color: "black",
                      },
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                    onChange={(e) => {
                      // installmentsVal
                      // installments
                      // totalCost
                      // getValues
                      // setValue
                      // setValue("dateTest", e.target.value);
                      // setValueDate(e.target.value);
                      setValue("installmentsVal", e.target.value);
                      const installments = getValues("installments");
                      const formPayment = getValues("formPayment");
                      const installmentsVal =
                        +getValues("installmentsVal").split(" ")[1];
                      if (installments && formPayment !== "inCash") {
                        console.log(installmentsVal);
                        setValue(
                          "totalCost",
                          `${(installmentsVal * installments).toFixed(2)}`
                        );
                      }
                    }}
                    error={errors.installmentsVal}
                    // helperText={errors.installmentsVal.message}
                    className="w-full"
                  />
                  <div>
                    {errors?.installmentsVal?.type && (
                      <InputError field="installmentsVal" />
                    )}
                  </div>
                </div>

                <div
                  className={`${
                    formSchema == "entry" || formSchema == "inTerm"
                      ? ""
                      : "hidden"
                  }`}
                >
                  <TextField
                    {...register("installments")}
                    type="number"
                    label="Parcelas"
                    name="installments"
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
                    onChange={(e) => {
                      // installmentsVal
                      // installments
                      // totalCost
                      // getValues
                      // setValue
                      // setValue("dateTest", e.target.value);
                      // setValueDate(e.target.value);
                      setValue("installments", e.target.value);
                      const installments = getValues("installments");
                      const formPayment = getValues("formPayment");
                      const totalCost = +getValues("totalCost").split(" ")[1];
                      const entry = +getValues("entryValue").split(" ")[1];
                      const installmentsVal =
                        +getValues("installmentsVal").split(" ")[1];
                      if (totalCost && formPayment == "inTerm") {
                        console.log(installmentsVal);
                        setValue(
                          "installmentsVal",
                          `${(totalCost / installments).toFixed(2)}`
                        );
                      } else if (totalCost && formPayment == "entry") {
                        setValue(
                          "installmentsVal",
                          `${((totalCost - entry) / installments).toFixed(2)}`
                        );
                      }

                      // inCash
                      // inTerm
                      // entry

                      // `${((totalCost - entry) / installments).toFixed(2)}
                    }}
                    error={errors.installments}
                    // helperText={errors.installments.message}
                  />
                  <div>
                    {errors?.installments?.type && (
                      <InputError field="installments" />
                    )}
                  </div>
                </div>

                <div
                  className={`${
                    formSchema == "entry" || formSchema == "inTerm"
                      ? ""
                      : "hidden"
                  }`}
                >
                  <TextField
                    {...register("expiration")}
                    type="text"
                    label="Data vencimento"
                    name="expiration"
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
                    onChange={(e) => {
                      setValue("expiration", e.target.value);
                      let dataVal = getValues("dateTest", e.target.value);
                      const curDate = `${
                        new Date().toISOString().split("T")[0]
                      }`.split("-");
                      if (!dataVal) {
                        const plusDay = e.target.value;
                        const plusMonth = curDate == 12 ? 1 : +curDate[1] + 1;
                        const year =
                          curDate[1] == 12 ? +curDate[0] + 1 : +curDate[0];
                        console.log(
                          `${year}-${
                            plusMonth < 10 ? `0${plusMonth}` : plusMonth
                          }-${plusDay < 10 ? `0${plusDay}` : plusDay}`
                        );
                        setValueDate(
                          `${year}-${
                            plusMonth < 10 ? `0${plusMonth}` : plusMonth
                          }-${plusDay < 10 ? `0${plusDay}` : plusDay}`
                        );
                      }
                      let newDate = dataVal.split("-");
                      let dateDay = newDate[2];
                      if ((`${e.target.value}`.length = 1)) {
                        dateDay = `0${e.target.value}`;
                      } else {
                        dateDay = `${e.target.value}`;
                      }
                      console.log(`${newDate[0]}-${newDate[1]}-${dateDay}`);
                      setValue(
                        "dateTest",
                        `${newDate[0]}-${newDate[1]}-${dateDay}`
                      );
                      setValueDate(`${newDate[0]}-${newDate[1]}-${dateDay}`);
                      console.log(dataVal);
                    }}
                    error={errors.expiration}
                    // helperText={errors.expiration.message}
                  />
                  <div>
                    {errors?.expiration?.type && (
                      <InputError field="expiration" />
                    )}
                  </div>
                </div>

                {/* aaaaaaa */}

                {/* 3 */}

                <div className="col-span-2">
                  <TextField
                    {...register("invoiceNum")}
                    type="text"
                    label="Nota fiscal"
                    name="invoiceNum"
                    className="w-full"
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
                    error={errors.invoiceNum}
                    // helperText={errors.observation.message}
                  />
                  <div>
                    {errors?.invoiceNum?.type && (
                      <InputError field="invoiceNum" />
                    )}
                  </div>
                </div>

                <div className="col-span-2">
                  <TextField
                    {...register("observations")}
                    type="text"
                    label="Observações"
                    name="observations"
                    className="w-full"
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
                    error={errors.observations}
                    // helperText={errors.observation.message}
                  />
                  <div>
                    {errors?.observations?.type && (
                      <InputError field="observations" />
                    )}
                  </div>
                </div>

                {image.name && (
                  <p className="text-center col-span-2 flex items-center justify-center">
                    {image.name}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setImage(false);
                        setFileInfos(false);
                      }}
                      className="trasition duration-200 hover:bg-[#8b3226] ml-2 bg-[#B23F30] text-white p-1 px-2 rounded "
                    >
                      <IoMdClose />
                    </button>{" "}
                  </p>
                )}

                <div className="col-span-2 ">
                  {/* colocar um setImgSla no context e enviar ImgSla no handlerPorduct */}
                  {/* <input type="file" className="w-full" /> */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setAddImgBox(true);
                    }}
                    className="transition duration-200 bg-[#ffffff] w-full  rounded w-full px-3 py-3.5   text-sm border-2   focus:bg-white 
                    hover:bg-[#E5E5E5]
                    hover:border-2
                    hover:border-black
                        placeholder-shown:bg-gray-200 placeholder-shown:border-8
                        placeholder-transparent"
                  >
                    {image.name ? "Trocar anexo" : "Adicionar anexo"}
                    {/* Adicionar anexo */}
                  </button>
                </div>
              </div>

              {/* </Box> */}
              <Box pt="20px">
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
                  disabled={loading}
                  type="submit"
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
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default FormAddStock;
