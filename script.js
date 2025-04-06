// Lista de perguntas e respostas
import { perguntas } from './data.js';


// Pegando os elementos do HTML
const perguntaElemento = document.querySelector(".pergunta");
const respostasElemento = document.querySelector(".respostas");
const progressoElemento = document.querySelector(".progresso");
const textoFinal = document.querySelector(".fim span");
const conteudo = document.querySelector(".conteudo");
const conteudoFinal = document.querySelector(".fim");

// Variáveis (igual ao seu + flag de resposta)
let indiceAtual = 0;
let acertos = 0;
let respostaSelecionada = false;

// Função para carregar pergunta 
function carregarPergunta() {
  respostaSelecionada = false;
  const perguntaAtual = perguntas[indiceAtual];
  perguntaElemento.textContent = perguntaAtual.pergunta;
  progressoElemento.textContent = `${indiceAtual + 1}/${perguntas.length}`;
  respostasElemento.innerHTML = "";

  perguntaAtual.respostas.forEach(resposta => {
    const botao = document.createElement("button");
    botao.className = "botao-resposta";
    botao.textContent = resposta.opcao;
    
    botao.addEventListener("click", () => {
      if (respostaSelecionada) return; // Impede múltiplos cliques
      respostaSelecionada = true;

      // Feedback visual
      if (resposta.correto) {
        botao.classList.add("resposta-correta");
        acertos++;
      } else {
        botao.classList.add("resposta-incorreta");
        // Mostra a resposta correta
        const botoes = document.querySelectorAll(".botao-resposta");
        botoes.forEach(btn => {
          if (perguntaAtual.respostas.find(r => r.opcao === btn.textContent && r.correto)) {
            btn.classList.add("resposta-correta");
          }
        });
      }

      // Próxima pergunta após 1s
      setTimeout(() => {
        indiceAtual++;
        if (indiceAtual < perguntas.length) {
          carregarPergunta();
        } else {
          finalizarJogo();
        }
      }, 1000);
    });

    respostasElemento.appendChild(botao);
  });
}

// Botão de reiniciar
const botaoReiniciar = document.createElement("button");
botaoReiniciar.textContent = "Reiniciar";
botaoReiniciar.className = "botao-reiniciar";
botaoReiniciar.addEventListener("click", () => {
  indiceAtual = 0;
  acertos = 0;
  conteudoFinal.style.display = "none";
  conteudo.style.display = "flex";
  carregarPergunta();
});

// Adiciona o botão ao container final depois que o jogo termina
function finalizarJogo() {
  textoFinal.textContent = `Você acertou ${acertos} de ${perguntas.length}`;
  conteudo.style.display = "none";
  conteudoFinal.style.display = "flex";

  // Garante que o botão só seja adicionado uma vez
  if (!conteudoFinal.contains(botaoReiniciar)) {
    conteudoFinal.appendChild(botaoReiniciar);
  }
}


// Inicia o jogo
carregarPergunta();