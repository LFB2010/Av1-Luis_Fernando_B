const formularioBolo = document.querySelector("#formularioBolo");
const inputNomeBolo = document.querySelector("#nomeBolo");
const inputTemaBolo = document.querySelector("#temaBolo");
const inputBolo = document.querySelector("#bolo");
const inputQuantidadeBolo = document.querySelector("#quantidadeBolo");
const inputDescricaoBolo = document.querySelector("#descricaoBolo");
const resultadoBolo = document.querySelector("#resultadoBolo");
const numeroWhatsApp = "5519999263724";

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
  const mensagem = [
    "Olá! Gostaria de encomendar um bolo personalizado.",
    `Nome: ${nome}`,
    `Tema: ${tema}`,
    `Modelo: ${inputBolo.options[inputBolo.selectedIndex].textContent}`,
    `Quantidade: ${quantidade}`,
    `Descrição: ${descricao}`,
    `Valor estimado: ${formatoMoedaBolo.format(total)}`,
  ].join("\n");

  resultadoBolo.textContent =
    "Pedido preparado. Revise a mensagem e envie pelo WhatsApp: ";
  adicionarLinkWhatsAppBolo(resultadoBolo, mensagem);
  resultadoBolo.classList.add("alert-success");
});

function adicionarLinkWhatsAppBolo(elemento, mensagem) {
  const link = document.createElement("a");
  link.href = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.className = "alert-link";
  link.textContent = "Abrir WhatsApp";
  elemento.append(link);
}

function calcularTotalBolo(preco, quantidade) {
  return preco * quantidade;
}
