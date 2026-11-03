const formularioBolo = document.querySelector("#formularioBolo");
const inputNomeBolo = document.querySelector("#nomeBolo");
const inputTemaBolo = document.querySelector("#temaBolo");
const inputBolo = document.querySelector("#bolo");
const inputQuantidadeBolo = document.querySelector("#quantidadeBolo");
const inputDescricaoBolo = document.querySelector("#descricaoBolo");
const resultadoBolo = document.querySelector("#resultadoBolo");

const bolos = [
  { nome: "Bolo clássico", preco: 60 },
  { nome: "Bolo de aniversário", preco: 75 },
  { nome: "Bolo romântico", preco: 82 },
  { nome: "Bento cake", preco: 48 },
  { nome: "Naked cake", preco: 90 },
  { nome: "Bolo infantil", preco: 68 },
];

const formatoMoedaBolo = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

for (let i = 0; i < bolos.length; i++) {
  const opcao = document.createElement("option");
  opcao.value = bolos[i].preco;
  opcao.textContent = `${bolos[i].nome} - ${formatoMoedaBolo.format(bolos[i].preco)}`;
  inputBolo.appendChild(opcao);
}

formularioBolo.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = inputNomeBolo.value.trim();
  const tema = inputTemaBolo.value.trim();
  const preco = Number(inputBolo.value);
  const quantidadeTexto = inputQuantidadeBolo.value.trim();
  const quantidade = Number(quantidadeTexto);
  const descricao = inputDescricaoBolo.value.trim();

  resultadoBolo.classList.remove("d-none", "alert-success", "alert-warning");

  if (
    nome === "" ||
    tema === "" ||
    inputBolo.value === "" ||
    quantidadeTexto === "" ||
    !Number.isInteger(quantidade) ||
    quantidade <= 0 ||
    descricao === ""
  ) {
    resultadoBolo.textContent = "Preencha todos os campos corretamente!";
    resultadoBolo.classList.add("alert-warning");
    return;
  }

  const total = calcularTotalBolo(preco, quantidade);
  resultadoBolo.textContent = `Obrigado, ${nome}! Seu pedido de ${quantidade} ${quantidade === 1 ? "bolo" : "bolos"} (${tema}) tem valor estimado de ${formatoMoedaBolo.format(total)}. Entraremos em contato para confirmar os detalhes.`;
  resultadoBolo.classList.add("alert-success");
});

function calcularTotalBolo(preco, quantidade) {
  return preco * quantidade;
}
