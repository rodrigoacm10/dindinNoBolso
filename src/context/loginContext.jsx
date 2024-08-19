import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../services/firebaseConfig";
import { createContext, useState } from "react";
import {
  loginGoogle,
  postFunction,
  registerPostFunc,
} from "../services/APIService";

// console.log

const user = {
  nome: "aaa",
  clients: [
    {
      name: "nomde do cliente",
      valueTotal: "toda a receita gera por esse cliente",
      totalUnits: "todas as unidades compradas",
      contact: "contato (email)",
    },
  ],
  categorys: ["qualquer1", "qualquer2", "qualquer3"],
  products: [
    {
      name: "camisa",
      valueTotal: "toda a receita gerada por esse produto",
      totalUnits: "todas as unidades vendidas",
    },
    {
      name: "short",
      valueTotal: "toda a receita gerada por esse produto",
      totalUnits: "todas as unidades vendidas",
    },
  ],
};

const provider = new GoogleAuthProvider();

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState({});
  const [idUser, setIdUser] = useState({});

  // deu errado
  const settingUser = async (userTest) => {
    setUser(userTest);
    // console.log(user);
  };

  const signUp = async (email, password) => {
    const response = await postFunction(email, password);
    // console.log("--", response);
    if (!response) return false;
    setUser(response.id);
    setIdUser(response.id);
    // console.log("user --", user);
    // console.log("iduser --", idUser);
    return response;
  };

  const registerAndSignUp = async (
    name,
    lastName,
    email,
    password,
    confirmPassword
  ) => {
    const response = await registerPostFunc(
      name,
      lastName,
      email,
      password,
      confirmPassword
    );

    if (!response) return false;
    setUser(response);
    return response;
  };

  const signInGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const userGoogle = result.user;
        // console.log(userGoogle);
        // console.log(userGoogle.email);
        setUser(userGoogle);
        const response = await loginGoogle(
          userGoogle.email,
          userGoogle.displayName
        );
        // console.log(user);
        // console.log(response);
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <LoginContext.Provider
      value={{
        settingUser,
        registerAndSignUp,
        signUp,
        signInGoogle,
        signed: !!user,
        user,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
