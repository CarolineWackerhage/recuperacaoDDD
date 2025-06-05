let dddsConsultados = [];


function buscarDDD() {
    console.log("buscarDDD")
    const inputDDD = document.getElementById("input_DDD");
    const numeroDDD = inputDDD.value;
    console.log("buscando DDD " + numeroDDD);

    if (!numeroDDD) {
        alert("Você precisa digitar um DDD");
        return;
      }


    fetch("https://brasilapi.com.br/api/ddd/v1/" + numeroDDD)
      .then((resposta) => {
        return resposta.json();
    })
    .then((json) => {
      console.log(json);

      const Estado = document.getElementById ("Estado")
      Estado.innerText = "O Estado é: " + json.state;


      const Cidades = document.getElementById ("Cidades")
      Cidades.innerText = "As Cidades são: " + json.cities;


      if (!dddsConsultados.includes(numeroDDD)) {
        dddsConsultados.push(numeroDDD);
        adicionarDddNaTabela(numeroDDD, json.state);
      }
    })
    .catch((erro) => {
      alert("DDD inválido ou não encontrado");
      console.error(erro);
    });
}
 
function adicionarDddNaTabela(DDD, Estado) {
  const novaLinha = document.createElement("tr");
  const colunaDdd = document.createElement("td");
  const colunaEstado = document.createElement("td");
 
  colunaDdd.innerText = DDD;
  colunaEstado.innerText = Estado;
 
  novaLinha.appendChild(colunaDdd);
  novaLinha.appendChild(colunaEstado);
 
  const tabela = document.getElementById("tabela_ddds");
  tabela.appendChild(novaLinha);
}
 
function configurarEventos() {
  console.log("Página carregada");
  const botaoBuscar = document.getElementById("botao_buscar");
  botaoBuscar.addEventListener("click", buscarDDD);
}
 
window.addEventListener("load", configurarEventos);