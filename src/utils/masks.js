const onlyNumbers = (value) => {
  if (!value) return "";

  return value.replace(/[\D]/g, "");
};

export const phoneMask = (value) => {
  if (!value) return;

  return value
    .replace(/[\D]/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})(\d+?)/, "$1");
};

export const cepMask = (value) => {
  if (!value) return;

  return value
    .replace(/[\D]/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{3})(\d+?)/, "$1");
};

export const cpfMask = (value) => {
  if (!value) return;

  return value
    .replace(/[\D]/g, "")
    .replace(/(\d{3})(\d{3})(\d{3})(\d)/, "$1.$2.$3-$4")
    .replace(/(-\d{2})(\d+?)/, "$1");
};

// Mudar
// cnpj: 00.000.000/0000-00
export const cnpjMask = (value) => {
  if (!value) return;

  return value
    .replace(/[\D]/g, "")
    .substring(0, 14)
    .replace(/^(\d{2})(\d)/, "$1.$2")   
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") 
    .replace(/\.(\d{3})(\d)/, ".$1/$2") 
    .replace(/(\d{4})(\d)/, "$1-$2"); 
    // .replace(/(\d{5})(\d)/, "$1-$2")
    // .replace(/(-\d{3})(\d+?)/, "$1");
};

export const dateMask = (value) => {
  if (!value) return "";

  return value.replace(/[\D]/g, "").replace(/(\d{2})(\d{2})(\d+?)/, "$1/$2/$3");
};

export const amountMask = onlyNumbers;

export const entryValueMask = onlyNumbers;

export const expirationMask = onlyNumbers;

export const installmentsMask = onlyNumbers;

export const totalCostMask = (value) => {
  if (!value) return "";

  //   se a string n tiver , ou . colocar .00

  return value.replace(/[^0-9.]+|(?<=\..*)\./g, "").replace(/(\d+?)/, "R$ $1");
};

export const dateTestMask = (value, typeDate) => {
  if (typeDate == "inCash" || typeDate == "today") {
    // setValueDate(`${new Date().toISOString().split("T")[0]}`);
    // console.log("RRRRAAA", `${new Date().toISOString().split("T")[0]}`);
    return `${new Date().toISOString().split("T")[0]}`;
  } else if (
    typeDate === "happened" ||
    typeDate === "schedule" ||
    typeDate === "inTerm"
  ) {
    // setValueDate("");
    return "";
  }
};

// teste forms aa

export const costValueMask = (value) => {
  if (!value) return "";

  //   se a string n tiver , ou . colocar .00

  return value.replace(/[^0-9.]+|(?<=\..*)\./g, "").replace(/(\d+?)/, "R$ $1");
};

export const installmentsValMask = (value) => {
  if (!value) return "";

  //   se a string n tiver , ou . colocar .00

  return value.replace(/[^0-9.]+|(?<=\..*)\./g, "").replace(/(\d+?)/, "R$ $1");
};

export const profitMarginMask = (value) => {
  if (!value) return "";

  return value.replace(/[^0-9.]+|(?<=\..*)\./g, "").replace(/$/, "%");
};

export const saleValueMask = (value) => {
  if (!value) return "";

  //   se a string n tiver , ou . colocar .00
  // /[^\d.]/g pega somente numeros e pontos

  return value.replace(/[^0-9.]+|(?<=\..*)\./g, "").replace(/(\d+?)/, "R$ $1");
};

export const stockMinMask = onlyNumbers;

export const stockMaxMask = onlyNumbers;

export const stockMask = (value) => {
  if (!value) return "";

  // console.log(value.replace(/[\D]/g, ""));

  return value;
  // return value.replace(/[\D]/g, "");
};

export const numberMask = onlyNumbers;

// criar mask só de letra
export const ufMask = (value) => {
  if (!value) return "";

  return value
    .replace(/[^a-zA-Z]+/g, "")
    .toUpperCase()
    .substring(0, 2);
    // .replace(/(-[^a-zA-Z]{2})([^a-zA-Z]+?)/g, "$1");
};

// costValue
// profitMargin
// saleValue
// stockMin
// stockMax

// entryValue;
// expiration;
// installments;
// totalCost;
