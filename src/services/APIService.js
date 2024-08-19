import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// console.log

// const API_URL = "http://localhost:3000";
// const API_URL_FAKE = "https://fake-back-dash-8rsl.vercel.app";
// https://recicont-api.onrender.com
// const API_URL = "https://recicont-api.onrender.com";

// https://recicont-api.onrender.com
const API_URL = import.meta.env.VITE_API_URL;
// ("https://recicont-api-tn8k.onrender.comhttps://recicont-api-tn8k.onrender.com");
// const API_URL = "https://recicont-api.onrender.com";

let token = cookies.get("nextauth.token");

export const authAxios = axios.create({
  baseURL: API_URL,
  headers: {
    // Authorization: `Bearer ${token}`,
    // "Content-Type": "application/json"
    "Content-Type": "application/json",
    Token: token,
  },
});

// authAxios.interceptors.request.use((config) => {
//   console.log(config);

//   console.log(cookies.get("nextauth.token"));

//   return config;
// });

if (token) {
  authAxios.defaults.headers.Token = `${token}`;
}

const today = new Date().toISOString().split("T")[0];
// token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI3ZDdmNDgwLWY2NTEtNDY5OS05NDkzLTBkMTZlMWFiZmZjMCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE3MDI5MDEyNDEsImV4cCI6MTcwMzE2MDQ0MX0.1OxYEojORM6Hvjs473kt-b1XSO3bkQHHgDkEDIMg7qs";

const correctNum = (num) => {
  // console.log(values);
  let numSale = num.split(" ")[1];
  const dotTrue = numSale.includes(".");
  let cents;
  if (dotTrue) cents = numSale.split(".")[1].length;

  if (!dotTrue) {
    numSale = `${numSale}.00`;
  } else if (cents == 1) {
    numSale = `${numSale}0`;
  } else if (cents == 0) {
    numSale = `${numSale}00`;
  }
  return numSale;
};

export async function getFunction() {
  // const response = await axios.get(`${API_URL_FAKE}/`);
  // return response.data;
}

export async function postFunction(email, password) {
  try {
    // const response = await axios.post(
    //   `${API_URL_FAKE}/login`,
    //   JSON.stringify({ email, password }),
    //   {
    //     headers: { "Content-Type": "application/json" },
    //   }
    // );
    // return response.data;
  } catch (err) {
    // console.log(err);
    // console.log(err.response);
    // console.log(err.response.data.message);
    return false;
  }
}

