import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import logo from "../../assets/logo-dindin.png";
import { Formik } from "formik";
import * as yup from "yup";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { newPassword } from "../../services/APIService";

// console.log

function RecoverPassword() {
  const [loading, setLoading] = useState(false);

  //   const { token } = useParams();
  const token = useLocation().search.split("=")[1];

  useEffect(() => {
    // console.log(token);
  }, []);

  const initialValues = {
    //   code: "",
    newPassword: "",
  };

  const checkoutSchema = yup.object().shape({
    //   code: yup.string().required("required"),
    newPassword: yup
      .string()
      .min(8, "a senha deve ter no mínimo 8 caracteres")
      .required("preencha o campo"),
  });

  const handleFormSubmit = async (values) => {
    // console.log(values);

    // console.log(token, values.newPassword);

    setLoading(false);
    const response = await newPassword(token, values.newPassword);
    // console.log(response);
    setLoading(true);
  };

  return (
    <Box
      // width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        width="450px"
        // p="48px 40px 36px"
        p="40px 40px 36px"
        border="1px solid #C8C8C8"
        backgroundColor="#ffffff"
        borderRadius="9px"
      >
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          mb="35px"
          gap="10px"
        >
          {/* colocar a logo aki */}

          <img
            src={logo}
            alt="logo dindin"
            style={{
              height: "150px",
              width: "150px",
            }}
          />
          <Typography variant="h5">
            Esqueci a <span style={{ color: "#B23F30" }}>senha</span>{" "}
          </Typography>
          <Typography variant="p">
            informe sua nova <span style={{ color: "#B23F30" }}> senha</span>
          </Typography>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={checkoutSchema}
          // validate={validate}
          onSubmit={handleFormSubmit}
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
                display="grid"
                gridTemplateColumns="repeat(2, 1fr)"
                gap="20px"
              >
                {/* <FormControl
                    fullWidth
                    // variant="filled"
                    type="text"
                    // label="code"
                    onChange={(e) => {
                      handleChange(e);
                      setcode(e.target.value);
                    }}
                    value={values.code}
                    name="code"
                    onBlur={handleBlur}
                    error={!!touched.code && !!errors.code}
                    // helperText={touched.code && errors.code}
                    sx={{ gridColumn: "span 2" }}
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      E-mail
                    </InputLabel>
                    <OutlinedInput
                      id="code"
                      // id="outlined-adornment-password"
                      type="text"
                      label="E-mail"
                    />
                    {/* <FormHelperText sx={{ color: "#d32f2f" }} id="my-helper-text">
                      {touched.code && errors.code ? errors.code : ""}
                      {!errors.code ? "E-mail ou senha inválidos" : ""}
                    
                    </FormHelperText> */}
                {/* </FormControl> */}
                {/* */}

                {/* <TextField
                  type="text"
                  label="código"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.code}
                  name="code"
                  sx={{
                    gridColumn: "span 2",
                    // bgcolor: "#F3E2E0",
                    borderRadius: "4px",
                    "& .MuiFormLabel-root": {
                      //   backgroundColor: "#F3E2E0",
                      borderRadius: "4px",
                      pr: "10px",
                      pl: "10px",
                      color: "black",
                    },
                  }}
                  error={!!touched.code && !!errors.code}
                  helperText={touched.code && errors.code}
                /> */}

                <TextField
                  type="text"
                  label="nova senha"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.newPassword}
                  name="newPassword"
                  sx={{
                    gridColumn: "span 2",
                    // bgcolor: "#F3E2E0",
                    borderRadius: "4px",
                    "& .MuiFormLabel-root": {
                      //   backgroundColor: "#F3E2E0",
                      borderRadius: "4px",
                      pr: "10px",
                      pl: "10px",
                      color: "black",
                    },
                  }}
                  error={!!touched.newPassword && !!errors.newPassword}
                  helperText={touched.newPassword && errors.newPassword}
                />

                <Box
                  gridColumn="span 2"
                  //   borderBottom="1px solid #C8C8C8"
                  paddingBottom="10px"
                >
                  {loading && (
                    <p
                      className="animationStartBottom"
                      style={{ textAlign: "center", color: "#B23F30" }}
                    >
                      alterado
                    </p>
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      fontSize: "16px",
                      textTransform: "none",
                      // gridColumn: "span 2",
                      // borderBottom: "10px solid black",
                      width: "100%",
                      backgroundColor: "#B23F30",
                      ":hover": {
                        backgroundColor: "#8b3226",
                      },
                    }}
                  >
                    Enviar
                    {/* {loading ? (
              <CircularProgress
                size="24px"
                style={{ color: "#ffffff" }}
              />
            ) : (
              "Entrar"
            )} */}
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export default RecoverPassword;
