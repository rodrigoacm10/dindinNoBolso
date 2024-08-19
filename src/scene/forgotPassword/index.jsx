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
import { emailMessage } from "../../services/APIService";
import { useState } from "react";
// import { recoverPassword } from "../../services/APIService";

const initialValues = {
  email: "",
};

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
});

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Enviado2");

  const handleFormSubmit = async (values) => {
    // console.log(values);
    setLoading(false);
    const response = await emailMessage(values.email);
    // console.log(response);
    if (response) {
      setMessage("enviado");
    }
    setLoading(true);
    // console.log(emailMessage());
    //   emailMessage();
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
            informe seu <span style={{ color: "#B23F30" }}> E-mail</span>
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
                  // label="Email"
                  onChange={(e) => {
                    handleChange(e);
                    setEmail(e.target.value);
                  }}
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  error={!!touched.email && !!errors.email}
                  // helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 2" }}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    E-mail
                  </InputLabel>
                  <OutlinedInput
                    id="email"
                    // id="outlined-adornment-password"
                    type="text"
                    label="E-mail"
                  />
                  {/* <FormHelperText sx={{ color: "#d32f2f" }} id="my-helper-text">
                    {touched.email && errors.email ? errors.email : ""}
                    {!errors.email ? "E-mail ou senha inválidos" : ""}
                  
                  </FormHelperText> */}
                {/* </FormControl> */}
                {/* */}

                <TextField
                  type="text"
                  label="E-mail"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
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
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
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
                      {message}
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

export default ForgotPassword;
