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
  getOneSupplier,
  getSupplier,
  getType,
} from "../services/APIService";
import {
  cepMask,
  cpfMask,
  numberMask,
  phoneMask,
  saleValueMask,
  stockMask,
  stockMaxMask,
  stockMinMask,
  ufMask,
} from "../utils/masks";
// import { yupResolver } from "@hookform/resolvers/yup";

function SupplierInfos({
  //   checkoutBrandSchema,

  //-   handleBrandSubmit,
  setSupplierInfosVisible,
  setIsConcluded,
  supplierInfosVisible,
  isConcluded,

  //   novos
  //   handleSubmit,
  //   register,
  //   error,
}) {
  const [editing, setEditing] = useState(false);
  const [editAddress, setEditAddress] = useState({
    editing: false,
    idAddress: 0,
  });

  const {
    valuesProduct,
    setValuesProduct,
    attData,
    attDataFunc,
    supplierValues,
  } = useContext(SidebarContext);

  const [person, setPerson] = useState(
    supplierValues.personType ? "physicalPerson" : "legalPerson"
  );
  const [valueDate, setValueDate] = useState("");

  const [supplierInfo, setSupplierInfo] = useState({
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
  });
  const [brandArr, setBrandArr] = useState([]);
  const [supplierArr, setSupplierArr] = useState([]);
  const [typesArr, setTypesArr] = useState([]);

  const [supplierName, setSupplierName] = useState("");
  const [typeName, setTypeName] = useState("");
  const [brandName, setBrandName] = useState("");

  // criar akl função pra trocar o scjema baseado no editAddress.editing
  const checkoutBrandSchema = yupResolver(
    yup.object({
      name: yup.string().required("inserir campo"),
    })
  );
  // nome
  const checkoutAddressSchema = yupResolver(
    yup.object({
      uf: yup.string().max(2, "UF inválida"),
    })
  );

  const changeSchemaFunc = (address) => {
    if (address) {
      return checkoutAddressSchema;
    } else {
      return checkoutBrandSchema;
    }
  };

  console.log(valuesProduct.values);

  const getInfos = async () => {
    const infos = await getOneSupplier(supplierValues.id);

    console.log(supplierValues.address);

    if (infos.data) {
      setSupplierInfo(infos.data);
    }

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
  //   id: row.id,
  //   nameContact: row.nome_contato,
  //   phone: row.telefone,
  //   email: row.email,
  //   personType: row.pessoa_fisica,
  //   cnpj: row.cnpj,
  //   cpf: row.cpf,
  //   nameFantasy: row.nome_fantasia,
  //   social: row.razao_social,
  //   address: address.data,

  const [cepVal, setCepVal] = useState("");

  const formMethods = useForm({
    resolver: changeSchemaFunc(editAddress.editing),
    defaultValues: {
      // supplierValues
      // legalPerson
      // physicalPerson
      name: supplierValues.nameContact,
      personType: supplierValues.personType ? "physicalPerson" : "legalPerson",
      phone: supplierValues.phone,
      email: supplierValues.email,
      socialReason: supplierValues.social,
      fantasyName: supplierValues.nameFantasy,
      cnpj: supplierValues.cnpj,
      cpf: supplierValues.cpf,
      cep: cepVal,
      // street
      // number
      // district
      // city
      // uf
      // complement
    },

    // defaultValues: defaultValFunc(editing),
  });

  //   name
  // personType
  // phone
  // email
  // socialReason
  // fantasyName
  // cnpj
  // cpf
  // cep
  // street
  // number
  // district
  // city
  // uf
  // complement

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = formMethods;

  const cepValue = watch("cep");
  const phoneValue = watch("phone");
  const cpfValue = watch("cpf");
  const numberValue = watch("number");
  const ufValue = watch("uf");

  useEffect(() => {
    setValue("cep", cepMask(cepValue));
    setValue("phone", phoneMask(phoneValue));
    setValue("cpf", cpfMask(cpfValue));
    setValue("number", numberMask(numberValue));
    setValue("uf", ufMask(ufValue));
  }, [numberValue, phoneValue, cpfValue, ufValue, cepValue]);

  const handleSupplierSubmit = async (values) => {
    console.log("submitBtnSupplier", values);
    // const edit = await editFullProduct(valuesProduct.id, values);
    // console.log("edit", edit);

    attDataFunc();
  };

  const handleAddressSubmit = async (values) => {
    console.log("submitBtnAddress", values);
    // const edit = await editFullProduct(valuesProduct.id, values);
    // console.log("edit", edit);

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
        visibility: `${supplierInfosVisible == 0 ? "hidden" : "none"}`,
      }}
      className={`${supplierInfosVisible == 0 ? "" : "animationOpacity"}`}
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
              setSupplierInfosVisible(0);
              setIsConcluded(false);
            }}
          >
            <IoMdClose style={{ height: "28px", width: "28px" }} />
          </Button>
        </Box>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Box textAlign="center" p="40px">
            <h1 className="text-3xl font-bold">Informações </h1>
            <h1 className="text-3xl font-bold">do fornecedor</h1>
            <Typography textAlign="center" pt="15px" fontFamily="Poppins">
              {" "}
              analise as informações abaixo
            </Typography>
            <div
              className={`flex items-start mt-5  ${
                editing || editAddress.editing ? "" : "px-6"
              }  `}
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (!editAddress.editing) {
                      setEditing(!editing);
                    }

                    setEditAddress({
                      editing: false,
                      idAddress: 0,
                    });
                  }}
                  className="transition duration-200 hover:bg-[#8b3226] bg-[#B23F30] rounded py-2 px-3"
                >
                  {editing || editAddress.editing ? (
                    <IoMdClose className="text-white" />
                  ) : (
                    <FaPencilAlt className="text-white" />
                  )}
                </button>

                {editing || editAddress.editing ? "cancelar" : "editar"}
              </div>
            </div>
            {!editing && !editAddress.editing ? (
              <Box
                width="375px"
                className="grid grid-cols-2 mt-5 gap-2 gap-y-10 max-h-80 scroll-classes overflow-scroll pt-2  px-6 "
              >
                <div className="col-span-2 grid grid-cols-3 gap-4  ">
                  <div>
                    <p className="font-semibold text-start w-48">
                      nome contato
                    </p>
                    <p className="text-start pt-4 ">
                      {supplierValues.nameContact}
                    </p>
                  </div>
                  <div></div>
                  <div>
                    <p className="font-semibold text-start w-32">pessoa</p>
                    <p className="text-start pt-4 ">
                      {supplierValues.personType ? "fisica" : "juridica"}
                    </p>
                  </div>
                </div>

                {supplierValues.personType ? (
                  ""
                ) : (
                  <div className="col-span-2 grid grid-cols-3 gap-4  ">
                    <div>
                      <p className="font-semibold text-start w-48">
                        nome fantasia
                      </p>
                      <p className="text-start pt-4 ">
                        {supplierValues.nameFantasy}
                      </p>
                    </div>
                    <div></div>{" "}
                    <div>
                      <p className="font-semibold text-start w-32">nome</p>
                      <p className="text-start pt-4 ">{/* {brandName} */}</p>
                    </div>
                  </div>
                )}

                <div className="col-span-2 grid grid-cols-3 gap-4  ">
                  <div>
                    <p className="font-semibold text-start">telefone</p>
                    <p className="text-start pt-4 w-48 ">
                      {`${supplierValues.phone}`}
                    </p>
                  </div>
                  <div></div>{" "}
                  <div>
                    <p className="font-semibold text-start w-32">e-mail</p>
                    <p className="text-start pt-4 ">{supplierValues.email}</p>
                  </div>
                </div>

                <div className="col-span-2 grid grid-cols-3 gap-4  ">
                  <div>
                    <p className="font-semibold text-start">
                      {supplierValues.personType ? "CPF" : "CNPJ"}
                    </p>
                    <p className="text-start pt-4 ">
                      {supplierValues.personType
                        ? supplierValues.cpf
                        : supplierValues.cnpj}
                    </p>
                  </div>
                  <div></div>
                  <div></div>
                </div>
                {supplierValues.address.map((e, i) => {
                  return (
                    <>
                      <div className="col-span-2 grid grid-cols-3 gap-4  ">
                        <div className="flex items-center">
                          <p className="font-semibold text-start w-48">
                            {`ENDEREÇO ${i + 1}`}
                          </p>{" "}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(ev) => {
                                ev.preventDefault();
                                setEditAddress({
                                  editing: !editAddress.editing,
                                  idAddress: e.id,
                                });
                                console.log(e.cep);
                                // setCepVal(e.cep);
                                setValue("cep", e.cep);
                                setValue("street", e.rua);
                                setValue("number", `${e.numero}`);
                                setValue("district", e.bairro);
                                setValue("city", e.cidade);
                                setValue("uf", e.uf);
                                setValue("complement", e.complemento);
                              }}
                              className="transition duration-200 hover:bg-[#8b3226] bg-[#B23F30] rounded py-2 px-3"
                            >
                              {editAddress.editing ? (
                                <IoMdClose className="text-white" />
                              ) : (
                                <FaPencilAlt className="text-white" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div></div>
                      </div>

                      <div className="col-span-2 grid grid-cols-3 gap-4  ">
                        <div>
                          <p className="font-semibold text-start">CEP</p>
                          <p className="text-start pt-4 ">{e.cep}</p>
                        </div>
                        <div></div>
                        <div>
                          <p className="font-semibold text-start w-32">
                            bairro
                          </p>
                          <p className="text-start pt-4 ">{e.bairro}</p>
                        </div>
                      </div>

                      <div className="col-span-2 grid grid-cols-3 gap-4  ">
                        <div>
                          <p className="font-semibold text-start">rua</p>
                          <p className="text-start pt-4 ">{e.rua}</p>
                        </div>
                        <div></div>
                        <div>
                          <p className="font-semibold text-start w-32">
                            número
                          </p>
                          <p className="text-start pt-4 ">{e.numero}</p>
                        </div>
                      </div>

                      <div className="col-span-2 grid grid-cols-3 gap-4  ">
                        <div>
                          <p className="font-semibold text-start">cidade</p>
                          <p className="text-start pt-4 ">{e.cidade}</p>
                        </div>
                        <div></div>
                        <div>
                          <p className="font-semibold text-start w-32">UF</p>
                          <p className="text-start pt-4 ">{e.uf}</p>
                        </div>
                      </div>

                      <div className="col-span-2 grid grid-cols-3 gap-4  ">
                        <div>
                          <p className="font-semibold text-start">
                            complemento
                          </p>
                          <p className="text-start pt-4 ">{e.complemento}</p>
                        </div>
                        <div></div>
                        <div></div>
                      </div>
                    </>
                  );
                })}
              </Box>
            ) : (
              <form
                onSubmit={handleSubmit(
                  !editAddress.editing
                    ? handleSupplierSubmit
                    : handleAddressSubmit
                )}
              >
                {/* <Box pt="30px" display="flex" flexDirection="column" gap="20px"> */}
                <div className="grid grid-cols-2 mt-1 gap-2 gap-y-3 max-h-80 scroll-classes overflow-scroll pt-2 px-1">
                  {!editAddress.editing ? (
                    <>
                      {" "}
                      {/* {person != "legalPerson" && (
                        <div>
                          <TextField
                            {...register("dateBorn")}
                            fullWidth
                            // variant="filled"
                            type="date"
                            // label="date"

                            // onChange={handleChange}
                            onChange={(e) => {
                              // handleChange(e);
                              setValue("dateBorn", e.target.value);
                              setValueDate(e.target.value);
                              console.log(e.target.value);
                              console.log(getValues("dateBorn"));
                              if (
                                getValues("dateBorn") <
                                `${new Date().toISOString().split("T")[0]}`
                              ) {
                                console.log("aabbccddee");
                                // errors.dateBorn.type = true;
                                errors[field].message = "teste";
                              }
                            }}
                            value={valueDate}
                            // value={values.date}
                            name="dateBorn"
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
                              getValues("dateBorn") >
                              `${new Date().toISOString().split("T")[0]}`
                            }
                            // helperText={touched.date && errors.date}
                          />
                          {getValues("dateBorn") >
                            `${new Date().toISOString().split("T")[0]}` && (
                            <p className="text-xs text-left text-[#B23F30] px-4 font-bol">
                              data inválida
                            </p>
                          )}
                        </div>
                      )} */}
                      {/* {person == "legalPerson" && ( */}
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
                      {/* )} */}
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
                              disabled
                              {...register("personType")}
                              id="personType"
                              className="peer rounded-md w-full px-3 py-3.5   text-sm border-gray-200 border-2 focus:bg-white bg-white
            placeholder-shown:bg-gray-200 placeholder-shown:border-none placeholder-transparent"
                              onChange={(e) => {
                                setPerson(e.target.value);
                              }}
                            >
                              <option value="legalPerson">
                                pessoa jurídica
                              </option>
                              <option value="physicalPerson">
                                pessoa física
                              </option>
                            </select>
                          </div>
                          <div>
                            {errors?.personType?.type && (
                              <InputError field="personType" />
                            )}
                          </div>
                        </div>
                      </div>
                      {/* {person != "legalPerson" && (
                        <div className="col-span-2">
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
                            className="w-full"
                            error={errors.name}
                            // helperText={errors.name.message}
                          />
                          <div>
                            {errors?.name?.type && <InputError field="name" />}
                          </div>
                        </div>
                      )} */}
                      <div className="">
                        <TextField
                          {...register("phone")}
                          type="text"
                          label="Telefone"
                          name="phone"
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
                          error={errors.phone}
                          // helperText={errors.phone.message}
                        />
                        <div>
                          {errors?.phone?.type && <InputError field="phone" />}
                        </div>
                      </div>
                      <div className="">
                        <TextField
                          {...register("email")}
                          type="text"
                          label="E-mail"
                          name="email"
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
                          error={errors.email}
                          // helperText={errors.email.message}
                        />
                        <div>
                          {errors?.email?.type && <InputError field="email" />}
                        </div>
                      </div>
                      {person == "legalPerson" && (
                        <div className="col-span-2">
                          <TextField
                            {...register("socialReason")}
                            type="text"
                            label="Razão social"
                            name="socialReason"
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
                            className="w-full"
                            error={errors.socialReason}
                            // helperText={errors.socialReason.message}
                          />
                          <div>
                            {errors?.socialReason?.type && (
                              <InputError field="socialReason" />
                            )}
                          </div>
                        </div>
                      )}
                      {person == "legalPerson" && (
                        <div className="col-span-2">
                          <TextField
                            {...register("fantasyName")}
                            type="text"
                            label="Nome fantasia"
                            name="fantasyName"
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
                            className="w-full"
                            error={errors.fantasyName}
                            // helperText={errors.fantasyName.message}
                          />
                          <div>
                            {errors?.fantasyName?.type && (
                              <InputError field="fantasyName" />
                            )}
                          </div>
                        </div>
                      )}
                      {person == "legalPerson" ? (
                        <div className="col-span-2">
                          <TextField
                            {...register("cnpj")}
                            type="text"
                            label="CNPJ"
                            name="cnpj"
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
                            className="w-full"
                            error={errors.cnpj}
                            // helperText={errors.cnpj.message}
                          />
                          <div>
                            {errors?.cnpj?.type && <InputError field="cnpj" />}
                          </div>
                        </div>
                      ) : (
                        <div className="col-span-2">
                          <TextField
                            {...register("cpf")}
                            type="text"
                            label="CPF"
                            name="cpf"
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
                            className="w-full"
                            error={errors.cpf}
                            // helperText={errors.cpf.message}
                          />
                          <div>
                            {errors?.cpf?.type && <InputError field="cpf" />}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {" "}
                      <div className="col-span-2">
                        <TextField
                          {...register("cep")}
                          type="text"
                          label="CEP"
                          name="cep"
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
                          className="w-full"
                          error={errors.cep}
                          // helperText={errors.cep.message}
                        />
                        <div>
                          {errors?.cep?.type && <InputError field="cep" />}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <TextField
                          {...register("street")}
                          type="text"
                          label="Rua"
                          name="street"
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
                          className="w-full"
                          error={errors.street}
                          // helperText={errors.street.message}
                        />
                        <div>
                          {errors?.street?.type && (
                            <InputError field="street" />
                          )}
                        </div>
                      </div>
                      <div className="">
                        <TextField
                          {...register("number")}
                          type="text"
                          label="Número"
                          name="number"
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
                          className="w-full"
                          error={errors.number}
                          // helperText={errors.number.message}
                        />
                        <div>
                          {errors?.number?.type && (
                            <InputError field="number" />
                          )}
                        </div>
                      </div>
                      <div className="">
                        <TextField
                          {...register("district")}
                          type="text"
                          label="Bairro"
                          name="district"
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
                          className="w-full"
                          error={errors.district}
                          // helperText={errors.district.message}
                        />
                        <div>
                          {errors?.district?.type && (
                            <InputError field="district" />
                          )}
                        </div>
                      </div>
                      <div className="">
                        <TextField
                          {...register("city")}
                          type="text"
                          label="Cidade"
                          name="city"
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
                          className="w-full"
                          error={errors.city}
                          // helperText={errors.city.message}
                        />
                        <div>
                          {errors?.city?.type && <InputError field="city" />}
                        </div>
                      </div>
                      <div className="">
                        <TextField
                          {...register("uf")}
                          type="text"
                          label="UF"
                          name="uf"
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
                          className="w-full"
                          error={errors.uf}
                          // helperText={errors.uf.message}
                        />
                        <div>
                          {errors?.uf?.type && <InputError field="uf" />}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <TextField
                          {...register("complement")}
                          type="text"
                          label="Complemento"
                          name="complement"
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
                          className="w-full"
                          error={errors.complement}
                          // helperText={errors.complement.message}
                        />
                        <div>
                          {errors?.complement?.type && (
                            <InputError field="complement" />
                          )}
                        </div>
                      </div>
                    </>
                  )}
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
                    ADICIONAR
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

export default SupplierInfos;
