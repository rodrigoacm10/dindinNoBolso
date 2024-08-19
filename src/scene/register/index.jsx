import * as yup from "yup";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  authAxios,
  createUser,
  registerPostFunc,
} from "../../services/APIService";
import logo from "../../assets/logo-dindin.png";
import terms from "../../assets/termosDeUso.pdf";
import { LoginContext } from "../../context/loginContext";
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Cookies from "universal-cookie";

// console.log

const initialValues = {
  name: "",
  lastName: "",
  email: "",
  CPF: "",
  CNPJ: "",
  CPFOrCNPJ: "",
  companyName: "",
  password: "",
  confirmPassword: "",
  typeAcc: "CNPJ",
  checked: "",
};

const MEISchema = yup.object().shape({
  email: yup.string().email("invalid email").required("preencha o campo"),
  CNPJ: yup
    .string()
    .min(14, "o CNPJ deve ser válido")
    .max(14, "o CNPJ deve ser válido")
    .required("preencha o campo"),

  companyName: yup.string().required("preencha o campo"),
  password: yup
    .string()
    .min(8, "a senha deve ter no mínimo 8 caracteres")
    .required("preencha o campo"),
  confirmPassword: yup
    .string()
    .when(
      "password",
      // This function receives the password as an argument
      (password) => {
        return password
          ? yup
              .string()
              .oneOf([yup.ref("password"), null], "As senhas devems ser iguais")
          : yup.string();
      }
    )
    .required("preencha o campo"),
  checked: yup.string().required("aceite os termos de uso"),
});

// mei
const PersonSchema = yup.object().shape({
  name: yup.string().required("preencha o campo"),
  lastName: yup.string().required("preencha o campo"),
  email: yup.string().email("invalid email").required("preencha o campo"),
  CPF: yup
    .string()
    .min(11, "o CPF deve ser válido")
    .max(11, "o CPF deve ser válido")
    .required("preencha o campo"),

  password: yup
    .string()
    .min(8, "a senha deve ter no mínimo 8 caracteres")
    .required("preencha o campo"),
  confirmPassword: yup
    .string()
    .when(
      "password",
      // This function receives the password as an argument
      (password) => {
        return password
          ? yup
              .string()
              .oneOf([yup.ref("password"), null], "As senhas devems ser iguais")
          : yup.string();
      }
    )
    .required("preencha o campo"),
  checked: yup.string().required("aceite os termos de uso"),
});

const checkoutSchema = yup.object().shape({
  name: yup.string().required("preencha o campo"),
  lastName: yup.string().required("preencha o campo"),
  email: yup.string().email("invalid email").required("preencha o campo"),
  CPF: yup
    .string()
    .min(11, "o CPF deve ser válido")
    .max(11, "o CPF deve ser válido")
    .required("preencha o campo"),
  CNPJ: yup
    .string()
    .min(14, "o CNPJ deve ser válido")
    .max(14, "o CNPJ deve ser válido")
    .required("preencha o campo"),
  CPFOrCNPJ: yup
    .string()
    .min(11, "o CPF deve ser válido")
    .max(11, "o CPF deve ser válido")
    .required("preencha o campo"),
  companyName: yup.string().required("preencha o campo"),

  password: yup
    .string()
    .min(8, "a senha deve ter no mínimo 8 caracteres")
    .required("preencha o campo"),
  confirmPassword: yup
    .string()
    .when(
      "password",
      // This function receives the password as an argument
      (password) => {
        return password
          ? yup
              .string()
              .oneOf([yup.ref("password"), null], "As senhas devems ser iguais")
          : yup.string();
      }
    )
    .required("preencha o campo"),
});

