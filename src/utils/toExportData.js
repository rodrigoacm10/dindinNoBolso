export function exportMovs(
  responseLiteralAllMovs,
  responseCat,
  responseCatEx,
  responseClients,
  responseProducts,
  responseServices
) {
  const allMovsWithCategorys = responseLiteralAllMovs?.map((el) => {
    if (el.categoria_receita_id) {
      el.category = el.categoria_receita_id;
    } else if (el.categoria_despesa_id) {
      el.category = el.categoria_despesa_id;
    }
    return el;
  });

  allMovsWithCategorys?.sort((a, b) => {
    const aData = new Date(a.createdAt).getTime();
    const bData = new Date(b.createdAt).getTime();

    return bData - aData;
  });

  const correctingIdToName = allMovsWithCategorys?.map((el) => {
    //  tem q ver se é despesa ou receita ainda
    const newEl = Object.assign({}, el);

    let catName;
    if (newEl.typeMov == "receita") {
      catName = responseCat?.find(
        (cat) => cat.categoria_receita_id == newEl.category
      );
    } else if (newEl.typeMov == "despesa") {
      catName = responseCatEx.find(
        (cat) => cat.categoria_despesa_id == newEl.category
      );
    }

    const clientName = responseClients?.find((cli) => {
      newEl.Cliente = "-";
      const client = cli.id == newEl.cliente_id;
      if (client) {
        newEl.Cliente = cli.nome;

        return cli.nome;
      }
      return client;
    });

    const productName = responseProducts?.find((prod) => {
      newEl.Produto = "-";
      const product = prod.id == newEl.produto_id;
      if (product) {
        newEl.Produto = prod.nome;

        return prod.nome;
      }
      return product;
    });

    const serviceName = responseServices?.find((serv) => {
      newEl.Servico = "-";
      const service = serv.id == newEl.servico_id;
      if (service) {
        newEl.Servico = serv.nome;

        return serv.nome;
      }
      return service;
    });

    const dateArr = newEl.data.split("-");
    const corDate = [dateArr[2], "/", dateArr[1], "/", dateArr[0]].join("");

    // console.log("clientName", clientName);
    // console.log("productName", productName);
    // console.log("serviceName", serviceName);
    // console.log(corDate);

    newEl.Categoria = catName?.nome;
    newEl.Data = corDate;
    newEl.Efetuado = newEl.efetuado == true ? "EFETUADO" : "NÂO EFETUADO";
    newEl.Tipo = newEl.typeMov;
    // newEl.cliente = clientName.nome;
    return {
      tipo: newEl.Tipo,
      data: newEl.Data,
      cliente: newEl.Cliente,
      valor: newEl.valor,
      categoria: newEl.Categoria,
      descricao: newEl.descricao,
      produto: newEl.Produto,
      servico: newEl.Servico,
      efetuado: newEl.Efetuado,
      id: newEl.id,
    };
  });

  return correctingIdToName;
}

export function exportSales(
  responseAllSales,
  responseClients,
  responseProducts
) {
  const corSequenc = responseAllSales?.sort((a, b) => {
    const aData = new Date(a.createdAt).getTime();
    const bData = new Date(b.createdAt).getTime();

    return bData - aData;
  });

  const correctingIdToName = corSequenc?.map((el) => {
    //  tem q ver se é despesa ou receita ainda
    const newEl = Object.assign({}, el);

    const clientName = responseClients?.find((cli) => {
      newEl.Cliente = "balcão";
      const client = cli.id == newEl.cliente_id;
      if (client) {
        newEl.Cliente = cli.nome;

        return cli.nome;
      }
      return client;
    });

    const productName = responseProducts?.find((prod) => {
      newEl.Produto = "-";
      const product = prod.id == newEl.produto;
      if (product) {
        newEl.Produto = prod.nome;

        return prod.nome;
      }
      return product;
    });

    const dateArr = newEl.data.split("-");
    const corDate = [dateArr[2], "/", dateArr[1], "/", dateArr[0]].join("");

    newEl.Data = corDate;
    newEl.Cancelado = newEl.cancelado == true ? "CANCELADO" : "-";
    newEl.Tipo = newEl.typeMov;
    // newEl.cliente = clientName.nome;
    return {
      cancelado: newEl.Cancelado,
      data: newEl.Data,
      valor: newEl.preco_total,
      quantidade: newEl.quantidade,
      valor_parcelas: newEl.valor_parcelas,
      valor_entrada: newEl.valor_entrada,
      parcelas: newEl.parcelas,
      cliente: newEl.Cliente,
      produto: newEl.Produto,
      pagamento: newEl.tipo_pagamento,
      observacao: newEl.observacao,
      entregue: newEl.entregue,
      id: newEl.id,
    };
  });

  return correctingIdToName;
}