export async function loginGoogle(email, displayName) {
  try {
    // const response = await axios.post(
    //   `${API_URL_FAKE}/loginGoogle`,
    //   JSON.stringify(
    //     { email, displayName },
    //     {
    //       headers: { "Content-Type": "application/json" },
    //     }
    //   )
    // );
    console.log(email, displayName);
    // return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function registerPostFunc(
  name,
  lastName,
  email,
  password,
  confirmPassword
) {
  try {
    // const response = await axios.post(
    //   `${API_URL_FAKE}/register`,
    //   JSON.stringify({ name, lastName, email, password, confirmPassword }),
    //   {
    //     headers: { "Content-Type": "application/json" },
    //   }
    // );
    // return response.data;
  } catch (err) {
    // console.log(err);
    // console.log(err.response);
    // console.log(err.response.data.message);
    return false;
  }
}

export async function addMovimentPostFunc({
  id,
  category,
  client,
  date,
  description,
  name,
  product,
  typeMov,
  units,
  value,
}) {
  try {
    // const response = await axios.post(
    //   `${API_URL_FAKE}/moviment`,
    //   JSON.stringify({
    //     id,
    //     category,
    //     client,
    //     date,
    //     description,
    //     name,
    //     product,
    //     typeMov,
    //     units,
    //     value,
    //   }),
    //   {
    //     headers: { "Content-Type": "application/json" },
    //   }
    // );
    // return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function movimentsGetFunc({ id }) {
  try {
    // const response = await axios.post(
    //   `${API_URL_FAKE}/getMoviment`,
    //   JSON.stringify({ id }),
    //   {
    //     headers: { "Content-Type": "application/json" },
    //   }
    // );
    // return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function getUserInfos(id) {
  try {
    // const response = await axios.post(
    //   `${API_URL_FAKE}/userInfos`,
    //   JSON.stringify({ id }),
    //   {
    //     headers: { "Content-Type": "application/json" },
    //   }
    // );
    // return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function createUser(
  name,
  lastName,
  email,
  password,
  companyName,
  CPFOrCNPJ,
  accountCategory,
  cpf,
  cnpj
) {
  try {
    if (accountCategory == "MEI") {
      const response = await axios.post(
        `${API_URL}/usuario`,
        JSON.stringify({
          // nome: `${name} ${lastName}`,
          nome: companyName,
          // sobrenome: lastName,
          email: email,
          senha: password,
          // nome_empresa: companyName,
          // cpf_cnpj: CPFOrCNPJ,
          categoria_conta: "MEI",
          nivel_acesso: "NORMAL",
          mei: `${cnpj}`.split("").slice(0, 8).join(""),
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } else if (accountCategory == "CNPJ") {
      const response = await axios.post(
        `${API_URL}/usuario`,
        JSON.stringify({
          // nome: `${name} ${lastName}`,
          nome: companyName,
          // sobrenome: lastName,
          email: email,
          senha: password,
          // nome_empresa: companyName,
          // cpf_cnpj: CPFOrCNPJ,
          categoria_conta: "CNPJ",
          nivel_acesso: "NORMAL",
          cnpj: cnpj,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // localToken = localStorage.getItem("@Auth:token");
      // token = JSON.parse(localToken);
      return response.data;
    } else if (accountCategory == "physicalPerson") {
      const response = await axios.post(
        `${API_URL}/usuario`,
        JSON.stringify({
          // nome: `${name} ${lastName}`,
          nome: name,
          // sobrenome: lastName,
          email: email,
          senha: password,
          // nome_empresa: companyName,
          // cpf_cnpj: CPFOrCNPJ,
          categoria_conta: "CPF",
          nivel_acesso: "NORMAL",
          cpf: cpf,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // localToken = localStorage.getItem("@Auth:token");
      // token = JSON.parse(localToken);
      return response.data;
    } else if (accountCategory == "ADMIN") {
      const response = await axios.post(
        `${API_URL}/usuario`,
        JSON.stringify({
          nome: `${name} ${lastName}`,
          // sobrenome: lastName,
          email: email,
          senha: password,
          // nome_empresa: companyName,
          cpf_cnpj: CPFOrCNPJ,
          // categoria_conta: accountCategory,
          categoria_conta: null,

          nivel_acesso: "ADMIN",
          cpf: cpf,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // localToken = localStorage.getItem("@Auth:token");
      // token = JSON.parse(localToken);
      return response.data;
    }
  } catch (err) {
    // console.log(err);
    return {
      result: false,
      typeAcc: accountCategory,
    };
  }
}

export async function loginUser(email, password) {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      JSON.stringify({
        email: email,
        senha: password,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    // localToken = localStorage.getItem("@Auth:token");
    // token = JSON.parse(localToken);
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function getUserInfosFunc() {
  try {
    const response = await authAxios.get(`${API_URL}/usuario`);
    return response.data;
  } catch (err) {
    // console.log(err);
    // console.log(token);

    return {
      result: false,
      token: token,
    };
  }
}

export async function getMovs() {
  try {
    // exluir

    const response = await authAxios.get(`${API_URL}/receita`);
    return response.data;
  } catch (err) {
    // console.log(err);
    // console.log(token);

    return {
      result: false,
      token: token,
    };
  }
}

export async function addRevenueCategory(name) {
  try {
    // exluir

    const response = await authAxios.post(
      `${API_URL}/categoria/receita`,
      JSON.stringify({
        nome: name,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (err) {
    return {
      result: false,
      token: token,
    };
  }
}

export async function getRevenueCategorys() {
  try {
    // exluir

    const response = await authAxios.get(`${API_URL}/categoria/receita`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (err) {
    // console.log(err);
    // console.log(token);

    return {
      result: false,
      token: token,
    };
  }
}

export async function addExpenseCategory(name) {
  try {
    // exluir

    const response = await authAxios.post(
      `${API_URL}/categoria/despesa`,
      JSON.stringify({
        nome: name,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (err) {
    return {
      result: false,
      token: token,
    };
  }
}

export async function getExpenseCategorys() {
  try {
    // exluir

    const response = await authAxios.get(`${API_URL}/categoria/despesa`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (err) {
    // console.log(err);
    // console.log(token);

    return {
      result: false,
      token: token,
    };
  }
}

export async function addClient(name, contact, email, whatsapp) {
  try {
    // exluir

    const response = await authAxios.post(
      `${API_URL}/cliente`,
      JSON.stringify({
        nome: name,
        telefone: contact,
        email: email,
        whatsapp: whatsapp,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response.data);

    return response.data;
  } catch (err) {
    console.log(err);
    return {
      result: false,
      token: token,
    };
  }
}

export async function getClients() {
  try {
    // exluir

    const response = await authAxios.get(`${API_URL}/cliente`);
    return response.data;
  } catch (err) {
    // console.log(err);
    // console.log(token);

    return {
      result: false,
      token: token,
    };
  }
}

export async function deleteClient(id) {
  try {
    // exluir

    const response = await authAxios.delete(`${API_URL}/cliente/${id}`);
    return response.data;
  } catch (err) {
    // console.log(err);
    // console.log(token);

    return {
      result: false,
      token: token,
    };
  }
}

export async function addProduct(name) {
  try {
    // exluir

    const response = await authAxios.post(
      `${API_URL}/produto`,
      JSON.stringify({
        nome: name,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (err) {
    return {
      result: false,
      token: token,
    };
  }
}

export async function getProducts() {
  try {
    // exluir

    const response = await authAxios.get(`${API_URL}/produto`);
    return response.data;
  } catch (err) {
    // console.log(err);
    // console.log(token);

    return {
      result: false,
      token: token,
    };
  }
}

export async function deleteProducts(id) {
  try {
    // exluir

    const response = await authAxios.delete(`${API_URL}/produto/${id}`);
    return response.data;
  } catch (err) {
    // console.log(err);
    // console.log(token);

    return {
      result: false,
      token: token,
    };
  }
}

export async function addService(name) {
  try {
    // exluir

    const response = await authAxios.post(
      `${API_URL}/servico`,
      JSON.stringify({
        nome: name,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (err) {
    return {
      result: false,
      token: token,
    };
  }
}

export async function getServices() {
  try {
    // exluir

    const response = await authAxios.get(`${API_URL}/servico`);
    return response.data;
  } catch (err) {
    // console.log(err);
    // console.log(token);

    return {
      result: false,
      token: token,
    };
  }
}

export async function deleteServices(id) {
  try {
    // exluir

    const response = await authAxios.delete(`${API_URL}/servico/${id}`);
    return response.data;
  } catch (err) {
    // console.log(err);
    // console.log(token);

    return {
      result: false,
      token: token,
    };
  }
}

export async function createMoviment(
  //  pega o typeMov
  revenueType,
  typeMov,
  name,
  description,
  value,
  date,
  product,
  category,
  service,
  client,
  attachment
) {
  try {
    // faz o IF, caso for revenue, faz isso aki embaixo, caso foi expense, pega o endpoint de despesa e retorna response.data

    if (typeMov == "revenue") {
      // exluir

      const response = await authAxios.post(
        `${API_URL}/receita`,
        JSON.stringify({
          // nome: name,
          // file: fileObj,
          anexo: attachment,
          descricao: description,
          valor: value,
          data: date,
          // produto: product,
          // efetuado: false,
          // quantidade: 1,
          categoria_receita_id: category,
          cliente_id: client,
          produto_id: revenueType == "product" ? product : null,
          servico_id: revenueType == "service" ? service : null,
          efetuado: today < date ? "nao" : "sim",
          // efetuado: "nao",
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } else if (typeMov == "expense") {
      // exluir

      const response = await authAxios.post(
        `${API_URL}/despesa`,
        JSON.stringify({
          // nome: name,
          anexo: attachment,
          descricao: description,
          valor: value,
          data: date,
          // produto_id: product,
          // quantidade: 1,
          categoria_despesa_id: category,
          efetuado: today < date ? "nao" : "sim",
          // servico_id: service,
          // cliente_id: client,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    }
  } catch (err) {
    // console.log(err);
    return {
      result: false,
      token: token,
    };
  }
}

export async function getAllMovs() {
  try {
    // exluir

    const response = await authAxios.get(`${API_URL}/receita`);
    return response.data;
  } catch (err) {
    return {
      result: false,
      token: token,
    };
  }
}

export async function deleteMov(id) {
  try {
    // exluir

    const response = await authAxios.delete(`${API_URL}/receita/${id}`);
    return response.data;
  } catch (err) {
    // console.log(err);
    return {
      result: false,
      token: token,
    };
  }
}

export async function deleteMovExp(id) {
  try {
    // exluir

    const response = await authAxios.delete(`${API_URL}/despesa/${id}`);
    return response.data;
  } catch (err) {
    // console.log(err);
    return {
      result: false,
      token: token,
    };
  }
}

export async function updatMov(
  id,
  description,
  value,
  date,
  product,
  category,
  service,
  client,
  typeMov,
  realized
) {
  try {
    // exluir

    // console.log("--->>>", id, "<<<---");

    if (typeMov == "receita") {
      const response = await authAxios.put(
        `${API_URL}/receita/${id}`,
        JSON.stringify({
          descricao: description,
          valor: value,
          anexo: "endereco",
          efetuado: realized == true ? "sim" : "nao",
          data: date,
          cliente_id: client,
          categoria_receita_id: category,
          produto_id: product,
          servico_id: service,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } else if (typeMov == "despesa") {
      const response = await authAxios.put(
        `${API_URL}/despesa/${id}`,
        JSON.stringify({
          descricao: description,
          valor: value,
          anexo: "endereco",
          efetuado: realized == true ? "sim" : "nao",
          data: date,
          cliente_id: client,
          categoria_despesa_id: category,
          produto_id: product,
          servico_id: service,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    }
  } catch (err) {
    return {
      result: false,
      token: token,
    };
  }
}

export async function effectedFunc(
  id,
  description,
  value,
  date,
  product,
  category,
  service,
  client
) {
  try {
    // exluir

    const response = await authAxios.put(
      `${API_URL}/receita/${id}`,
      JSON.stringify({
        // nome: 'testName',
        efetuado: "sim",
        descricao: description,
        valor: value,
        data: date,
        produto_id: product,
        // quantidade: 1,
        categoria_receita_id: category,
        servico_id: service,
        cliente_id: client,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (err) {
    return {
      result: false,
      token: token,
    };
  }
}

export async function getAllLiteralMovs() {
  try {
    // exluir

    const response = await authAxios.get(
      `${API_URL}/receitaedespesa`,
      // JSON.stringify({
      //   efetuado: "nao",
      // }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data;
  } catch (err) {
    // console.log(err);
  }
}

export async function getPendingMovs() {
  try {
    // exluir

    const response = await authAxios.get(
      `${API_URL}/receitaedespesa?efetuado=nao`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function UpdateUserInfos(
  name,
  anexo

  // typeUpdate,
  // value,
  // name,
  // email,
  // accCategory,
  // levelAcess,
  // cpf,
  // cnpj
) {
  try {
    // faz o if e else if caso algo estja vazio(falso) o anexo

    // if (typeUpdate == "email") {
    if (name && !anexo) {
      const response = await authAxios.put(
        `${API_URL}/usuario`,
        JSON.stringify({
          nome: name,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } else if (!name && anexo) {
      const response = await authAxios.put(
        `${API_URL}/usuario`,
        JSON.stringify({
          anexo: anexo,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    }
  } catch (err) {
    // console.log(err);
    return false;
  }

  // }
}

export async function exportFileData(file) {
  try {
    const response = await authAxios.post(`${API_URL}/files/upload`, file, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (err) {
    // console.log(err);
    return err;
  }
}

export async function importFileData(file) {
  try {
    const response = await authAxios.get(
      `${API_URL}/files/83a6a7df-126d-4bad-b12c-b0a62398326b_1705179104601.jpeg`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return err;
  }
}

// rever
export async function notAllMovs(file) {
  try {
    const response = await authAxios.get(
      `${API_URL}/receita?inicio=2023-12-30&fim=2024-01-01`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return err;
  }
}

// get const response = await authAxios.get(`${API_URL}/receita`);
export async function valuesAccount() {
  try {
    const response = await authAxios.get(
      `${API_URL}/receitaedespesa/valores?efetuado=sim`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function valuesAccountLastMonth() {
  try {
    // let ano = new Date().getFullYear();
    // let mes = new Date().getMonth() + 1;
    // new Date(ano, mes, 0).getDate()

    // new Date(ano, mes, 0).getDate()

    // `${API_URL}/receitaEDespesa/valores?efetuado=sim&inicio=${startDate}&fim=${finishDate}&categoria=${id}`
    // &fim=${finishDate}

    var dataAtual = new Date();

    var dataMesAnterior = new Date(dataAtual);
    dataMesAnterior.setMonth(dataAtual.getMonth() - 1);

    const yearLast = dataMesAnterior.getFullYear();
    let monthLast = dataMesAnterior.getMonth();
    let dayLast = dataMesAnterior.getDate();

    // test
    monthLast += 1;

    if (monthLast < 10) {
      monthLast = `0${monthLast}`;
    }

    if (dayLast < 10) {
      dayLast = `0${dayLast}`;
    }

    // console.log("Data do mês anterior: " + dataMesAnterior.toDateString());

    // console.log(
    //   dataMesAnterior.getFullYear(),
    //   dataMesAnterior.getMonth(),
    //   dataMesAnterior.getDate()
    // );

    const response = await authAxios.get(
      `${API_URL}/receitaedespesa/valores?efetuado=sim&fim=${yearLast}-${monthLast}-${dayLast}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function categorysInfosValue(id) {
  try {
    let ano = new Date().getFullYear();
    let mes = new Date().getMonth() + 1;

    if (mes < 10) {
      mes = `0${mes}`;
    }

    let startDate = `${ano}-${mes}-01`;
    let finishDate = `${ano}-${mes}-${new Date(ano, mes, 0).getDate()}`;

    const response = await authAxios.get(
      `${API_URL}/receitaEDespesa/valores?efetuado=sim&inicio=${startDate}&fim=${finishDate}&categoria=${id}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function clientsInfosValue(id) {
  try {
    let ano = new Date().getFullYear();
    let mes = new Date().getMonth() + 1;

    if (mes < 10) {
      mes = `0${mes}`;
    }

    let startDate = `${ano}-${mes}-01`;
    let finishDate = `${ano}-${mes}-${new Date(ano, mes, 0).getDate()}`;

    const response = await authAxios.get(
      `${API_URL}/receitaEDespesa/valores?efetuado=sim&inicio=${startDate}&fim=${finishDate}&cliente=${id}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function productsInfosValue(id) {
  try {
    let ano = new Date().getFullYear();
    let mes = new Date().getMonth() + 1;

    if (mes < 10) {
      mes = `0${mes}`;
    }

    let startDate = `${ano}-${mes}-01`;
    let finishDate = `${ano}-${mes}-${new Date(ano, mes, 0).getDate()}`;

    const response = await authAxios.get(
      `${API_URL}/receitaEDespesa/valores?efetuado=sim&inicio=${startDate}&fim=${finishDate}&produto=${id}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function servicesInfosValue(id) {
  try {
    let ano = new Date().getFullYear();
    let mes = new Date().getMonth() + 1;

    if (mes < 10) {
      mes = `0${mes}`;
    }

    let startDate = `${ano}-${mes}-01`;
    let finishDate = `${ano}-${mes}-${new Date(ano, mes, 0).getDate()}`;

    const response = await authAxios.get(
      `${API_URL}/receitaEDespesa/valores?efetuado=sim&inicio=${startDate}&fim=${finishDate}&servico=${id}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function liquidRecipeMonth() {
  try {
    let ano = new Date().getFullYear();
    let mes = new Date().getMonth() + 1;

    if (mes < 10) {
      mes = `0${mes}`;
    }

    let startDate = `${ano}-${mes}-01`;
    let finishDate = `${ano}-${mes}-${new Date(ano, mes, 0).getDate()}`;

    const response = await authAxios.get(
      `${API_URL}/receitaEDespesa/valores?efetuado=sim&inicio=${startDate}&fim=${finishDate}`
    );
    return response.data.data.resultado;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function liquidRecipe(initial, finish) {
  try {
    const response = await authAxios.get(
      `${API_URL}/receitaEDespesa/valores?efetuado=sim&inicio=${initial}&fim=${finish}`
    );
    return response.data.data.resultado;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function liquidRecipeMonthLast() {
  try {
    // let ano = new Date().getFullYear();
    // let mes = new Date().getMonth() + 1;

    // if (mes < 10) {
    //   mes = `0${mes}`;
    // }

    // let startDate = `${ano}-${mes}-01`;
    // let finishDate = `${ano}-${mes}-${new Date(ano, mes, 0).getDate()}`;

    var dataAtual = new Date();

    var dataMesAnterior = new Date(dataAtual);
    dataMesAnterior.setMonth(dataAtual.getMonth() - 1);

    const yearLast = dataMesAnterior.getFullYear();
    let monthLast = dataMesAnterior.getMonth();
    let dayLast = dataMesAnterior.getDate();

    monthLast += 1;

    if (monthLast < 10) {
      monthLast = `0${monthLast}`;
    }

    if (dayLast < 10) {
      dayLast = `0${dayLast}`;
    }

    // console.log("Data do mês anterior: " + dataMesAnterior.toDateString());

    // console.log(
    //   dataMesAnterior.getFullYear(),
    //   dataMesAnterior.getMonth(),
    //   dataMesAnterior.getDate()
    // );

    console.log(monthLast + 1);

    console.log("01", monthLast, yearLast, "-", dayLast, monthLast, yearLast);

    // const response = await authAxios.get(
    //   `${API_URL}/receitaedespesa/valores?efetuado=sim&inicio=2024-02-01&fim=2024-02-28`
    //   // `${API_URL}/receitaEDespesa/valores?efetuado=sim&inicio=${startDate}&fim=${finishDate}`
    // );

    const response = await authAxios.get(
      `${API_URL}/receitaedespesa/valores?efetuado=sim&inicio=${yearLast}-${monthLast}-01&fim=${yearLast}-${monthLast}-${dayLast}`
      // `${API_URL}/receitaEDespesa/valores?efetuado=sim&inicio=${startDate}&fim=${finishDate}`
    );
    return response.data.data.resultado;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function totalRecipeMonth() {
  try {
    let ano = new Date().getFullYear();
    let mes = new Date().getMonth() + 1;

    if (mes < 10) {
      mes = `0${mes}`;
    }

    let startDate = `${ano}-${mes}-01`;
    let finishDate = `${ano}-${mes}-${new Date(ano, mes, 0).getDate()}`;

    const response = await authAxios.get(
      `${API_URL}/receitaEDespesa/valores?efetuado=sim&inicio=${startDate}&fim=${finishDate}`
    );
    return response.data.data.receita;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function totalRecipe(initial, finish) {
  try {
    const response = await authAxios.get(
      `${API_URL}/receitaEDespesa/valores?efetuado=sim&inicio=${initial}&fim=${finish}`
    );
    return response.data.data.receita;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function totalRecipeMonthLast() {
  try {
    // let ano = new Date().getFullYear();
    // let mes = new Date().getMonth() + 1;

    // if (mes < 10) {
    //   mes = `0${mes}`;
    // }

    // let startDate = `${ano}-${mes}-01`;
    // let finishDate = `${ano}-${mes}-${new Date(ano, mes, 0).getDate()}`;

    var dataAtual = new Date();

    var dataMesAnterior = new Date(dataAtual);
    dataMesAnterior.setMonth(dataAtual.getMonth() - 1);

    const yearLast = dataMesAnterior.getFullYear();
    let monthLast = dataMesAnterior.getMonth();
    let dayLast = dataMesAnterior.getDate();

    monthLast += 1;

    if (monthLast < 10) {
      monthLast = `0${monthLast}`;
    }

    if (dayLast < 10) {
      dayLast = `0${dayLast}`;
    }

    // console.log("Data do mês anterior: " + dataMesAnterior.toDateString());

    // console.log(
    //   dataMesAnterior.getFullYear(),
    //   dataMesAnterior.getMonth(),
    //   dataMesAnterior.getDate()
    // );

    const response = await authAxios.get(
      `${API_URL}/receitaedespesa/valores?efetuado=sim&inicio=${yearLast}-${monthLast}-01&fim=${yearLast}-${monthLast}-${dayLast}`
      // `${API_URL}/receitaEDespesa/valores?efetuado=sim&inicio=${startDate}&fim=${finishDate}`
    );
    return response.data.data.receita;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function expenseMonthFunc() {
  try {
    let ano = new Date().getFullYear();
    let mes = new Date().getMonth() + 1;

    if (mes < 10) {
      mes = `0${mes}`;
    }

    let startDate = `${ano}-${mes}-01`;
    let finishDate = `${ano}-${mes}-${new Date(ano, mes, 0).getDate()}`;

    const response = await authAxios.get(
      `${API_URL}/receitaEDespesa/valores?efetuado=sim&inicio=${startDate}&fim=${finishDate}`
    );
    return response.data.data.despesa;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function expenseFunc(initial, finish) {
  try {
    const response = await authAxios.get(
      `${API_URL}/receitaEDespesa/valores?efetuado=sim&inicio=${initial}&fim=${finish}`
    );
    return response.data.data.despesa;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function expenseMonthFuncLast() {
  try {
    // let ano = new Date().getFullYear();
    // let mes = new Date().getMonth() + 1;

    // if (mes < 10) {
    //   mes = `0${mes}`;
    // }

    // let startDate = `${ano}-${mes}-01`;
    // let finishDate = `${ano}-${mes}-${new Date(ano, mes, 0).getDate()}`;

    var dataAtual = new Date();

    var dataMesAnterior = new Date(dataAtual);
    dataMesAnterior.setMonth(dataAtual.getMonth() - 1);

    const yearLast = dataMesAnterior.getFullYear();
    let monthLast = dataMesAnterior.getMonth();
    let dayLast = dataMesAnterior.getDate();

    monthLast += 1;

    if (monthLast < 10) {
      monthLast = `0${monthLast}`;
    }

    if (dayLast < 10) {
      dayLast = `0${dayLast}`;
    }

    // console.log("Data do mês anterior: " + dataMesAnterior.toDateString());

    // console.log(
    //   dataMesAnterior.getFullYear(),
    //   dataMesAnterior.getMonth(),
    //   dataMesAnterior.getDate()
    // );

    console.log(yearLast, monthLast, dayLast);

    const response = await authAxios.get(
      `${API_URL}/receitaedespesa/valores?efetuado=sim&inicio=${yearLast}-${monthLast}-01&fim=${yearLast}-${monthLast}-${dayLast}`
      // `${API_URL}/receitaEDespesa/valores?efetuado=sim&inicio=${startDate}&fim=${finishDate}`
    );
    return response.data.data.despesa;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function valuesMonths(monthsNum) {
  try {
    let years = "one";

    let ano = new Date().getFullYear();
    let mes = new Date().getMonth() + 1;
    let monthsOtherYear = mes - monthsNum;

    let ano2 = new Date().getFullYear();
    let mes2 = new Date().getMonth() + 1;

    if (monthsOtherYear < 0) {
      ano = ano - 1;
      mes = monthsOtherYear + 12 + 1;
      years = "two";
    }

    if (mes < 10) {
      mes = `0${mes}`;
    }

    if (mes2 < 10) {
      mes2 = `0${mes2}`;
    }

    // console.log(ano, mes);

    const response = await authAxios.get(
      `${API_URL}/receita/relatoriomes?inicio=${ano}-${mes}-01&fim=${ano2}-${mes2}-${new Date(
        ano2,
        mes2,
        0
      ).getDate()}`
    );
    return {
      years: years,
      data: response.data,
    };
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function valuesMonthsExpense(monthsNum) {
  try {
    let years = "one";

    let ano = new Date().getFullYear();
    let mes = new Date().getMonth() + 1;
    let monthsOtherYear = mes - monthsNum;

    let ano2 = new Date().getFullYear();
    let mes2 = new Date().getMonth() + 1;

    if (monthsOtherYear < 0) {
      ano = ano - 1;
      mes = monthsOtherYear + 12 + 1;
      years = "two";
    }

    if (mes < 10) {
      mes = `0${mes}`;
    }

    if (mes2 < 10) {
      mes2 = `0${mes2}`;
    }

    // console.log(ano, mes);

    const response = await authAxios.get(
      `${API_URL}/despesa/relatoriomes?inicio=${ano}-${mes}-01&fim=${ano2}-${mes2}-${new Date(
        ano2,
        mes2,
        0
      ).getDate()}`
    );
    return {
      years: years,
      data: response.data,
    };
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function valuesDays() {
  try {
    const curDateWeek = new Date();
    curDateWeek.setDate(curDateWeek.getDate() - 6);
    let dayWeek = curDateWeek.getDate();
    let monthWeek = curDateWeek.getMonth() + 1;
    const yearWeek = curDateWeek.getFullYear();

    const curYear = new Date().getFullYear();
    let curMonth = new Date().getMonth() + 1;
    let curDay = new Date().getDate();

    if (monthWeek < 10) {
      monthWeek = `0${monthWeek}`;
    }

    if (curMonth < 10) {
      curMonth = `0${curMonth}`;
    }

    if (dayWeek < 10) {
      dayWeek = `0${dayWeek}`;
    }

    if (curDay < 10) {
      curDay = `0${curDay}`;
    }

    const response = await authAxios.get(
      `${API_URL}/receita/relatoriodia?inicio=${yearWeek}-${monthWeek}-${dayWeek}&fim=${curYear}-${curMonth}-${curDay}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function getAllFaq() {
  let token;
  let localToken = localStorage.getItem("@Auth:token");
  localToken = localStorage.getItem("@Auth:token");
  token = JSON.parse(localToken);

  const authAxios = axios.create({
    baseURL: API_URL,
    headers: {
      // Authorization: `Bearer ${token}`,
      Token: token,
    },
  });

  const response = await authAxios.get(`${API_URL}/faq`);
  return response.data;
}

export async function createFaq(question, answer) {
  let token;
  let localToken = localStorage.getItem("@Auth:token");
  localToken = localStorage.getItem("@Auth:token");
  token = JSON.parse(localToken);

  const authAxios = axios.create({
    baseURL: API_URL,
    headers: {
      // Authorization: `Bearer ${token}`,
      Token: token,
    },
  });

  const response = await authAxios.post(
    `${API_URL}/faq`,
    JSON.stringify({
      pergunta: question,
      resposta: answer,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function deleteFaq(id) {
  let token;
  let localToken = localStorage.getItem("@Auth:token");
  localToken = localStorage.getItem("@Auth:token");
  token = JSON.parse(localToken);

  const authAxios = axios.create({
    baseURL: API_URL,
    headers: {
      // Authorization: `Bearer ${token}`,
      Token: token,
    },
  });

  const response = await authAxios.delete(`${API_URL}/faq/${id}`);
  return response.data;
}

export async function valuesDaysSeven() {
  try {
    const curDateWeek = new Date();
    curDateWeek.setDate(curDateWeek.getDate() - 6);
    let dayWeek = curDateWeek.getDate();
    let monthWeek = curDateWeek.getMonth() + 1;
    const yearWeek = curDateWeek.getFullYear();

    const curYear = new Date().getFullYear();
    let curMonth = new Date().getMonth() + 1;
    let curDay = new Date().getDate();

    if (monthWeek < 10) {
      monthWeek = `0${monthWeek}`;
    }

    if (curMonth < 10) {
      curMonth = `0${curMonth}`;
    }

    if (dayWeek < 10) {
      dayWeek = `0${dayWeek}`;
    }

    if (curDay < 10) {
      curDay = `0${curDay}`;
    }

    const response = await authAxios.get(
      `${API_URL}/receita/relatorio7dias?inicio=${yearWeek}-${monthWeek}-${dayWeek}&fim=${curYear}-${curMonth}-${curDay}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function recoverPassword() {
  try {
    const response = await authAxios.get(`${API_URL}/recuperarsenha`);
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function emailMessage(email) {
  try {
    const response = await authAxios.post(
      `${API_URL}/resetarsenha`,
      JSON.stringify({
        email: email,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function newPassword(tokenFunc, newPassword) {
  try {
    // console.log("-->", tokenFunc);

    const response = await authAxios.post(
      `${API_URL}/resetarsenha/alterarsenha`,
      JSON.stringify({
        token: tokenFunc,
        senha: newPassword,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

// service
// last

// exportFileData
// UpdateUserInfos

// stock area

// supplies
export async function newSupplier(nome, cpf) {
  // try {
  //   const reponse = await authAxios.post(
  //     "/fonecedor",
  //     JSON.stringify({
  //       nome: nome,
  //       cpf: cpf,
  //     })
  //   );
  //   return reponse.data;
  // } catch (err) {
  //   console.log(err);
  //   return false;
  // }
}

// types
export async function addType(name) {
  try {
    const response = await authAxios.post(
      "/categoria/produto",
      JSON.stringify({
        nome: name,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getType() {
  try {
    const response = await authAxios.get("/categoria/produto");

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function editType(id, name) {
  try {
    const response = await authAxios.put(
      `/categoria/produto/${id}`,
      JSON.stringify({
        name: name,
      })
    );

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function deleteType(id) {
  try {
    const response = await authAxios.delete(`/categoria/produto/${id}`);

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// fullProduct
export async function addFullProduct(values) {
  try {
    // costValue
    // profitMargin
    // saleValue
    console.log({
      valor_custo: correctNum(values.costValue),
      margem_lucro: values.profitMargin.split("%")[0],
    });

    const response = await authAxios.post(
      `/produto`,
      JSON.stringify({
        nome: values.name,
        // condicaoProduto: "",
        fornecedor_id: +values.supplier,
        codigo_referencia: values.code,
        marca_id: +values.brand,
        estoque_maximo: +values.stockMax,
        estoque_minimo: +values.stockMin,
        // estoque_atual
        estoque_atual: 0,
        // preco: numSale,
        preco: correctNum(values.saleValue),
        valor_custo: correctNum(values.costValue),
        margem_lucro: values.profitMargin.split("%")[0],
        observacao: values.observations,
        categoria_produto_id: +values.type,
      })
    );

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getFullProduct() {
  try {
    const response = await authAxios.get(`/produto`);

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getOneFullProduct(id) {
  try {
    const response = await authAxios.get(`/produto/${id}`);

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function editFullProduct(id, values) {
  try {
    const response = await authAxios.put(
      `/produto/${id}`,
      JSON.stringify({
        nome: values.name,
        // condicaoProduto: "",
        fornecedor_id: +values.supplier,
        codigo_referencia: values.code,
        marca_id: +values.brand,
        estoque_maximo: +values.stockMax,
        estoque_minimo: +values.stockMin,
        estoque_atual: +values.stockCur,
        // preco: numSale,
        preco: correctNum(values.saleValue),

        observacao: values.observations,
        categoria_produto_id: +values.type,
      })
    );

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function deleteFullProduct(id) {
  try {
    const response = await authAxios.delete(`/produto/${id}`);

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// supplier
export async function addSupplier(values) {
  //   name
  // personType
  // phone
  // email
  // socialReason
  // fantasyName
  // cnpj
  // cep
  // street
  // number
  // district
  // city
  // uf
  // complement

  try {
    console.log(values);

    console.log({
      pessoa_fisica: values.personType == "legalPerson" ? false : true,
      razao_social: values.socialReason,
      nome_fantasia: values.fantasyName,
      cnpj: values.cnpj,
      cpf: values.cpf,
      data_nascimento: "2000-03-18",
      email: values.email,
      telefone: values.phone,
      nome_contato: values.name,
    });
    let phoneNum, cpfNum;
    if (values.phone) {
      phoneNum = values.phone.split("-").join("");
    }

    if (values.cpf) {
      cpfNum = +values.cpf.split(".").join("").split("-").join("");
    }

    console.log(phoneNum, cpfNum);

    console.log(phoneNum);
    const response = await authAxios.post(
      `/fornecedor`,
      JSON.stringify({
        pessoa_fisica: values.personType == "legalPerson" ? false : true,
        razao_social: values.socialReason,
        nome_fantasia: values.fantasyName,
        cnpj: values.cnpj,
        cpf: cpfNum,
        data_nascimento: "2000-03-18",
        email: values.email,
        telefone: phoneNum,
        nome_contato: values.name,
        // pessoa_fisica: false,
        // razao_social: "testSocial",
        // nome_fantasia: "fantasyName",
        // cnpj: "123456789123456789",
        // cpf: "12345678912",
        // data_nascimento: "2000-03-18",
        // email: "test2@gmail.com",
        // telefone: "(81)999999999",
        // nome_contato: "testContactName4",
      })
    );

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getSupplier() {
  try {
    const response = await authAxios.get(`/fornecedor`);

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getOneSupplier(id) {
  try {
    const response = await authAxios.get(`/fornecedor/${id}`);

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function editSupplier(id, values) {
  try {
    const response = await authAxios.put(
      `/fornecedor/${id}`,
      JSON.stringify({
        razao_social: values.socialReason,
        nome_fantasia: values.fantasyName,
        cnpj: values.cnpj,
        email: values.email,
        telefone: values.phone,
        nome_contato: values.name,
      })
    );

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function deleteSupplier(id) {
  try {
    const response = await authAxios.delete(`/fornecedor/${id}`);

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// address
export async function addAddress(idSup, values) {
  try {
    console.log(idSup, values);
    const response = await authAxios.post(
      `/fornecedor/endereco`,
      JSON.stringify({
        cep: values.cep,
        rua: values.street,
        numero: +values.number,
        complemento: values.complement,
        bairro: values.district,
        cidade: values.city,
        // max 2 length
        uf: values.uf.toUpperCase(),
        fornecedor_id: idSup,
      })
    );

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getAddress() {
  try {
    const response = await authAxios.get(`/fornecedor/endereco`);

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getOneAddress(id) {
  try {
    const response = await authAxios.get(`/fornecedor/endereco/${id}`);

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function editAddress(idSup, values) {
  try {
    const response = await authAxios.put(
      `/fornecedor/endereco`,
      JSON.stringify({
        cep: values.cep,
        rua: values.street,
        numero: values.number,
        complemento: values.complement,
        bairro: values.district,
        cidade: values.city,
        uf: values.uf.toUpperCase(),
        fornecedor_id: idSup,
      })
    );

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function deleteAddress(id) {
  try {
    const response = await authAxios.delete(`/fornecedor/endereco/${id}`);

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// brand
export async function addBrand(name) {
  try {
    console.log(name);

    const response = await authAxios.post(
      `/marca`,
      JSON.stringify({
        nome: name,
      })
    );

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getBrand() {
  try {
    // console.log(values);

    const response = await authAxios.get(`/marca`);

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function editBrand(id, name) {
  try {
    console.log(values);

    const response = await authAxios.put(
      `/marca/${id}`,
      JSON.stringify({
        nome: name,
      })
    );

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function deleteBrand(id) {
  try {
    const response = await authAxios.delete(`/marca/${id}`);

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// stock
export async function addStock(values, attachament, received) {
  try {
    console.log(values);

    // date
    // formPayment
    // installmentsVal
    // installments
    // expiration
    // entryValue
    // product
    // supplier
    // totalCost
    // amount
    // invoiceNum
    // observations

    const paymentFunc = (val) => {
      if (val == "inCash") {
        return "vista";
      } else if (val == "inTerm") {
        return "prazo";
      } else if (val == "entry") {
        return "vista+prazo";
      }
    };

    // console.log({ entrada: received });

    console.log({
      tipo_pagamento: paymentFunc(values.formPayment),
      data: values.dateTest,
      quantidade: +values.amount,
      // preco_total:
      //   values.formPayment == "inCash"
      //     ? +correctNum(values.totalCost)
      //     : +correctNum(values.installmentsVal),
      preco_total: +correctNum(values.totalCost),
      valor_parcelas: values.installmentsVal
        ? +correctNum(values.installmentsVal)
        : undefined,
      // valor_parcelas: +correctNum(values.installmentsVal),
      parcelas: +values.installments,
      // data_vencimento: +values.expiration ? +values.expiration : undefined,
      data_pagamento: values.dateTest,
      entrada: true,
      recebido: received,
      anexo: attachament,
      produto_id: +values.product,
      descricao: values.observations,
      fornecedor_id: +values.supplier,
      valor_entrada: +values.entryValue.split(" ")[1],
      nota_fiscal: values.invoiceNum,
    });

    const response = await authAxios.post(
      `/estoque`,
      JSON.stringify({
        tipo_pagamento: paymentFunc(values.formPayment),
        data: values.dateTest,
        quantidade: +values.amount,
        // preco_total:
        //   values.formPayment == "inCash"
        //     ? +correctNum(values.totalCost)
        //     : +correctNum(values.installmentsVal),
        preco_total: +correctNum(values.totalCost),
        valor_parcelas: values.installmentsVal
          ? +correctNum(values.installmentsVal)
          : undefined,
        // valor_parcelas: +correctNum(values.installmentsVal),
        parcelas: +values.installments,
        // data_pagamento: +values.expiration ? +values.expiration : undefined,
        data_pagamento: values.dateTest,
        entrada: true,
        recebido: received,
        anexo: attachament,
        produto_id: +values.product,
        descricao: values.observations,
        fornecedor_id: +values.supplier,
        valor_entrada: +values.entryValue.split(" ")[1],

        nota_fiscal: values.invoiceNum,
      })
    );

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getStock() {
  try {
    const response = await authAxios.get(`/estoque`);
    console.log(response);

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getOneStock(id) {
  try {
    const response = await authAxios.get(`/estoque/${id}`);

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getAllProductStock(id) {
  try {
    const response = await authAxios.get(`/estoque?produto=${id}`);

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function editStockEntry(values) {
  try {
    console.log(values);
    // console.log(id);
    const paymentFunc = (val) => {
      if (val == "inCash") {
        return "vista";
      } else if (val == "inTerm") {
        return "prazo";
      } else if (val == "entry") {
        return "vista+prazo";
      } else {
        return val;
      }
    };

    // attachament: params.row.anexo,
    // date: params.row.data,
    // totalValue: params.row.preco_total,
    // installmentsValue: params.row.valor_parcelas,
    // entryValue: params.row.valor_entrada,
    // installments: params.row.parcelas,
    // productId: params.row.produto_id,
    // supplierId: params.row.fornecedor_id
    //   ? params.row.fornecedor_id
    //   : "não há",
    // formPayment: params.row.tipo_pagamento
    //   ? params.row.tipo_pagamento
    //   : "não há",
    // id: params.row.id,
    // amount: params.row.quantidade,
    // observations: params.row.descricao,
    // entry: params.row.entrada,

    const response = await authAxios.put(
      `/estoque/${values.id}`,
      JSON.stringify({
        tipo_pagamento: paymentFunc(values.formPayment),
        data: values.date,
        quantidade: +values.amount,

        preco_total: +values.totalValue,
        valor_parcelas: values.installmentsValue
          ? +values.installmentsValue
          : undefined,

        parcelas: +values.installments,

        data_pagamento: values.date,
        entrada: true,
        recebido: true,
        anexo: values.attachament,
        produto_id: +values.productId,
        descricao: values.observations,
        fornecedor_id: +values.supplierId,
        valor_entrada: +values.entryValue,
        nota_fiscal: values.invoiceNum,
      })
    );

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function editStock(id, values, attachament) {
  try {
    console.log(values);

    const response = await authAxios.put(
      `/estoque/${id}`,
      JSON.stringify({
        data: values.date,
        quantidade: +values.amount,
        preco_total: correctNum(values.totalCost),
        entrada: values,
        anexo: attachament,
        produto_id: +values.product,
      })
    );

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// deletar
export async function deleteStock(id) {
  try {
    const response = await authAxios.delete(`/estoque/${id}`);

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getImg(name) {
  try {
    // const response = await authAxios.get(
    //   `https://recicont-project.onrender.com/files/49d6f146-726f-4204-aa6e-3f0ad68d4168_1714509967132.jpeg`
    // );

    // let data = `data:${response.headers["content-type"]};base64,${new Buffer(
    //   response.data,
    //   "binary"
    // ).toString("base64")}`;
    console.log(name);
    let data;
    // const res = await authAxios.get(
    //   "https://recicont-project.onrender.com/files/7d99e347-3ae6-4cb0-a584-648525d2713d_1714516108997.jpeg"
    // );
    // console.log(res.data);

    let token = cookies.get("nextauth.token");

    // const res = await fetch(
    //   "https://recicont-project.onrender.com/files/2882ea67-8e25-4226-83b5-f6616f2f532f_1714519759376.jpeg",
    //   {
    //     headers: {
    //       // Authorization: `Bearer ${token}`,
    //       // "Content-Type": "application/json"
    //       "Content-Type": "application/json",
    //       Token: token,
    //     },
    //   }
    // );

    const res = await fetch(
      `https://recicont-project.onrender.com/files/${name}`,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json"
          "Content-Type": "application/json",
          Token: token,
        },
      }
    );
    console.log(res);

    const imageBlob = await res.blob();

    // uma forma
    const objectURL = URL.createObjectURL(imageBlob);
    console.log(objectURL);

    // outra forma
    // const reader = new FileReader();
    // reader.readAsDataURL(imageBlob); // Converts the blob to base64
    // reader.onloadend = function () {
    //   console.log(reader.result);
    //   data = reader.result;
    //   const imageElement = new Image();
    //   imageElement.src = reader.result;
    //   imageElement.width = 50;
    //   document.getElementById("imageContainer").appendChild(imageElement);
    // };

    // console.log(await response);
    // console.log(reader.result);
    return objectURL;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// totalRecipeMonth
// addMovimentPostFunc

// GET http://localhost:3000/produto/abaixoDoEstoque
// GET http://localhost:3000/produto/totalEmEstoque
// GET http://localhost:3000/estoque/entradaUltimosSeteDias
// GET http://localhost:3000/estoque/totalNaoRecebido
// GET http://localhost:3000/despesa/parcelasValores

// indicadores estoque e compras/entradas

export async function getProductsBelow() {
  try {
    const response = await authAxios.get("/produto/abaixoDoEstoque");

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getProductsSaleCost() {
  try {
    const response = await authAxios.get("/produto/totalEmEstoque");

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getStockWeekEntry() {
  try {
    const response = await authAxios.get("/estoque/entradaUltimosSeteDias");

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getStockNotReceived() {
  try {
    const response = await authAxios.get("/estoque/totalNaoRecebido");

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getStockExpense() {
  try {
    const response = await authAxios.get("/despesa/parcelasValores");

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// sales
export async function getSales() {
  try {
    const response = await authAxios.get("/vendas");

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getOneSale(id) {
  try {
    const response = await authAxios.get(`/vendas/${id}`);

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function addSale(values, attachament, received) {
  try {
    console.log(values, attachament, received);

    const paymentFunc = (val) => {
      if (val == "inCash") {
        return "vista";
      } else if (val == "inTerm") {
        return "prazo";
      } else if (val == "entry") {
        return "vista+prazo";
      }
    };

    // console.log({
    //   tipo_pagamento: paymentFunc(values.formPayment),
    //   data: values.dateTest,
    //   quantidade: +values.amount,
    //   // preco_total:
    //   //   values.formPayment == "inCash"
    //   //     ? +correctNum(values.totalCost)
    //   //     : +correctNum(values.installmentsVal),
    //   preco_total: +correctNum(values.totalCost),
    //   valor_parcelas: values.installmentsVal
    //     ? +correctNum(values.installmentsVal)
    //     : undefined,
    //   // valor_parcelas: +correctNum(values.installmentsVal),
    //   parcelas: +values.installments,
    //   // data_vencimento: +values.expiration ? +values.expiration : undefined,
    //   data_pagamento: values.dateTest,
    //   entrada: true,
    //   recebido: received,
    //   anexo: attachament,
    //   produto_id: +values.product,
    //   descricao: values.observations,
    //   fornecedor_id: +values.supplier,
    //   valor_entrada: +values.entryValue.split(" ")[1],
    //   nota_fiscal: values.invoiceNum,
    // });

    console.log("venda ->>>", {
      entregue: received,
      cliente_id: values.client == "balcão" ? null : values.client,
      // tipo_pagamento: paymentFunc(values.formPayment),
      tipo_pagamento: values.formPayment,

      data: values.dateTest, // colocar o input certo
      data_pagamento: values.dateTest, // colocar o input certo
      valor_entrada: 0,
      parcelas: +values.installments,
      valor_parcelas: values.installmentsVal
        ? +correctNum(values.installmentsVal)
        : undefined,
      preco_total: +correctNum(values.totalCost),
      observacao: values.observations,
      anexo: attachament,
      valor_entrada: +correctNum(values.entryValue),
      produtos: [
        {
          preco_venda: +correctNum(values.totalCost),
          quantidade: +values.amount,
          produto_id: +values.product,
        },
        // {
        //   preco_venda: 200,
        //   quantidade: 5,
        //   produto_id: 2,
        // },
      ],
    });

    const response = authAxios.post(
      "/vendas",
      JSON.stringify({
        entregue: received,
        cliente_id: values.client == "balcão" ? null : values.client,
        // tipo_pagamento: paymentFunc(values.formPayment),
        tipo_pagamento: values.formPayment,

        data: values.dateTest, // colocar o input certo
        data_pagamento: values.dateTest, // colocar o input certo
        valor_entrada: 0,
        parcelas: +values.installments,
        valor_parcelas: values.installmentsVal
          ? +correctNum(values.installmentsVal)
          : undefined,
        preco_total: +correctNum(values.totalCost),
        observacao: values.observations,
        anexo: attachament,
        valor_entrada: +correctNum(values.entryValue),
        produtos: [
          {
            preco_venda: +correctNum(values.totalCost),
            quantidade: +values.amount,
            produto_id: +values.product,
          },
          // {
          //   preco_venda: 200,
          //   quantidade: 5,
          //   produto_id: 2,
          // },
        ],
      })
    );

    if (!response) {
      return false;
    }
    console.log(response);

    // JSON.stringify({
    //   tipo_pagamento: "vista+prazo",
    //   data: "2022-05-15",
    //   data_pagamento: "2022-07-31",
    //   valor_entrada: 5.43,
    //   parcelas: 8,
    //   valor_parcelas: 15,
    //   preco_total: 300,
    //   observacao: "testObds",
    //   produtos: [
    //     {
    //       preco_venda: 200,
    //       quantidade: 1,
    //       produto_id: 2,
    //     },
    //     // {
    //     //   preco_venda: 200,
    //     //   quantidade: 5,
    //     //   produto_id: 3,
    //     // },
    //   ],
    // })

    // único sem .data
    return response;
  } catch (err) {
    console.log(err);
    console.log("erro");
    return false;
  }
}

export async function deliveredSale(id) {
  try {
    console.log(id);

    const response = authAxios.put(
      `/vendas/${id}`,
      JSON.stringify({
        entregue: true,
      })
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function deleteSale(id) {
  try {
    console.log(id);

    const response = authAxios.delete(`/vendas/${id}`);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// finance report

export async function getMovsPeriod(initial, finish) {
  try {
    const response = await authAxios.get(
      `${API_URL}/receitaEDespesa?inicio=${initial}&fim=${finish}`
    );

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getExpensePeriod(initial, finish) {
  try {
    const response = await authAxios.get(
      `${API_URL}/receitaEDespesa?inicio=${initial}&fim=${finish}`
    );

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// `${API_URL}/receita/relatoriodia?inicio=${yearWeek}-${monthWeek}-${dayWeek}&fim=${curYear}-${curMonth}-${curDay}`
export async function categorysInfosValuePeriod(initial, finish, id) {
  try {
    // let ano = new Date().getFullYear();
    // let mes = new Date().getMonth() + 1;

    // if (mes < 10) {
    //   mes = `0${mes}`;
    // }

    // let startDate = `${ano}-${mes}-01`;
    // let finishDate = `${ano}-${mes}-${new Date(ano, mes, 0).getDate()}`;

    // `${API_URL}/receitaEDespesa/valores?efetuado=sim&inicio=${initial}&fim=${finish}&categoria`
    const response = await authAxios.get(
      `${API_URL}/receitaEDespesa/valores?efetuado=sim&inicio=${initial}&fim=${finish}&categoria=${id}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

// sales report

export async function salesMonth() {
  try {
    function formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    // Obter a data atual
    const currentDate = new Date();

    // Calcular a data de 30 dias antes
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 30);

    // Formatar as datas
    const formattedCurrentDate = formatDate(currentDate);
    const formattedPastDate = formatDate(pastDate);

    const response = await authAxios.get(
      `${API_URL}/vendas/indicadores?startDate=${formattedPastDate}&endDate=${formattedCurrentDate}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function salesWeek() {
  try {
    function formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    // Obter a data atual
    const currentDate = new Date();

    // Calcular a data de 30 dias antes
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 7);

    // Formatar as datas
    const formattedCurrentDate = formatDate(currentDate);
    const formattedPastDate = formatDate(pastDate);

    const response = await authAxios.get(
      `${API_URL}/vendas/indicadores?startDate=${formattedPastDate}&endDate=${formattedCurrentDate}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function salesIndicators(start, end) {
  try {
    const response = await authAxios.get(
      `${API_URL}/vendas/indicadores?startDate=${start}&endDate=${end}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function salesPeriod(start, end) {
  try {
    // paginação
    // GET http://localhost:3000/vendas/vendasPeriodoComPaginacao?startDate=&endDate=&page=3&limit=2

    const response = await authAxios.get(
      `${API_URL}/vendas/vendasPeriodoSemPaginacao?startDate=${start}&endDate=${end}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function clientByProduct(start, end) {
  try {
    const response = await authAxios.get(
      `${API_URL}/vendas/clientePorProduto?startDate=${start}&endDate=${end}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function productByClient(start, end) {
  try {
    const response = await authAxios.get(
      `${API_URL}/vendas/produtoPorCliente?startDate=${start}&endDate=${end}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function buysClients(start, end, id) {
  try {
    const response = await authAxios.get(
      `${API_URL}/vendas/totalComprasCliente?startDate${start}=&endDate=${end}&clienteId=${id}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function clientByOneProduct(start, end, id) {
  try {
    const response = await authAxios.get(
      `${API_URL}/vendas/totalDeClientesPorProduto?startDate=${start}&endDate=${end}&produtoId=${id}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

// stock

export async function stockIndicators(start, end) {
  try {
    const response = await authAxios.get(
      `${API_URL}/estoque/indicadores?startDate=${start}&endDate=${end}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function stockPeriod(start, end) {
  try {
    const response = await authAxios.get(
      `${API_URL}/estoque/estoquePeriodo?startDate=${start}&endDate=${end}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function buysSupplier(start, end) {
  try {
    const response = await authAxios.get(
      `${API_URL}/estoque/compraFornecedorPeriodo?startDate=${start}&endDate=${end}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function entryBrand(start, end) {
  try {
    const response = await authAxios.get(
      `${API_URL}/estoque/marcaProdutoPeriodo?startDate=${start}&endDate=${end}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function entryProduct(start, end) {
  try {
    const response = await authAxios.get(
      `${API_URL}/estoque/entradaProdutoPeriodo?startDate=${start}&endDate=${end}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function entryType(start, end) {
  try {
    const response = await authAxios.get(
      `${API_URL}/estoque/entradaCategoriaProdutoPeriodo?startDate=${start}&endDate=${end}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function infoSupplier(start, end, id) {
  try {
    const response = await authAxios.get(
      `${API_URL}/estoque/estoquePorFornecedorPeriodo?startDate=${start}&endDate=${end}&fornecedorId=${id}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function prductEntryOut(start, end, entry, id) {
  try {
    const response = await authAxios.get(
      `${API_URL}/estoque/entradaSaidaProdutoPeriodo?startDate=${start}&endDate=${end}&entrada=${entry}&produtoId=${id}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function financeCategorysRev(start, end) {
  try {
    const response = await authAxios.get(
      `${API_URL}/receita/relatoriocategoria?inicio=${start}&fim=${end}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export async function financeCategorysExp(start, end) {
  try {
    const response = await authAxios.get(
      `${API_URL}/despesa/relatoriocategoria?inicio=${start}&fim=${end}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}

// indicadores de vendas

export async function salesUnitsIndicators() {
  try {
    const response = await authAxios.get(
      `${API_URL}/vendas/unidadesVendidasPorPeriodo`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}
