import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaPlus } from "react-icons/fa";
import { MenuItem } from "react-pro-sidebar";
import { FaPencilAlt } from "react-icons/fa";
import { SidebarContext } from "../context/sidebarContext";
import { useContext, useEffect, useState } from "react";
import { values } from "lodash";
import {
  editFullProduct,
  getBrand,
  getOneFullProduct,
  getSupplier,
  getType,
} from "../services/APIService";
import {
  saleValueMask,
  stockMask,
  stockMaxMask,
  stockMinMask,
} from "../utils/masks";
// import { yupResolver } from "@hookform/resolvers/yup";

function ProductsInfos({
  //   checkoutBrandSchema,

  //-   handleBrandSubmit,
  setProductsInfosVisible,
  setIsConcluded,
  productsInfosVisible,
  isConcluded,

  //   novos
  //   handleSubmit,
  //   register,
  //   error,
}) {
  const [editing, setEditing] = useState(false);

  const {
    valuesProduct,
    setValuesProduct,
    attData,
    attDataFunc,
    productsArr,
    supplierArr,
    brandArr,
    typeArr: typesArr,
  } = useContext(SidebarContext);

  const [productInfos, setProductInfos] = useState({
    nome: "test",
    codigo_referencia: "",
    estoque_atual: 0,
    estoque_minimo: 0,
    estoque_maximo: 0,
    preco: "",
    observacao: "",
    fornecedor_id: "",
    marca_id: "",
    categoria_produto_id: "",
    valor_custo: "",
    margem_lucro: "",
  });
  // const [brandArr, setBrandArr] = useState([]);
  // const [supplierArr, setSupplierArr] = useState([]);
  // const [typesArr, setTypesArr] = useState([]);

  const [supplierName, setSupplierName] = useState("");
  const [typeName, setTypeName] = useState("");
  const [brandName, setBrandName] = useState("");

  const checkoutBrandSchema = yupResolver(
    yup.object({
      name: yup.string().required("inserir campo"),
    })
  );
  // nome

  console.log(valuesProduct.values);

  const getInfos = async () => {
    const infos = await getOneFullProduct(valuesProduct.id);
    // const brands = await getBrand();
    // const suppliers = await getSupplier();
    // const types = await getType();

    const supplierString = supplierArr.find(
      (el) => el.id == valuesProduct.supplierId
    );
    console.log("suplier", supplierString);
    if (supplierString) setSupplierName(supplierString.nome_contato);

    const typeString = typesArr.find((el) => el.id == valuesProduct.typeId);
    console.log("type", typeString);
    if (typeString) setTypeName(typeString.nome);

    const brandString = brandArr.find((el) => el.id == valuesProduct.brandId);
    console.log("brand", brandString);
    if (brandString) setBrandName(brandString.nome);

    console.log("info", infos.data);

    console.log(supplierArr, valuesProduct.supplierId);
    // console.log(
    //   supplierArr.find((el) => el.id == valuesProduct.supplierId).nome_contato
    // );

    if (infos.data) {
      setProductInfos(infos.data);
    }
    // setBrandArr([...brands.data]);
    // setSupplierArr([...suppliers.data]);
    // setTypesArr([...types.data]);

    console.log(suppliers.data);
    console.log(valuesProduct);

    // brandId
    // suppliersId
    // typesId

    console.log(
      suppliers.data.find((el) => el.id == valuesProduct.suppliersId)
    );

    console.log(infos);
  };

  useEffect(() => {
    getInfos();
  }, [attData]);
  // const checkoutBrandSchema = yup.object().shape({
  //   name: yup.string().required("preencha o campo"),
  // });

  // valuesProduct.values
  // colocar o defaultvalues pra funcionar
  const formMethods = useForm({
    resolver: checkoutBrandSchema,
    defaultValues: {
      name: valuesProduct.values.nome,
      code: valuesProduct.values.codigo_referencia,
      stockMin: valuesProduct.values.estoque_minimo,
      stockMax: valuesProduct.values.estoque_maximo,
      stockCur: valuesProduct.values.estoque_atual,

      saleValue: valuesProduct.values.preco,
      observations: valuesProduct.values.observacao,
      supplier: valuesProduct.values.fornecedor_id,
      brand: valuesProduct.values.marca_id,
      type: valuesProduct.values.categoria_produto_id,
    },

    // defaultValues: defaultValFunc(editing),
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = formMethods;

  const saleValueValue = watch("saleValue");
  const stockMinValue = watch("stockMin");
  const stockMaxValue = watch("stockMax");

  useEffect(() => {
    console.log(saleValueValue, stockMinValue);
    setValue("saleValue", saleValueMask(saleValueValue));
  }, [saleValueValue, stockMinValue, stockMaxValue]);

  const handleProductSubmit = async (values) => {
    console.log("submitBtn", values);
    const edit = await editFullProduct(valuesProduct.id, values);
    console.log("edit", edit);

    attDataFunc();
  };

  function InputError({ field }) {
    // @ts-expect-error
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
        visibility: `${productsInfosVisible == 0 ? "hidden" : "none"}`,
      }}
      className={`${productsInfosVisible == 0 ? "" : "animationOpacity"}`}
    >
      <Box
        className="centralized "
        transition="all 0.5s"
        backgroundColor="#7A7A7A"
        borderRadius="9px"
        zIndex="101"
        p="10px 10px"
        sx={{
          maxWidth: "450px",
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="end">
          <Button
            sx={{ color: "black" }}
            onClick={(e) => {
              // console.log(e.target.style.color);
              setProductsInfosVisible(0);
              setIsConcluded(false);
            }}
          >
            <IoMdClose style={{ height: "28px", width: "28px" }} />
          </Button>
        </Box>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Box textAlign="center" p="40px">
            <h1 className="text-3xl font-bold">Informações </h1>
            <h1 className="text-3xl font-bold">do produto</h1>
            <Typography textAlign="center" pt="15px" fontFamily="Poppins">
              {" "}
              analise as informações abaixo
            </Typography>
            <div className={`flex items-start mt-5 ${editing ? "" : "px-6"} `}>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditing(!editing)}
                  className="transition duration-200 hover:bg-[#8b3226] bg-[#B23F30] rounded py-2 px-3"
                >
                  {editing ? (
                    <IoMdClose className="text-white" />
                  ) : (
                    <FaPencilAlt className="text-white" />
                  )}
                </button>

                {editing ? "cancelar" : "editar"}
              </div>
            </div>
            {!editing ? (
              <Box
                width="375px"
                className="grid grid-cols-2 mt-5 gap-2 gap-y-10 max-h-80 scroll-classes overflow-scroll pt-2  px-6 "
              >
                <div className="col-span-2 grid grid-cols-3 gap-4  ">
                  <div>
                    <p className="font-semibold text-start">nome</p>
                    <p className="text-start pt-4 ">{productInfos.nome}</p>
                  </div>
                  <div></div>
                  <div>
                    <p className="font-semibold text-start w-32">código</p>
                    <p className="text-start pt-4 ">
                      {productInfos.codigo_referencia}
                    </p>
                  </div>
                </div>

                <div className="col-span-2 grid grid-cols-3 gap-4  ">
                  <div>
                    <p className="font-semibold text-start">fornecedor</p>
                    <p className="text-start pt-4 ">{supplierName}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-start">tipo</p>
                    <p className="text-start pt-4 ">{typeName}</p>
                  </div>{" "}
                  <div>
                    <p className="font-semibold text-start w-32">marca</p>
                    <p className="text-start pt-4 ">{brandName}</p>
                  </div>
                </div>

                <div className="col-span-2 grid grid-cols-3 gap-4  ">
                  <div>
                    <p className="font-semibold text-start">estoque</p>
                    <p className="text-start pt-4 ">
                      {`${productInfos.estoque_atual}`}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-start">estoque min</p>
                    <p className="text-start pt-4 ">
                      {productInfos.estoque_minimo}
                    </p>
                  </div>{" "}
                  <div>
                    <p className="font-semibold text-start w-32">estoque max</p>
                    <p className="text-start pt-4 ">
                      {productInfos.estoque_maximo}
                    </p>
                  </div>
                </div>

                <div className="col-span-2 grid grid-cols-3 gap-4  ">
                  <div>
                    <p className="font-semibold text-start">valor venda</p>
                    <p className="text-start pt-4 ">R$ {productInfos.preco}</p>
                  </div>
                  <div></div>
                  <div>
                    <p className="font-semibold text-start w-32">
                      margem lucro (3 vendas)
                    </p>
                    <p className="text-start pt-4 ">
                      {productInfos.margem_lucro}%
                    </p>
                  </div>
                </div>

                <div className="col-span-2 grid grid-cols-3 gap-4  ">
                  <div>
                    <p className="font-semibold text-start">
                      valor custo (3 vendas)
                    </p>
                    <p className="text-start pt-4 ">
                      R$ {productInfos.valor_custo}
                    </p>
                  </div>
                  <div></div>
                  <div>
                    <p className="font-semibold text-start w-32">observações</p>
                    <p className="text-start pt-4 ">
                      {productInfos.observacao}
                    </p>
                  </div>
                </div>
              </Box>
            ) : (
              <form onSubmit={handleSubmit(handleProductSubmit)}>
                {/* <Box pt="30px" display="flex" flexDirection="column" gap="20px"> */}
                <div className="grid grid-cols-2 mt-5 gap-2 gap-y-3 max-h-80 scroll-classes overflow-scroll pt-2 px-1">
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
                    <div>
                      {errors?.name?.type && <InputError field="name" />}
                    </div>
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
                    <div>
                      {errors?.code?.type && <InputError field="code" />}
                    </div>
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
                          disabled
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
                        </select>

                        <label
                          style={{
                            backgroundColor: "#D6CDCC",
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

                  {/* <div>
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

                        const saleNum = `${
                          valNum + (valNum * profitVal) / 100
                        }`;
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
                  </div> */}

                  <div className="col-span-2">
                    <TextField
                      {...register("saleValue")}
                      InputProps={{
                        readOnly: true,
                      }}
                      type="text"
                      label="Valor venda"
                      name="saleValue"
                      className="w-full"
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

                  <div className="col-span-2">
                    <TextField
                      {...register("stockCur")}
                      type="text"
                      label="Estoque atual"
                      name="stockCur"
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
                      error={errors.stockCur}
                      // helperText={errors.name.message}
                    />
                    <div>
                      {errors?.stockCur?.type && (
                        <InputError field="stockCur" />
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
                      {errors?.stockMin?.type && (
                        <InputError field="stockMin" />
                      )}
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
                      {errors?.stockMax?.type && (
                        <InputError field="stockMax" />
                      )}
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
                          disabled
                          id="type"
                          className="peer rounded-md w-full px-3 py-3.5   text-sm border-gray-200 border-2 focus:bg-white bg-white
            placeholder-shown:bg-gray-200 placeholder-shown:border-none placeholder-transparent"
                        >
                          <option value="">inserir valor</option>
                          {typesArr.map((option, i) => (
                            <option value={option.id}>{option.nome}</option>
                          ))}
                        </select>

                        <label
                          style={{
                            backgroundColor: "#D6CDCC",
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
                    }}
                  >
                    EDITAR
                  </Button>
                </Box>
              </form>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductsInfos;

{
  /* <form onSubmit={handleSubmit(handleBrandSubmit)}>
 
<div className="grid grid-cols-2 mt-5 gap-2 gap-y-3 max-h-96  ">
  <div className="col-span-2">
    <TextField
      {...register("name")}
      type="text"
      label="Nome"
      name="name"
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
      error={errors.name}
      // helperText={errors.name.message}
    />
    <div>{errors?.name?.type && <InputError field="name" />}</div>
  </div>
</div>


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
    }}
  >
    ADICIONAR
  </Button>
</Box>
</form> */
}
