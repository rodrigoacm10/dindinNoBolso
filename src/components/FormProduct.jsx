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
import {
  costValueMask,
  profitMarginMask,
  saleValueMask,
  stockMaxMask,
  stockMinMask,
} from "../utils/masks";
import {
  getAddress,
  getBrand,
  getSupplier,
  getType,
} from "../services/APIService";

// import { yupResolver } from "@hookform/resolvers/yup";

function FormProduct({
  //   checkoutProductSchema,
  productInitialValues,
  handleProductSubmit,
  setProductVisible,
  setIsConcluded,
  productVisible,
  isConcluded,
  loading,
  //   novos
  //   handleSubmit,
  //   register,
  //   error,
}) {
  const [supplierQuant, setSupplierQuant] = useState([]);

  const [supplierArr, setSupplierArr] = useState([]);
  const [brandArr, setBrandArr] = useState([]);
  const [typeArr, setTypeArr] = useState([]);

  const { repeatNameErr, setRepeatNameErr } = useContext(SidebarContext);

  const checkoutProductSchema = yupResolver(
    yup.object({
      name: yup.string().required("inserir campo"),
      code: yup.string().required("inserir campo"),
      supplier: yup.string().required("inserir campo"),
      brand: yup.string().required("inserir campo"),
      stockMin: yup.string().required("inserir campo"),
      stockMax: yup.string().required("inserir campo"),
      type: yup.string().required("inserir campo"),
      observations: yup.string(),
      costValue: yup.string().required("inserir campo"),
      profitMargin: yup.string().required("inserir campo"),
      saleValue: yup.string().required("inserir campo"),
    })
  );

  // const schemaObj = {
  //   name: yup.string().required("inserir campo"),
  //   code: yup.string().required("inserir campo"),
  //   supplier: yup.string().required("inserir campo"),
  //   brand: yup.string().required("inserir campo"),
  //   stockMin: yup.string().required("inserir campo"),
  //   stockMax: yup.string().required("inserir campo"),
  //   type: yup.string().required("inserir campo"),
  //   observations: yup.string(),
  //   costValue: yup.string().required("inserir campo"),
  //   profitMargin: yup.string().required("inserir campo"),
  //   saleValue: yup.string().required("inserir campo"),
  // };

  // const checkoutProductSchema = yupResolver(yup.object(schemaObj));

  // const checkoutProductSchema = yup.object().shape({
  //   name: yup.string().required("preencha o campo"),
  // });

  const formMethods = useForm({
    defaultValues: {
      costValue: "0",
      profitMargin: "0",
      saleValue: "0",
    },
    resolver: checkoutProductSchema,
  });

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = formMethods;

  const {
    setBrandVisible,
    brandVisible,
    supplierVisible,
    setSupplierVisible,
    formTypeVisible,
    setFormTypeVisible,
    toOther,
    setToOther,
    attData,
  } = useContext(SidebarContext);

  const fakeObj = [
    {
      text: "testText",
      value: "testValue",
    },
  ];

  const costValueValue = watch("costValue");
  const profitMarginValue = watch("profitMargin");
  const saleValueValue = watch("saleValue");
  const stockMinValue = watch("stockMin");
  const stockMaxValue = watch("stockMax");

  // costValueMask
  // profitMarginMask
  // saleValueMask
  // stockMinMask
  // stockMaxMask

  const getInfos = async () => {
    const suppliers = await getSupplier();
    const brands = await getBrand();
    const types = await getType();

    setSupplierArr([...suppliers.data]);
    setBrandArr([...brands.data]);
    setTypeArr([...types.data]);

    console.log("suppliers", suppliers.data);
    console.log("brands", brands.data);
    console.log("types", types.data);
  };

  useEffect(() => {
    getInfos();
  }, []);

  useEffect(() => {
    getInfos();
  }, [attData]);

  useEffect(() => {
    setValue("costValue", costValueMask(costValueValue));
    setValue("profitMargin", profitMarginMask(profitMarginValue));
    setValue("saleValue", saleValueMask(saleValueValue));
    setValue("stockMin", stockMinMask(stockMinValue));
    setValue("stockMax", stockMaxMask(stockMaxValue));
  }, [
    costValueValue,
    profitMarginValue,
    saleValueValue,
    stockMinValue,
    stockMaxValue,
  ]);

  function InputError({ field }) {
    // @ts-expect-error
    return (
      <p className="text-xs text-left text-[#B23F30] px-4 font-bol">
        {errors[field].message}
      </p>
    );
  }

  function NewSupplier({ index }) {
    return (
      <div
        key={index}
        className="col-span-2 grid grid-cols-4 items-start  gap-2"
      >
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
              {...register(`supplier${index + 1}`, { required: true })}
              id={`supplier${index + 1}`}
              className={`peer rounded-md w-full px-3 py-3.5   text-sm border-gray-200   focus:bg-white bg-white
        placeholder-shown:bg-gray-200 placeholder-shown:border-none placeholder-transparent ${
          errors[`supplier${index + 1}`]?.type
            ? "border-red-500 border"
            : "border-2"
        }`}
            >
              <option value="">inserir valor</option>
              {supplierArr.map((option, i) => (
                <option value={option.id}>{option.nome_contato}</option>
              ))}
            </select>

            <label
              style={{
                backgroundColor: "#F3E2E0",
              }}
              htmlFor={`supplier${index + 1}`}
              className={`absolute left-2 -top-2.5 px-1 text-xs transition-all bg-white rounded 
        peer-placeholder-shown:text-xs peer-placeholder-shown:text-black-500
        peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-gray-200 peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-black-500 peer-focus:bg-white peer-focus:font-semibol ${
          errors[`supplier${index + 1}`]?.type
            ? "text-red-500 border"
            : "text-black-500"
        }`}
            >
              Fornecedor
            </label>
          </div>

          <div>
            {errors[`supplier${index + 1}`]?.type && (
              <InputError field={`supplier${index + 1}`} />
            )}
          </div>
        </div>

        <div className="  ">
          <button
            onClick={(e) => {
              e.preventDefault();
              const newArr = supplierQuant.slice(0, supplierQuant.length - 1);
              setSupplierQuant([...newArr]);
            }}
            className="transition duration-200 rounded drop-shadow-2xl w-full py-4 flex items-center justify-center hover:bg-[#484848] bg-[#616060] "
          >
            <IoMdClose size={24} className="text-white" />
          </button>
        </div>
      </div>
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
        visibility: `${productVisible == 0 ? "hidden" : "none"}`,
      }}
      className={`${productVisible == 0 ? "" : "animationOpacity"}`}
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
              setProductVisible(0);
              setRepeatNameErr(false);
              setIsConcluded(false);
            }}
          >
            <IoMdClose style={{ height: "28px", width: "28px" }} />
          </Button>
        </Box>
        <Box textAlign="center" p="40px">
          <h1 className="text-2xl sm:text-3xl font-bold">Deseja adicionar </h1>
          <h1 className="text-2xl sm:text-3xl font-bold">um novo Produto?</h1>
          <Typography textAlign="center" pt="15px" fontFamily="Poppins">
            {" "}
            preencha as informações abaixo
          </Typography>
          <div className="flex items-start mt-5 px-1">
            {/* <div className="text-sm flex items-center gap-2">
              <button
                onClick={() => {
                  // console.log(prodQuant);
                  // // const newArr = prodQuant.push("a");
                  // setProdQuant([...prodQuant, "a"]);

                  setSupplierQuant([...supplierQuant, "a"]);
                }}
                className=" transition duration-200 hover:bg-[#8b3226] bg-[#B23F30] rounded py-2 px-3"
              >
               
                <FaPlus className="text-white" />
              </button>
              adicionar fornecedor
            </div> */}
          </div>
          <Box>
            <form onSubmit={handleSubmit(handleProductSubmit)}>
              {/* <Box pt="30px" display="flex" flexDirection="column" gap="20px"> */}
              <div className="grid grid-cols-2 mt-1 gap-2 gap-y-3 max-h-80 scroll-classes overflow-scroll pt-2 px-1">
                <div className="">
                  <TextField
                    {...register("name")}
                    type="text"
                    label="Nome"
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
                    error={errors.name}
                    // helperText={errors.name.message}
                  />
                  <div>{errors?.name?.type && <InputError field="name" />}</div>
                </div>

                <div>
                  <TextField
                    {...register("code")}
                    type="text"
                    label="Código"
                    name="code"
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
                    error={errors.code}
                    // helperText={errors.name.message}
                  />
                  <div>{errors?.code?.type && <InputError field="code" />}</div>
                </div>

                {/* 1 */}
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
                          errors?.supplier?.type
                            ? "border-red-500 border"
                            : "border-2"
                        }`}
                      >
                        <option value="">inserir valor</option>
                        {supplierArr.map((option, i) => (
                          <option value={option.id}>
                            {option.nome_contato}
                          </option>
                        ))}
                        {/* <option value="confirmed">Confirmado</option>
                        <option value="uncertain">Incerto</option>
                        <option value="coming">Caminho</option>
                        <option value="denied">Negado</option> */}
                      </select>

                      <label
                        style={{
                          backgroundColor: "#F3E2E0",
                        }}
                        htmlFor="supplier"
                        className={`absolute left-2 -top-2.5 px-1 text-xs transition-all bg-white rounded 
                        peer-placeholder-shown:text-xs peer-placeholder-shown:text-black-500
                        peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-gray-200 peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-black-500 peer-focus:bg-white peer-focus:font-semibol ${
                          errors?.supplier?.type
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
                        setProductVisible(0);
                        setToOther(1);
                        setSupplierVisible(1);
                      }}
                      className="transition duration-200 rounded bg-[#B23F30] drop-shadow-2xl w-full py-4 flex items-center justify-center hover:bg-[#8b3226]"
                    >
                      <FaPlus size={24} className="text-white" />
                    </button>
                  </div>
                </div>

                {supplierQuant.map((e, i) => {
                  return <NewSupplier key={i} index={i} />;
                })}

                {/* 2 */}
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
                        {...register("brand")}
                        id="brand"
                        className={`peer rounded-md w-full px-3 py-3.5   text-sm border-gray-200   focus:bg-white bg-white
                        placeholder-shown:bg-gray-200 placeholder-shown:border-none placeholder-transparent ${
                          errors?.brand?.type
                            ? "border-red-500 border"
                            : "border-2"
                        }`}
                      >
                        <option value="">inserir valor</option>
                        {brandArr.map((option, i) => (
                          <option value={option.id}>{option.nome}</option>
                        ))}
                        {/* <option value="confirmed">Confirmado</option>
                        <option value="uncertain">Incerto</option>
                        <option value="coming">Caminho</option>
                        <option value="denied">Negado</option> */}
                      </select>

                      <label
                        style={{
                          backgroundColor: "#F3E2E0",
                        }}
                        htmlFor="brand"
                        className={`absolute left-2 -top-2.5 px-1 text-xs transition-all bg-white rounded 
                        peer-placeholder-shown:text-xs peer-placeholder-shown:text-black-500
                        peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-gray-200 peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-black-500 peer-focus:bg-white peer-focus:font-semibol ${
                          errors?.brand?.type
                            ? "text-red-500 border"
                            : "text-black-500"
                        }`}
                      >
                        Marca
                      </label>
                    </div>

                    <div>
                      {errors?.brand?.type && <InputError field="brand" />}
                    </div>
                  </div>

                  <div className="  ">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        console.log("sup");
                        setProductVisible(0);
                        setToOther(1);
                        setBrandVisible(1);
                      }}
                      className="transition duration-200 rounded bg-[#B23F30] drop-shadow-2xl w-full py-4 flex items-center justify-center hover:bg-[#8b3226]"
                    >
                      <FaPlus size={24} className="text-white" />
                    </button>
                  </div>
                </div>

                <div>
                  <TextField
                    {...register("costValue")}
                    type="text"
                    label="Valor custo"
                    name="costValue"
                    onChange={(e) => {
                      const valNum = +e.target.value.split(" ")[1];
                      const profitVal =
                        +getValues("profitMargin").split("%")[0];
                      const porcentNum = `${
                        valNum + (valNum * profitVal) / 100
                      }`;

                      setValue("costValue", costValueMask(e.target.value));
                      console.log("NaN");
                      setValue(
                        "saleValue",
                        porcentNum == "NaN" ? "0" : porcentNum
                      );
                      console.log(valNum, porcentNum, profitVal);
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
                    error={errors.costValue}
                    // helperText={errors.costValue.message}
                  />
                  <div>
                    {errors?.costValue?.type && (
                      <InputError field="costValue" />
                    )}
                  </div>
                </div>

                <div>
                  <TextField
                    {...register("profitMargin")}
                    type="text"
                    label="Margem lucro"
                    name="profitMargin"
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
                    error={errors.profitMargin}
                    onChange={(e) => {
                      setValue(
                        "profitMargin",
                        profitMarginMask(e.target.value)
                      );
                      const profitVal = +e.target.value.split("%")[0];
                      const valNum = +getValues("costValue").split(" ")[1];

                      const saleNum = `${valNum + (valNum * profitVal) / 100}`;
                      console.log(saleNum);

                      setValue("saleValue", saleNum);
                    }}
                    // helperText={errors.profitMargin.message}
                  />
                  <div>
                    {errors?.profitMargin?.type && (
                      <InputError field="profitMargin" />
                    )}
                  </div>
                </div>

                <div className="col-span-2">
                  <TextField
                    {...register("saleValue")}
                    type="text"
                    label="Valor venda"
                    name="saleValue"
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
                    error={errors.saleValue}
                    // helperText={errors.name.message}
                    onChange={(e) => {
                      // const valNum = +e.target.value.split(" ")[1];
                      // const profitVal =
                      //   +getValues("profitMargin").split("%")[0];
                      // const porcentNum = `${
                      //   valNum + (valNum * profitVal) / 100
                      // }`;

                      // setValue("costValue", costValueMask(e.target.value));
                      // setValue("saleValue", porcentNum);
                      // console.log(valNum, porcentNum, profitVal);
                      setValue("saleValue", saleValueMask(e.target.value));
                      const saleNum = +getValues("saleValue").split(" ")[1];
                      const valNum = +getValues("costValue").split(" ")[1];
                      const profitVal =
                        +getValues("profitMargin").split("%")[0];

                      const percentNum = `${
                        ((saleNum - valNum) / valNum) * 100
                      }`;
                      console.log(percentNum);
                      setValue("profitMargin", percentNum);
                    }}
                  />
                  <div>
                    {errors?.saleValue?.type && (
                      <InputError field="saleValue" />
                    )}
                  </div>
                </div>

                <div>
                  <TextField
                    {...register("stockMin")}
                    type="text"
                    label="Estoque min"
                    name="stockMin"
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
                    error={errors.stockMin}
                    // helperText={errors.stockMin.message}
                  />
                  <div>
                    {errors?.stockMin?.type && <InputError field="stockMin" />}
                  </div>
                </div>

                <div>
                  <TextField
                    {...register("stockMax")}
                    type="text"
                    label="Estoque max"
                    name="stockMax"
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
                    error={errors.stockMax}
                    // helperText={errors.stockMax.message}
                  />
                  <div>
                    {errors?.stockMax?.type && <InputError field="stockMax" />}
                  </div>
                </div>

                {/* 3 */}
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
                        {...register("type")}
                        id="type"
                        className="peer rounded-md w-full px-3 py-3.5   text-sm border-gray-200 border-2 focus:bg-white bg-white
            placeholder-shown:bg-gray-200 placeholder-shown:border-none placeholder-transparent"
                      >
                        <option value="">inserir valor</option>
                        {typeArr.map((option, i) => (
                          <option value={option.id}>{option.nome}</option>
                        ))}
                      </select>

                      <label
                        style={{
                          backgroundColor: "#F3E2E0",
                        }}
                        htmlFor="type"
                        className="absolute left-2 -top-2.5 px-1 text-xs transition-all bg-white rounded text-black-500
             peer-placeholder-shown:text-xs peer-placeholder-shown:text-black-500
             peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-gray-200 peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-black-500 peer-focus:bg-white peer-focus:font-semibol"
                      >
                        Tipo
                      </label>
                    </div>

                    <div>
                      {errors?.type?.type && <InputError field="type" />}
                    </div>
                  </div>

                  <div className="  ">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        console.log("sup");
                        setProductVisible(0);
                        setToOther(1);
                        setFormTypeVisible(1);
                      }}
                      className="transition duration-200 rounded bg-[#B23F30] drop-shadow-2xl w-full py-4 flex items-center justify-center hover:bg-[#8b3226]"
                    >
                      <FaPlus size={24} className="text-white" />
                    </button>
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
                    // helperText={errors.name.message}
                  />
                  <div>
                    {errors?.observations?.type && (
                      <InputError field="observations" />
                    )}
                  </div>
                </div>
              </div>

              {/* </Box> */}
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
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default FormProduct;
