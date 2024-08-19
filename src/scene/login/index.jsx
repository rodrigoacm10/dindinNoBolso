import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { useContext, useEffect, useState } from "react";
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
  loginUser,
  postFunction,
} from "../../services/APIService";
import GoogleIcon from "@mui/icons-material/Google";
import logo from "../../assets/logo-dindin.png";
// import GoogleLogin from "react-google-login";
// import GoogleButton from "react-google-button";
import { LoginContext } from "../../context/loginContext";
import { TokenContext } from "../../context/tokenContext";
// import GoogleLogin from "react-google-login";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import Cookies from "universal-cookie";
// console.log

const initialValues = {
  email: "",
  password: "",
};

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

function Login() {
  const cookies = new Cookies();
  const { settingUser, signUp, signInGoogle } = useContext(LoginContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [findUser, setFindUser] = useState(true);
  const { tokenUser, setTokenFunc } = useContext(TokenContext);
  const [loading, setLoading] = useState(false);
  const [validPassEmail, setValidPassEmail] = useState(true);

  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      // console.log("logando");
      setUser(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          setProfile(res.data);
          // console.log(res.data);
          // console.log(res.data.email);
          const response = await createUser(
            res.data.name,
            "",
            res.data.email,
            "1",
            "",
            "",
            "physicalPerson",
            "12345678910",
            ""
          );
          // console.log(response);
          localStorage.setItem(
            "@Auth:token",
            JSON.stringify(response.data.token)
          );
          let localToken = localStorage.getItem("acessToken");
          // console.log(JSON.parse(localToken));
          // faço a requisição pro back aki, jogo o email e tals
          return navigate("/initialPage");
        });
      // .catch((err) => console.log(err));
    }
  }, [user]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  const navigate = useNavigate();

  async function loginGoogle() {
    await signInGoogle();
  }

  // const respGoogle = (response) => {
  // console.log(response);
  //   axios
  //     .get(
  //       `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${user.access_token}`,
  //           Accept: "application/json",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       setProfile(res.data);
  //     })
  // .catch((err) => console.log(err));
  // };

  const validate = (
    values,
    props /* only available when using withFormik */
  ) => {
    // AQUI VAMOS FZR A VALIDAÇÃO COM O BANCO DE DADOS, IREMOS JOGAR OS DADOS E CASO RETORNE UM ERRO, AGENTE VAI COLOCAR UM errors.email e errors.password = 'usuário não encontrado
    const errors = {};

    // if (!findUser) {
    //   errors.email = "E-mail ou senha inválidos";
    //   errors.password = "E-mail ou senha inválidos";
    // }
    // console.log(findUser);

    // if (!values.email) {
    //   errors.email = "Required";
    // } else if (
    //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    // ) {
    //   errors.email = "Invalid email address";
    // }

    //...

    // contato@bitloop.com.br

    return errors;
  };

  const handleFormSubmit = async (values) => {
    // console.log(email);
    // console.log(password);
    // console.log(values);

    // const response = await axios.post(
    //   "http://localhost:3000/login",
    //   JSON.stringify({ email, password }),
    //   {
    //     headers: { "Content-Type": "application/json" },
    //   }
    // );

    // console.log(response.data);

    // const response = await postFunction(email, password);
    // correto abaixo
    // const response = await signUp(email, password);
    setValidPassEmail(true);
    setLoading(true);
    const response = await loginUser(email, password);
    setLoading(false);
    setValidPassEmail(false);
    // const respString = `${response.data.token}`;
    // const firstHalf = respString.slice(0, respString.length / 2);
    // console.log(response);
    // console.log(response.data.token);
    // console.log(respString);
    // console.log(firstHalf);
    // console.log(respString.slice(firstHalf.length, respString.length));
    // setTokenFunc(`${firstHalf}`);
    // setTokenFunc(response.data.token);
    cookies.set("nextauth.token", response.data.token, {
      // expires: new Date(Date.now() + 60 * 60 * 1000), // 1h

      expires: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6h
    });

    authAxios.defaults.headers.Token = response.data.token;

    // localStorage.setItem("@Auth:token", JSON.stringify(response.data.token));
    // let localToken = localStorage.getItem("acessToken");
    // console.log(JSON.parse(localToken));
    if (response) {
      setFindUser(true);
    } else if (!response) {
      // console.log("deu erro");
      setFindUser(false);
    }

    if (!response) return;
    // settingUser(response.id);
    // console.log("---------- aaa vai dar errado -------");

    // const resp = JSON.parse(response);
    // console.log(resp);

    // console.log(response.id);

    // <NavLink to="/dashboard" />;
    // navigate("/dashboard");
    // window.location.href = `/dashboard`;

    // window.location.href = `/${response.id}/initialPage`;
    // window.location.href = `/initialPage`;
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
            Fazer <span style={{ color: "#B23F30" }}>login</span>{" "}
          </Typography>
          <Typography variant="p">
            Use Sua <span style={{ color: "#B23F30" }}> Conta Dindin</span>
          </Typography>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={checkoutSchema}
          validate={validate}
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
                <FormControl
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
                  <FormHelperText sx={{ color: "#d32f2f" }} id="my-helper-text">
                    {touched.email && errors.email ? errors.email : ""}
                    {!errors.email && !findUser
                      ? "E-mail ou senha inválidos"
                      : ""}
                    {!validPassEmail ? "E-mail ou senha inválidos" : ""}
                  </FormHelperText>
                </FormControl>

                <FormControl
                  //   error
                  name="password"
                  onChange={(e) => {
                    handleChange(e);
                    setPassword(e.target.value);
                  }}
                  value={values.password}
                  sx={{ gridColumn: "span 2" }}
                  variant="outlined"
                  onBlur={handleBlur}
                  error={!!touched.password && !!errors.password}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="password"
                    // id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
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
                  {/*!( sla oq === "required") */}
                  <FormHelperText sx={{ color: "#d32f2f" }} id="my-helper-text">
                    {touched.password && errors.password ? errors.password : ""}
                    {!(errors.password === "required") && !findUser
                      ? "E-mail ou senha inválidos"
                      : ""}
                    {!validPassEmail ? "E-mail ou senha inválidos" : ""}
                  </FormHelperText>
                </FormControl>
                <Box
                  gridColumn="span 2"
                  borderBottom="1px solid #C8C8C8"
                  paddingBottom="10px"
                >
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
                    {loading ? (
                      <CircularProgress
                        size="24px"
                        style={{ color: "#ffffff" }}
                      />
                    ) : (
                      "Entrar"
                    )}
                  </Button>
                </Box>
              </Box>
              <Box display="grid" gridTemplateColumns="1fr 1fr" mt="10px">
                {/* {profile ? (
                  <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                  </div>
                ) : (
                  <button onClick={() => login()}>
                    Sign in with Google 🚀{" "}
                  </button>
                )} */}
                {/* <GoogleLogin onSuccess={respGoogle} onError={respGoogle} /> */}
                {/* <GoogleLogin
                  clientId="405712504244-i05nmrpqi8i2m4toblkk51gv8fi2diqp.apps.googleusercontent.com"
                  buttonText="Logar com o google"
                  onSuccess={respGoogle}
                  onFailure={respGoogle}
                /> */}
                <Button
                  onClick={() => login()}
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    border: "1px solid #C8C8C8 !important",
                    gridColumn: "span 2",
                    display: "flex",
                    gap: "10px",
                    color: "black",
                  }}
                >
                  <GoogleIcon /> Login com Google
                </Button>

                {/* <GoogleLogin
                  clientId="760718238054-bmsor2rqtnseov70trvhds7p6did5j2g.apps.googleusercontent.com"
                  buttonText="Entrar com o Google"
                  render={(renderProps) => (
                    <Button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      style={{
                        textTransform: "none",
                        gridColumn: "span 2",
                      }}
                    >
                      Sign in with Google
                    </Button>
                  )}
                 
                /> */}
              </Box>

              <Box display="flex" justifyContent="space-between" mt="70px">
                <Link to="/esqueceusenha" style={{ textDecoration: "none" }}>
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
                    Esqueceu a senha?
                  </Button>
                </Link>

                {/* <Typography variant="p" sx={{ mt: "10px", display: "block" }}> */}
                {/* colocar o Link do react-router-dom */}
                {/* Esqueceu sua senha? */}
                {/* </Typography> */}

                <Link to="/register" style={{ textDecoration: "none" }}>
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
                    Criar conta
                  </Button>
                </Link>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export default Login;