export function exportCliInfo(
  responseInfos,

  // responseProducts,
  responseTypes = [],
  responseBrand = [],
  responseSupplier = [],

  responseClients = []
) {
  console.log(responseTypes);
  console.log(responseBrand);
  console.log(responseSupplier);

  const corSequenc = responseInfos?.sort((a, b) => {
    const aData = new Date(a.createdAt).getTime();
    const bData = new Date(b.createdAt).getTime();

    return bData - aData;
  });

  const correctingIdToName = corSequenc?.map((el) => {
    //  tem q ver se é despesa ou receita ainda
    const newEl = Object.assign({}, el);

    // const clientName = responseClients?.find((cli) => {
    //   newEl.Cliente = "-";
    //   const client = cli.id == newEl.cliente_id;
    //   if (client) {
    //     newEl.Cliente = cli.nome;

    //     return cli.nome;
    //   }
    //   return client;
    // });

    // const productName = responseProducts?.find((prod) => {
    //   newEl.Produto = "-";
    //   const product = prod.id == newEl.produto_id;
    //   if (product) {
    //     newEl.Produto = prod.nome;

    //     return prod.nome;
    //   }
    //   return product;
    // });

    const typeName = responseTypes?.find((serv) => {
      newEl.Tipo = "-";
      const service = serv.id == newEl.categoria;
      if (service) {
        newEl.Tipo = serv.nome;

        return serv.nome;
      }
      return service;
    });

    const brandName = responseBrand?.find((serv) => {
      newEl.Marca = "-";
      const service = serv.id == newEl.marca;
      if (service) {
        newEl.Marca = serv.nome;

        return serv.nome;
      }
      return service;
    });

    const supplierName = responseSupplier?.find((serv) => {
      newEl.Fornecedor = "-";
      const service = serv.id == newEl.fornecedor;
      if (service) {
        newEl.Fornecedor = serv.nome_contato;

        return serv.nome;
      }
      return service;
    });

    // const dateArr = newEl.data.split("-");
    // const corDate = [dateArr[2], "/", dateArr[1], "/", dateArr[0]].join("");

    // console.log("clientName", clientName);
    // console.log("productName", productName);
    // console.log("serviceName", serviceName);
    // console.log(corDate);

    // newEl.Categoria = catName?.nome;
    // newEl.Data = corDate;
    // newEl.Efetuado = newEl.efetuado == true ? "EFETUADO" : "NÂO EFETUADO";
    // newEl.Tipo = newEl.typeMov;
    // newEl.cliente = clientName.nome;
    return {
      // tipo: newEl.Tipo,
      // data: newEl.Data,
      // cliente: newEl.Cliente,
      // valor: newEl.valor,
      // categoria: newEl.Categoria,
      // descricao: newEl.descricao,
      // produto: newEl.Produto,
      // servico: newEl.Servico,
      // efetuado: newEl.Efetuado,
      // id: newEl.id,
      produto: newEl.produto,
      quantidade: newEl.total_quantidade_comprada,
      valor_total: newEl.preco_total,
      tipo: newEl.Tipo,
      marca: newEl.Marca,
      fornecedor: newEl.Fornecedor,
      id: newEl.id,
    };
  });

  return correctingIdToName;
}

