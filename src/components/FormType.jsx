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
import { useContext } from "react";
import { SidebarContext } from "../context/sidebarContext";

// import { yupResolver } from "@hookform/resolvers/yup";

function FormType({
  //   checkoutBrandSchema,

  handleFormTypeSubmit,
  setFormTypeVisible,
  setIsConcluded,
  formTypeVisible,
  isConcluded,
  loading,
  //   novos
  //   handleSubmit,
  //   register,
  //   error,
}) {
  const { repeatNameErr, setRepeatNameErr } = useContext(SidebarContext);

  const checkoutBrandSchema = yupResolver(
    yup.object({
      name: yup.string().required("inserir campo"),
    })
  );

  // const checkoutBrandSchema = yup.object().shape({
  //   name: yup.string().required("preencha o campo"),
  // });

  const formMethods = useForm({
    resolver: checkoutBrandSchema,
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = formMethods;

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
        visibility: `${formTypeVisible == 0 ? "hidden" : "none"}`,
      }}
      className={`${formTypeVisible == 0 ? "" : "animationOpacity"}`}
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
              setFormTypeVisible(0);
              setRepeatNameErr(false);
              setIsConcluded(false);
            }}
          >
            <IoMdClose style={{ height: "28px", width: "28px" }} />
          </Button>
        </Box>
        <Box textAlign="center" p="40px">
          <h1 className="text-2xl sm:text-3xl font-bold">Deseja cadastrar </h1>
          <h1 className="text-2xl sm:text-3xl font-bold">um novo Tipo?</h1>
          <Typography textAlign="center" pt="15px" fontFamily="Poppins">
            {" "}
            preencha as informações abaixo
          </Typography>
          <Box>
            <form onSubmit={handleSubmit(handleFormTypeSubmit)}>
              {/* <Box pt="30px" display="flex" flexDirection="column" gap="20px"> */}
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

export default FormType;