function Register() {
  const cookies = new Cookies();

  const { registerAndSignUp } = useContext(LoginContext);
  const [findUser, setFindUser] = useState(true);
  const [loading, setLoading] = useState(false);

  const [checked, setChecked] = useState(true);
  const [validators, setValidators] = useState("CNPJ");
  const [cnpjOrCpf, setCnpjOrCpf] = useState(true);

  const [registerType, setRegisterType] = useState("CNPJ");

  const navigate = useNavigate();

  const typeAccount = [
    {
      value: "CNPJ",
      description: "Empresa",
    },
    // {
    //   value: "ADMIN",
    //   description: "Administrador",
    // },
    {
      value: "physicalPerson",
      description: "Pessoa física",
    },
  ];

  const validate = (
    values,
    props /* only available when using withFormik */
  ) => {
    // AQUI VAMOS FZR A VALIDAÇÃO COM O BANCO DE DADOS, IREMOS JOGAR OS DADOS E CASO RETORNE UM ERRO, AGENTE VAI COLOCAR UM errors.email e errors.password = 'usuário não encontrado
    const errors = {};

    // if (!checked) {
    //   errors.checked = "é preciso aceitar os termos";
    // }

    // if (!values.email) {
    //   errors.email = "Required";
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //   errors.email = "Invalid email address";
    // }

    //...

    return errors;
  };

  const handleChange = (event) => {
    setChecked(!checked);
  };

  const handleFormSubmit = async (values) => {
    // console.log(values);
    // const response = await registerPostFunc(
    //   values.name,
    //   values.lastName,
    //   values.email,
    //   values.password,
    //   values.confirmPassword
    // );
    // correct abaixo
    // const response = await registerAndSignUp(
    //   values.name,
    //   values.lastName,
    //   values.email,
    //   values.password,
    //   values.confirmPassword
    // );
    setLoading(true);
    // console.log(
    //   values.name,
    //   values.lastName,
    //   values.email,
    //   values.password,
    //   values.companyName,
    //   values.CPFOrCNPJ,
    //   values.typeAcc,
    //   values.CPF,
    //   values.CNPJ
    // );
    const response = await createUser(
      values.name,
      values.lastName,
      values.email,
      values.password,
      values.companyName,
      values.CPFOrCNPJ,
      values.typeAcc,
      values.CPF,
      values.CNPJ
    );
    setLoading(false);
    // console.log(response);
    if (response) {
      setFindUser(false);
    } else if (!response) {
      setFindUser(true);
    }

    if (!response) return;
    // console.log("---------- aaa vai dar errado -------");
    // window.location.href = "/dashboard";

    cookies.set("nextauth.token", response.data.token, {
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });

    authAxios.defaults.headers.Token = response.data.token;

    // localStorage.setItem("@Auth:token", JSON.stringify(response.data.token));
    // let localToken = localStorage.getItem("acessToken");
    // console.log(JSON.parse(localToken));
    return navigate("/initialPage");
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
        p="34px 34px 30px"
        border="1px solid #C8C8C8"
        backgroundColor="#ffffff"
        borderRadius="9px"
      >
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          mb="35px"
          gap="5px"
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
            Criar conta <span style={{ color: "#B23F30" }}>Dindin</span>{" "}
          </Typography>
          <Typography variant="p">
            <span style={{ color: "#B23F30" }}>Crie</span> Sua Conta Dindin
          </Typography>
        </Box>

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validate={validate}
          validationSchema={
            registerType == "MEI" || registerType == "CNPJ"
              ? MEISchema
              : PersonSchema
          }
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
                rowGap="15px"
                columnGap="20px"
                // gap="20px"
              >
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(2, 1fr)"
                  gap="20px"
                  gridColumn="span 2"
                >
                  <TextField
                    // fullWidth
                    select
                    onChange={(e) => {
                      handleChange(e);
                      // console.log(e.target.value);
                      setRegisterType(e.target.value);
                      // console.log(registerType);
                      if (values.typeAcc == "CNPJ" || values.typeAcc == "MEI") {
                        setCnpjOrCpf(false);
                        setValidators("CPF");
                      } else if (
                        values.typeAcc == "ADMIN" ||
                        values.typeAcc == "physicalPerson"
                      ) {
                        setValidators("CNPJ");
                        setCnpjOrCpf(true);
                      }
                    }}
                    value={values.typeAcc}
                    name="typeAcc"
                    label="Tipo de conta"
                    defaultValue="-"
                    sx={
                      {
                        // bgcolor: "#F3E2E0",
                        // borderRadius: "4px",
                        // "& .MuiFormLabel-root": {
                        //   // borderTop: "none",
                        //   backgroundColor: "#F3E2E0",
                        //   borderRadius: "4px",
                        //   pr: "10px",
                        //   pl: "10px",
                        //   color: "black",
                        // },
                      }
                    }
                  >
                    {/* {values.typeAcc == "MEI"
                      ? (values.name = values.lastName = "-")
                      : (values.name = values.lastName = "")}
                    {values.typeAcc == "MEI"
                      ? (values.CPF = 1)
                      : (values.CPF = "")}

                    {values.typeAcc == "physicalPerson"
                      ? (values.CNPJ = 1)
                      : (values.CNPJ = "")}
                    {values.typeAcc == "physicalPerson"
                      ? (values.companyName = "-")
                      : (values.companyName = "")} */}

                    {typeAccount.map((option, i) => (
                      <MenuItem key={i} value={option.value}>
                        {option.description}
                      </MenuItem>
                    ))}
                  </TextField>

                  {values.typeAcc == "MEI" || values.typeAcc == "CNPJ" ? (
                    <Box sx={{ gridColumn: "span 1" }}>
                      <FormControl
                        // label="E-mail "
                        fullWidth
                        type="text"
                        id="CNPJ"
                        name="CNPJ"
                        onChange={handleChange}
                        value={values.CNPJ}
                        // sx={{ gridColumn: "span 2" }}
                        onBlur={handleBlur}
                        error={!!touched.CNPJ && !!errors.CNPJ}
                        helpertext={touched.CNPJ && errors.CNPJ}
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          CNPJ
                        </InputLabel>
                        <OutlinedInput
                          id="CNPJ"
                          // id="outlined-adornment-password"
                          type="text"
                          label="Password"
                        />
                        <FormHelperText
                          id="my-helper-text"
                          sx={{ color: "#d32f2f" }}
                        >
                          {touched.CNPJ && errors.CNPJ ? errors.CNPJ : ""}
                          {/* {!(errors.email === "required") && !findUser
                            ? "O E-mail já está sendo utilizado"
                            : ""} */}
                        </FormHelperText>
                      </FormControl>
                    </Box>
                  ) : (
                    <Box sx={{ gridColumn: "span 1" }}>
                      <FormControl
                        // label="E-mail "
                        fullWidth
                        id="CPF"
                        type="text"
                        name="CPF"
                        onChange={handleChange}
                        value={values.CPF}
                        // sx={{ gridColumn: "span 2" }}
                        onBlur={handleBlur}
                        error={!!touched.CPF && !!errors.CPF}
                        helpertext={touched.CPF && errors.CPF}
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          CPF
                        </InputLabel>
                        <OutlinedInput
                          id="CPF"
                          // id="outlined-adornment-password"
                          type="CPF"
                          label="Password"
                        />
                        <FormHelperText
                          id="my-helper-text"
                          sx={{ color: "#d32f2f" }}
                        >
                          {touched.CPF && errors.CPF ? errors.CPF : ""}
                          {!(errors.email === "required") && !findUser
                            ? "O E-mail já está sendo utilizado"
                            : ""}
                        </FormHelperText>
                      </FormControl>
                    </Box>
                  )}
                </Box>
                {values.typeAcc == "MEI" || values.typeAcc == "CNPJ" ? (
                  ""
                ) : (
                  <TextField
                    // id="outlined-password-input"
                    label="Nome"
                    type="text"
                    // autoComplete="current-password"
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                    sx={{ gridColumn: "span 1" }}
                    onBlur={handleBlur}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                  />
                )}

                {values.typeAcc == "MEI" || values.typeAcc == "CNPJ" ? (
                  ""
                ) : (
                  <TextField
                    // id="outlined-password-input"
                    label="Sobrenome"
                    type="text"
                    // autoComplete="current-password"
                    name="lastName"
                    onChange={handleChange}
                    value={values.lastName}
                    sx={{ gridColumn: "span 1" }}
                    onBlur={handleBlur}
                    error={!!touched.lastName && !!errors.lastName}
                    helperText={touched.lastName && errors.lastName}
                  />
                )}

                {values.typeAcc == "physicalPerson" ||
                values.typeAcc == "ADMIN" ? (
                  ""
                ) : (
                  <TextField
                    // id="outlined-password-input"
                    label="Nome da empresa"
                    type="text"
                    // autoComplete="current-password"
                    name="companyName"
                    onChange={handleChange}
                    value={values.companyName}
                    sx={{ gridColumn: "span 2" }}
                    onBlur={handleBlur}
                    error={!!touched.companyName && !!errors.companyName}
                    helperText={touched.companyName && errors.companyName}
                  />
                )}

                {/* <Box
                  display="grid"
                  gridTemplateColumns="repeat(2, 1fr)"
                  gridColumn="span 2"
                  gap="20px"
                > */}

                {/* </Box> */}

                <FormControl
                  // label="E-mail "
                  type="text"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  sx={{ gridColumn: "span 2" }}
                  onBlur={handleBlur}
                  error={!!touched.email && !!errors.email}
                  helpertext={touched.email && errors.email}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    E-mail
                  </InputLabel>
                  <OutlinedInput
                    id="email"
                    // id="outlined-adornment-password"
                    type="text"
                    label="Password"
                  />
                  <FormHelperText id="my-helper-text" sx={{ color: "#d32f2f" }}>
                    {touched.email && errors.email ? errors.email : ""}
                    {!(errors.email === "required") && !findUser
                      ? "O E-mail já está sendo utilizado"
                      : ""}
                  </FormHelperText>
                </FormControl>

                <FormControl
                  //   error
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  sx={{ gridColumn: "span 2" }}
                  variant="outlined"
                  onBlur={handleBlur}
                  error={!!touched.password && !!errors.password}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Senha
                  </InputLabel>
                  <OutlinedInput
                    id="password"
                    // id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          name="btn"
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  <FormHelperText id="my-helper-text" sx={{ color: "#d32f2f" }}>
                    {touched.password && errors.password ? errors.password : ""}
                    {/* {!(errors.password === "required") && !findUser
                      ? "E-mail ou senha inválidos"
                      : ""} */}
                  </FormHelperText>
                </FormControl>

                <FormControl
                  //   error
                  name="confirmPassword"
                  onChange={handleChange}
                  value={values.confirmPassword}
                  sx={{ gridColumn: "span 2" }}
                  variant="outlined"
                  onBlur={handleBlur}
                  error={!!touched.confirmPassword && !!errors.confirmPassword}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Confirmar senha
                  </InputLabel>
                  <OutlinedInput
                    // id="outlined-adornment-password"

                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          name="btn"
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label=" Confirm Password"
                  />
                  <FormHelperText sx={{ color: "#d32f2f" }} id="my-helper-text">
                    {touched.confirmPassword && errors.confirmPassword
                      ? errors.confirmPassword
                      : ""}
                    {/* {!(errors.confirmPassword === "required") && !findUser
                      ? "E-mail ou senha inválidos"
                      : ""} */}
                  </FormHelperText>
                </FormControl>
              </Box>

              <Box display="flex" gap="10px" pt="10px">
                <input
                  type="checkbox"
                  onChange={() => {
                    setChecked(!checked);
                    if (!checked) {
                      values.checked = "";
                    } else if (checked) {
                      values.checked = "yes";
                    }
                  }}
                />
                <p style={{ fontSize: "14px" }}>
                  {" "}
                  aceito os{" "}
                  <a href={terms} target="_blank" className="serviceAndTerms">
                    termos de serviço
                  </a>{" "}
                </p>
              </Box>
              <FormHelperText id="my-helper-text" sx={{ color: "#d32f2f" }}>
                {errors.checked ? errors.checked : ""}
              </FormHelperText>

              <Box display="flex" justifyContent="space-between" mt="50px">
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button
                    variant="text"
                    sx={{
                      textTransform: "none",
                      display: "block",
                      color: "#B23F30",
                      ":hover": {
                        color: "#8b3226",
                      },
                    }}
                  >
                    Já tenho conta
                  </Button>
                </Link>

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    fontSize: "16px",
                    textTransform: "none",
                    backgroundColor: "#B23F30",
                    ":hover": {
                      backgroundColor: "#8b3226",
                    },
                  }}
                >
                  {/* mandar o usuário pra pagina de login ou já pro dashboard */}
                  {loading ? (
                    <CircularProgress
                      size="24px"
                      style={{ color: "#ffffff" }}
                    />
                  ) : (
                    "Criar Conta"
                  )}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export default Register;