export function exportBuys(
  responseBuys,
  responseProducts = [],
  responseSupplier = []
  // responseProducts,
) {
  // console.log(responseTypes);
  // console.log(responseBrand);
  // console.log(responseSupplier);

  // const corSequenc = responseInfos?.sort((a, b) => {
  //   const aData = new Date(a.createdAt).getTime();
  //   const bData = new Date(b.createdAt).getTime();

  //   return bData - aData;
  // });

  // const clientName = responseClients?.find((cli) => {
  //   newEl.Cliente = "-";
  //   const client = cli.id == newEl.cliente_id;
  //   if (client) {
  //     newEl.Cliente = cli.nome;

  //     return cli.nome;
  //   }
  //   return client;
  // });

  // const productName = responseProducts?.find((prod) => {
  //   newEl.Produto = "-";
  //   const product = prod.id == newEl.produto_id;
  //   if (product) {
  //     newEl.Produto = prod.nome;

  //     return prod.nome;
  //   }
  //   return product;
  // });

  const correctingIdToName = responseBuys.map((el) => {
    //  tem q ver se é despesa ou receita ainda
    const newEl = Object.assign({}, el);

    let catName;
    // if (newEl.typeMov == "receita") {
    //   catName = responseCat.data.find(
    //     (cat) => cat.categoria_receita_id == newEl.category
    //   );
    // } else if (newEl.typeMov == "despesa") {
    //   catName = responseCatEx.data.find(
    //     (cat) => cat.categoria_despesa_id == newEl.category
    //   );
    // }

    // trocar para produto
    const productName = responseProducts.find((prod) => {
      newEl.Produto = "-";
      const product = prod.id == newEl.produto_id;
      if (product) {
        newEl.Produto = prod.nome;

        return prod.nome;
      }
      return product;
    });

    // trocar para fornecedor
    const supplierName = responseSupplier.find((sup) => {
      newEl.Fornecedor = "-";
      const supplier = sup.id == newEl.fornecedor_id;
      if (supplier) {
        // console.log("supplier -><", sup);
        newEl.Fornecedor = sup.nome_contato;

        return sup.nome_contato;
      }
      return supplier;
    });

    // trocar para marca
    // const brandName = brands.data.find((bra) => {
    //   newEl.Marca = "-";
    //   const brand = bra.id == newEl.marca_id;
    //   if (brand) {
    //     newEl.Marca = bra.nome;

    //     return bra.nome;
    //   }
    //   return brand;
    // });

    const dateArr = newEl.data.split("-");
    const corDate = [dateArr[2], "/", dateArr[1], "/", dateArr[0]].join("");

    // newEl.Categoria = catName?.nome;
    newEl.Data = corDate;
    // newEl.Efetuado = newEl.efetuado == true ? "EFETUADO" : "NÂO EFETUADO";
    // newEl.Tipo = newEl.typeMov;

    return {
      id: newEl.id,
      data: newEl.Data,
      // nome: newEl.nome,
      // codigo: newEl.codigo_referencia,
      valor: `R$ ${newEl.preco_total}`,
      produto: newEl.Produto,
      quantidade: newEl.quantidade,
      // estoque: newEl.estoque_atual,
      // tipo: newEl.Tipo,
      fornecedor: newEl.Fornecedor,
      pagamento:
        newEl.tipo_pagamento == "vista+prazo"
          ? "entrada + parcelas"
          : `à ${newEl.tipo_pagamento}`,
      valor_parcelas: `R$ ${newEl.valor_parcelas}`,
      parcelas: newEl.parcelas,

      // marca: newEl.Marca,
      // estoqueMin: newEl.estoque_minimo,
      // estoqueMax: newEl.estoque_maximo,
      nota_fiscal: newEl.nota_fiscal,
      observacao: newEl.descricao,
    };
  });

  return correctingIdToName;
}
