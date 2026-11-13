const formulario = document.querySelector("#formulario");
const inputNome = document.querySelector("#nome");
const inputTelefone = document.querySelector("#telefone");
const inputServico = document.querySelector("#servico");
const inputQuantidade = document.querySelector("#quantidade");
const inputPedido = document.querySelector("#pedidoTexto");
const resultado = document.querySelector("#resultado");
const numeroWhatsApp = "5519999263724";

const produtos = [
  { nome: "Bolo de cenoura", preco: 26 },
  { nome: "Torta de frutas vermelhas", preco: 32 },
  { nome: "Cheesecake clássico", preco: 35 },
  { nome: "Brownie intenso", preco: 18 },
  { nome: "Cupcake de baunilha", preco: 16 },
  { nome: "Macarrons sortidos", preco: 22 },
  { nome: "Bolo clássico", preco: 60 },
  { nome: "Bolo de aniversário", preco: 75 },
];

const formatoMoeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

for (let i = 0; i < produtos.length; i++) {
  const opcao = document.createElement("option");
  opcao.value = produtos[i].preco;
  opcao.textContent = `${produtos[i].nome} - ${formatoMoeda.format(produtos[i].preco)}`;
  inputServico.appendChild(opcao);
}

inputTelefone.addEventListener("input", function () {
  const telefone = normalizarTelefone(inputTelefone.value);
  const telefoneValido = /^\d{10,11}$/.test(telefone);

  inputTelefone.setCustomValidity(
    telefoneValido || inputTelefone.value.trim() === ""
      ? ""
      : "Informe o DDD e um telefone com 10 ou 11 dígitos.",
  );
});

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = inputNome.value.trim();
  const telefone = inputTelefone.value.trim();
  const preco = Number(inputServico.value);
  const quantidadeTexto = inputQuantidade.value.trim();
  const quantidade = Number(quantidadeTexto);
  const pedido = inputPedido.value.trim();

  resultado.classList.remove("d-none", "alert-success", "alert-warning");

  if (
    nome === "" ||
    telefone === "" ||
    inputServico.value === "" ||
    quantidadeTexto === "" ||
    !Number.isInteger(quantidade) ||
    quantidade <= 0 ||
    pedido === ""
  ) {
    resultado.textContent = "Preencha todos os campos corretamente!";
    resultado.classList.add("alert-warning");
    return;
  }

  const total = calcularTotal(preco, quantidade);
  const nomeProduto =
    inputServico.options[inputServico.selectedIndex].textContent;
  const mensagem = [
    "Olá! Gostaria de fazer um pedido.",
    `Nome: ${nome}`,
    `Telefone: ${telefone}`,
    `Produto: ${nomeProduto}`,
    `Quantidade: ${quantidade}`,
    `Detalhes: ${pedido}`,
    `Valor estimado: ${formatoMoeda.format(total)}`,
  ].join("\n");

  resultado.textContent =
    "Pedido preparado. Revise a mensagem e envie pelo WhatsApp: ";
  adicionarLinkWhatsApp(resultado, mensagem);
  resultado.classList.add("alert-success");
});

function normalizarTelefone(telefone) {
  let digitos = telefone.replace(/\D/g, "");

  if (
    digitos.startsWith("55") &&
    (digitos.length === 12 || digitos.length === 13)
  ) {
    digitos = digitos.slice(2);
  }

  return digitos;
}

function adicionarLinkWhatsApp(elemento, mensagem) {
  const link = document.createElement("a");
  link.href = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.className = "alert-link";
  link.textContent = "Abrir WhatsApp";
  elemento.append(link);
}

function calcularTotal(preco, quantidade) {
  return preco * quantidade;
}
