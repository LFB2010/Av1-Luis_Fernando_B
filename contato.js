const formulario = document.querySelector("#formulario");
const inputNome = document.querySelector("#nome");
const inputTelefone = document.querySelector("#telefone");
const inputServico = document.querySelector("#servico");
const inputQuantidade = document.querySelector("#quantidade");
const inputPedido = document.querySelector("#pedidoTexto");
const resultado = document.querySelector("#resultado");

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
  resultado.textContent = `Obrigado, ${nome}! Seu pedido de ${quantidade} unidade(s) tem valor estimado de ${formatoMoeda.format(total)}. Vamos entrar em contato pelo telefone ${telefone} para confirmar os detalhes.`;
  resultado.classList.add("alert-success");
});

function calcularTotal(preco, quantidade) {
  return preco * quantidade;
}
