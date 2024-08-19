import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { phoneMask } from "../utils/masks";
import { SidebarContext } from "../context/sidebarContext";

// import { yupResolver } from "@hookform/resolvers/yup";

function FormClient({
  //   checkoutBrandSchema,
  handleClientSubmit,
  setClientVisible,
  setIsConcluded,
  clientVisible,
  isConcluded,
  //  setContactType,
  setIsWhatsappNo,
  isWhatsappYes,
  //   contactType,
  loading,
  //   novos
  //   handleSubmit,
  //   register,
  //   error,
}) {
  const [showPhone, setShowPhone] = useState("phoneAndEmail");
  const [showEmail, setShowEmail] = useState("email");
  const [typeForm, setTypeForm] = useState("phoneAndEmail");

  const { repeatNameErr, setRepeatNameErr } = useContext(SidebarContext);

  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    setShowPhone(
      selectedOption === "phoneAndEmail" || selectedOption === "phone"
    );
    setShowEmail(
      selectedOption === "phoneAndEmail" || selectedOption === "email"
    );
  };

  const checkoutAddClientePhone = yupResolver(
    yup.object({
      name: yup.string().required("inserir campo"),
      phone: yup.string().required("inserir campo"),
    })
  );

  const checkoutAddClienteEmail = yupResolver(
    yup.object({
      name: yup.string().required("inserir campo"),
      email: yup.string().required("inserir campo"),
    })
  );

  const checkoutAddClientePhoneAndEmail = yupResolver(
    yup.object({
      name: yup.string().required("inserir campo"),
      phone: yup.string().required("inserir campo"),
      email: yup.string().required("inserir campo"),
    })
  );

  const changeSchemaFunc = (selectedOption) => {
    // console.log(selectedOption);
    if (selectedOption == "phoneAndEmail") {
      return checkoutAddClientePhoneAndEmail;
    } else if (selectedOption == "email") {
      return checkoutAddClienteEmail;
    } else if (selectedOption == "phone") {
      return checkoutAddClientePhone;
    }
  };

  // const checkoutBrandSchema = yup.object().shape({
  //   name: yup.string().required("preencha o campo"),
  // });

  const formMethods = useForm({
    resolver: changeSchemaFunc(typeForm),
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = formMethods;

  const phoneValue = watch("phone");
  useEffect(() => {
    setValue("phone", phoneMask(phoneValue));
  }, [phoneValue]);

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
        visibility: `${clientVisible == 0 ? "hidden" : "none"}`,
      }}
      className={`${clientVisible == 0 ? "" : "animationOpacity"}`}
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
              setClientVisible(0);
              setRepeatNameErr(false);
              setIsConcluded(false);
            }}
          >
            <IoMdClose style={{ height: "28px", width: "28px" }} />
          </Button>
        </Box>
        <Box textAlign="center" p="40px">
          <h1 className="text-2xl sm:text-3xl font-bold">Deseja cadastrar </h1>
          <h1 className="text-2xl sm:text-3xl font-bold">um novo Cliente?</h1>
          <Typography textAlign="center" pt="15px" fontFamily="Poppins">
            {" "}
            preencha as informações abaixo
          </Typography>
          <Box>
            <form onSubmit={handleSubmit(handleClientSubmit)}>
              {/* <Box pt="30px" display="flex" flexDirection="column" gap="20px"> */}
              <div className="grid grid-cols-2 mt-5 gap-5 gap-y-3 max-h-96  ">
                <div className="">
                  <select
                    className="w-full"
                    style={{
                      padding: "15px",
                      fontSize: "16px",
                      borderRadius: "4px",
                    }}
                    {...register("contactType")}
                    onChange={(e) => {
                      handleSelectChange(e);
                      setTypeForm(e.target.value);
                    }}
                    // onChange={(e) => setContactType(e.target.value)}
                  >
                    <option value="phoneAndEmail">telefone e E-mail</option>
                    <option value="phone">telefone</option>
                    <option value="email">E-mail</option>
                  </select>
                </div>
                <div className="text-sm">
                  <p>Possui whatsapp?</p>
                  <Box justifyContent="center" display="flex" gap="10px">
                    <Box display="flex" gap="5px">
                      <input
                        type="checkbox"
                        onChange={() => {
                          setIsWhatsappNo(!isWhatsappYes);
                        }}
                      />
                      <p>sim</p>
                    </Box>
                  </Box>
                </div>

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
                  />
                  <div>{errors?.name?.type && <InputError field="name" />}</div>
                </div>
                {showPhone && (
                  <div className="col-span-2">
                    <TextField
                      {...register("phone")}
                      type="text"
                      label="Telefone"
                      name="phone"
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
                      error={errors.phone}
                    />

                    <div>
                      {errors?.phone?.type && <InputError field="phone" />}
                    </div>
                  </div>
                )}

                {showEmail && (
                  <div className="col-span-2">
                    <TextField
                      {...register("email")}
                      type="text"
                      label="E-mail"
                      name="email"
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
                      error={errors.email}
                      // helperText={errors.name.message}
                    />

                    <div>
                      {errors?.email?.type && <InputError field="email" />}
                    </div>
                  </div>
                )}
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

export default FormClient;
