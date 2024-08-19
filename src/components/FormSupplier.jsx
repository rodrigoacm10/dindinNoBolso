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
import {
  ufMask,
  numberMask,
  cepMask,
  cpfMask,
  phoneMask,
  cnpjMask,
} from "../utils/masks";
import { SidebarContext } from "../context/sidebarContext";

// import { yupResolver } from "@hookform/resolvers/yup";

function FormSupplier({
  //   checkoutBrandSchema,

  handleSupplierSubmit,
  setSupplierVisible,
  setIsConcluded,
  supplierVisible,
  isConcluded,
  loading,
  //   novos
  //   handleSubmit,
  //   register,
  //   error,
  // product
}) {
  const { repeatNameErr, setRepeatNameErr } = useContext(SidebarContext);

  const [person, setPerson] = useState("legalPerson");
  const [valueDate, setValueDate] = useState("");

  const [addressQuant, setAddressQuant] = useState([]);

  //   CPF: yup
  //   .string()
  //   .min(11, "o CPF deve ser válido")
  //   .max(11, "o CPF deve ser válido")
  //   .required("preencha o campo"),
  // CNPJ: yup
  //   .string()
  //   .min(14, "o CNPJ deve ser válido")
  //   .max(14, "o CNPJ deve ser válido")
  //   .required("preencha o campo"),

  const checkoutBrandSchema = yupResolver(
    yup.object({
      name: yup.string().required("inserir campo"),
      personType: yup.string().required("inserir campo"),
      phone: yup.string().required("inserir campo"),
      email: yup.string().required("inserir campo"),
      socialReason: yup.string().required("inserir campo"),
      fantasyName: yup.string().required("inserir campo"),
      cnpj: yup.string().required("inserir campo"),
      cep: yup.string().required("inserir campo"),
      street: yup.string().required("inserir campo"),
      number: yup.string().required("inserir campo"),
      district: yup.string().required("inserir campo"),
      city: yup.string().required("inserir campo"),
      uf: yup.string().required("inserir campo"),
      complement: yup.string().required("inserir campo"),
    })
  );

  const checkoutPhysicalSchema = yupResolver(
    yup.object({
      name: yup.string().required("inserir campo"),
      personType: yup.string().required("inserir campo"),
      phone: yup.string().required("inserir campo"),
      email: yup.string().required("inserir campo"),
      // socialReason: yup.string().required("inserir campo"),
      // fantasyName: yup.string().required("inserir campo"),
      cpf: yup.string().required("inserir campo"),
      cep: yup.string().required("inserir campo"),
      street: yup.string().required("inserir campo"),
      number: yup.string().required("inserir campo"),
      district: yup.string().required("inserir campo"),
      city: yup.string().required("inserir campo"),
      uf: yup.string().required("inserir campo"),
      complement: yup.string().required("inserir campo"),
    })
  );

  // const checkoutBrandSchema = yup.object().shape({
  //   name: yup.string().required("preencha o campo"),
  // });

  const changeSchemaFunc = (personType) => {
    // console.log(formSchema);
    if (personType == "legalPerson") {
      return checkoutBrandSchema;
    } else {
      return checkoutPhysicalSchema;
    }
  };

  const formMethods = useForm({
    resolver: changeSchemaFunc(person),
    defaultValues: {},
  });
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = formMethods;

  const cepValue = watch("cep");
  const phoneValue = watch("phone");
  const cpfValue = watch("cpf");
  const numberValue = watch("number");
  const ufValue = watch("uf");
  const cnpjValue = watch("cnpj");

  useEffect(() => {
    setValue("cep", cepMask(cepValue));
    setValue("phone", phoneMask(phoneValue));
    setValue("number", numberMask(numberValue));
    setValue("uf", ufMask(ufValue));

    if (person == "legalPerson") {
      setValue("cnpj", cnpjMask(cnpjValue));
    } else if (person == "physicalPerson") {
      setValue("cpf", cpfMask(cpfValue));
    }
  }, [numberValue, phoneValue, cpfValue, ufValue, cepValue, cnpjValue, person]);

  const fakeObj = [
    {
      text: "testText",
      value: "testValue",
    },
  ];

  function InputError({ field }) {
    // @ts-expect-error
    return (
      <p className="text-xs text-left text-[#B23F30] px-4 font-bol">
        {errors[field].message}
      </p>
    );
  }

  function NewAddress({ index }) {
    return (
      <>
        <div className="col-span-2 grid grid-cols-4 items-start  gap-2">
          <div className="col-span-3">
            <TextField
              {...register(`cep${index + 1}`)}
              type="text"
              label="CEP"
              name={`cep${index + 1}`}
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
              error={errors[`cep${index + 1}`]}
              // helperText={errors.cep.message}
            />
            <div>
              {errors[`cep${index + 1}`]?.type && (
                <InputError field={`cep${index + 1}`} />
              )}
            </div>
          </div>

          <div className="  ">
            <button
              onClick={(e) => {
                e.preventDefault();

                const newArr = addressQuant.slice(0, addressQuant.length - 1);
                setAddressQuant([...newArr]);
              }}
              className="transition duration-200 rounded  drop-shadow-2xl w-full py-4 flex items-center justify-center   hover:bg-[#484848] bg-[#616060]"
            >
              <IoMdClose size={24} className="text-white" />
            </button>
          </div>
        </div>

        <div className="col-span-2">
          <TextField
            {...register(`street${index + 1}`)}
            type="text"
            label="Rua"
            name={`street${index + 1}`}
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
            error={errors[`street${index + 1}`]}
            // helperText={errors.street.message}
          />
          <div>
            {errors[`street${index + 1}`]?.type && (
              <InputError field={`street${index + 1}`} />
            )}
          </div>
        </div>

        <div className="">
          <TextField
            {...register(`number${index + 1}`)}
            type="text"
            label="Número"
            name={`number${index + 1}`}
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
            error={errors[`number${index + 1}`]}
            // helperText={errors.number.message}
          />
          <div>
            {errors[`number${index + 1}`]?.type && (
              <InputError field={`number${index + 1}`} />
            )}
          </div>
        </div>

        <div className="">
          <TextField
            {...register(`district${index + 1}`)}
            type="text"
            label="Bairro"
            name={`district${index + 1}`}
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
            error={errors[`district${index + 1}`]}
            // helperText={errors.district.message}
          />
          <div>
            {errors[`district${index + 1}`]?.type && (
              <InputError field={`district${index + 1}`} />
            )}
          </div>
        </div>

        <div className="">
          <TextField
            {...register(`city${index + 1}`)}
            type="text"
            label="Cidade"
            name={`city${index + 1}`}
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
            error={errors[`city${index + 1}`]}
            // helperText={errors.city.message}
          />
          <div>
            {errors[`city${index + 1}`]?.type && (
              <InputError field={`city${index + 1}`} />
            )}
          </div>
        </div>

        <div className="">
          <TextField
            {...register(`uf${index + 1}`)}
            type="text"
            label="UF"
            name={`uf${index + 1}`}
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
            error={errors[`uf${index + 1}`]}
            // helperText={errors.uf.message}
          />
          <div>
            {errors[`uf${index + 1}`]?.type && (
              <InputError field={`uf${index + 1}`} />
            )}
          </div>
        </div>

        <div className="col-span-2">
          <TextField
            {...register(`complement${index + 1}`)}
            type="text"
            label="Complemento"
            name={`complement${index + 1}`}
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
            error={errors[`complement${index + 1}`]}
            // helperText={errors.complement.message}
          />
          <div>
            {errors[`complement${index + 1}`]?.type && (
              <InputError field={`complement${index + 1}`} />
            )}
          </div>
        </div>
      </>
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
        visibility: `${supplierVisible == 0 ? "hidden" : "none"}`,
      }}
      className={`${supplierVisible == 0 ? "" : "animationOpacity"}`}
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
              setSupplierVisible(0);
              setRepeatNameErr(false);
              setIsConcluded(false);
            }}
          >
            <IoMdClose style={{ height: "28px", width: "28px" }} />
          </Button>
        </Box>
        <Box textAlign="center" p="40px">
          <h1 className="text-2xl sm:text-3xl font-bold">Deseja adicionar </h1>
          <h1 className="text-2xl sm:text-3xl font-bold">
            um novo Fornecedor?
          </h1>
          <Typography textAlign="center" pt="15px" fontFamily="Poppins">
            {" "}
            preencha as informações abaixo
          </Typography>
          <div className="flex items-start mt-5 px-1">
            {/* <div className="text-sm flex items-center gap-2">
              <button
                onClick={() => {
                  setAddressQuant([...addressQuant, "a"]);
                }}
                className=" transition duration-200 hover:bg-[#8b3226] bg-[#B23F30] rounded py-2 px-3"
              >
              
                <FaPlus className="text-white" />
              </button>
              adicionar endereço
            </div> */}
          </div>
          <Box>
            <form onSubmit={handleSubmit(handleSupplierSubmit)}>
              {/* <Box pt="30px" display="flex" flexDirection="column" gap="20px"> */}
              <div className="grid grid-cols-2 mt-1 gap-2 gap-y-3 max-h-80 scroll-classes overflow-scroll pt-2 px-1">
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
                  <div>{errors?.name?.type && <InputError field="name" />}</div>
                </div>
                {/* // )} */}

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
                        {...register("personType")}
                        id="personType"
                        className="peer rounded-md w-full px-3 py-3.5   text-sm border-gray-200 border-2 focus:bg-white bg-white
            placeholder-shown:bg-gray-200 placeholder-shown:border-none placeholder-transparent"
                        onChange={(e) => {
                          setPerson(e.target.value);
                          // console.log(e.target.value);
                          // console.log("a", e.target.value);
                          // console.log("valdate", valueDate);
                          // console.log("aaaa", getValues("personType"));
                          // if (
                          //   e.target.value == "today" ||
                          //   e.target.value == "inCash"
                          // ) {
                          //   setTypeDate("inCash");
                          //   console.log("changeToday");
                          //   // colocar o set value('dateBorn', valor ) aki
                          //   // setValue("date", dateMask(dateValue))
                          //   setValue(
                          //     "dateBorn",
                          //     `${new Date().toISOString().split("T")[0]}`
                          //   );
                          // } else {
                          //   setTypeDate("inTerm");
                          //   console.log("changeTerm");
                          //   // colocar o set value aki
                          //   setValue("dateBorn", "");
                          // }
                          // setFormSchema(e.target.value);
                        }}
                      >
                        <option value="legalPerson">pessoa jurídica</option>
                        <option value="physicalPerson">pessoa física</option>
                      </select>

                      {/* <label
                        style={{
                          backgroundColor: "#F3E2E0",
                        }}
                        htmlFor="personType"
                        className="absolute left-2 -top-2.5 px-1 text-xs transition-all bg-white rounded text-black-500
             peer-placeholder-shown:text-xs peer-placeholder-shown:text-black-500
             peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-gray-200 peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-black-500 peer-focus:bg-white peer-focus:font-semibol"
                      >
                        Pagamento
                      </label> */}
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
                    <div>{errors?.cpf?.type && <InputError field="cpf" />}</div>
                  </div>
                )}

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
                  <div>{errors?.cep?.type && <InputError field="cep" />}</div>
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
                    {errors?.street?.type && <InputError field="street" />}
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
                    {errors?.number?.type && <InputError field="number" />}
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
                    {errors?.district?.type && <InputError field="district" />}
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
                  <div>{errors?.city?.type && <InputError field="city" />}</div>
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
                  <div>{errors?.uf?.type && <InputError field="uf" />}</div>
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

                {addressQuant.map((e, i) => {
                  return <NewAddress index={i} />;
                })}
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
                    nome de contato já existente
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

export default FormSupplier;
