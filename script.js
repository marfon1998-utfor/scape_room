// Base de dados dos 5 Enigmas

const enigmas = [

    {

        id: 1,

        titulo: "Cofre 1: Criptografia",

        pista: "Quantos anagramas distintos podem ser formados com a palavra L-O-G-I-C-A?",

        dica: "Dica: Permutação simples de 6 letras.",

        senha: [7, 2, 0],

        resolvido: false

    },

    {

        id: 2,

        titulo: "Cofre 2: Geometria",

        pista: "Qual é a soma dos ângulos internos de um triângulo (em graus)?",

        dica: "Dica: É um princípio básico da geometria plana.",

        senha: [1, 8, 0],

        resolvido: false

    },

    {

        id: 3,

        titulo: "Cofre 3: Álgebra",

        pista: "Qual é a raiz quadrada exata de 625?",

        dica: "Dica: Adicione um zero na frente se o resultado tiver apenas dois dígitos.",

        senha: [0, 2, 5],

        resolvido: false

    },

    {

        id: 4,

        titulo: "Cofre 4: Porcentagem",

        pista: "Quanto é 30% de 300?",

        dica: "Dica: Calcule 10% primeiro e multiplique por 3.",

        senha: [0, 9, 0],

        resolvido: false

    },

    {

        id: 5,

        titulo: "Cofre 5: Exponenciação",

        pista: "Qual é o resultado de 5 elevado ao cubo?",

        dica: "Dica: 5 x 5 x 5.",

        senha: [1, 2, 5],

        resolvido: false

    }

];



let enigmaAtual = null;

let combinacaoAtual = [0, 0, 0];



// Inicializa a Sala Central gerando os botões dos cofres

window.onload = () => {

    renderizarCofres();

};



function renderizarCofres() {

    const grid = document.getElementById("safes-grid");

    grid.innerHTML = ""; // Limpa a grade



    enigmas.forEach(enigma => {

        const btn = document.createElement("button");

        btn.className = `central-safe-btn ${enigma.resolvido ? "solved" : ""}`;

        btn.innerHTML = enigma.resolvido ? `🔓 Cofre ${enigma.id}` : `🔒 Cofre ${enigma.id}`;

       

        if (!enigma.resolvido) {

            btn.onclick = () => abrirCofre(enigma.id);

        }

       

        grid.appendChild(btn);

    });

}



function abrirCofre(id) {

    // Busca o enigma pelo ID

    enigmaAtual = enigmas.find(e => e.id === id);

   

    // Reseta a combinação visualmente e logicamente

    combinacaoAtual = [0, 0, 0];

    document.getElementById("d0").innerText = "0";

    document.getElementById("d1").innerText = "0";

    document.getElementById("d2").innerText = "0";

   

    // Reseta feedbacks

    document.getElementById("safe-status").innerText = "TRANCADO";

    document.getElementById("safe-status").style.color = "#e74c3c";

    document.getElementById("game-feedback").innerHTML = "";



    // Preenche as informações na tela

    document.getElementById("room-title").innerText = enigmaAtual.titulo;

    document.getElementById("clue-text").innerText = enigmaAtual.pista;

    document.getElementById("clue-tip").innerText = enigmaAtual.dica;



    // Troca as telas

    document.getElementById("central-view").classList.add("hidden");

    document.getElementById("puzzle-view").classList.remove("hidden");

}



function voltarParaCentral() {

    document.getElementById("puzzle-view").classList.add("hidden");

    document.getElementById("central-view").classList.remove("hidden");

    renderizarCofres(); // Atualiza a cor se algum cofre foi resolvido

}



// Lógica de mudar os números da tranca

function changeDigit(position, direction) {

    let novoValor = combinacaoAtual[position] + direction;

    if (novoValor > 9) novoValor = 0;

    if (novoValor < 0) novoValor = 9;

   

    combinacaoAtual[position] = novoValor;

    document.getElementById(`d${position}`).innerText = novoValor;

}



// Lógica de tentativa

function tryUnlock() {

    if (!enigmaAtual) return;



    const statusScreen = document.getElementById("safe-status");

    const feedback = document.getElementById("game-feedback");

   

    const acertou = combinacaoAtual.every((val, index) => val === enigmaAtual.senha[index]);

   

    if (acertou) {

        statusScreen.innerText = "ABERTO";

        statusScreen.style.color = "#2ecc71";

       

        feedback.innerHTML = "🔓 <span style='color: #2ecc71;'>Correto! Este cofre foi destrancado.</span>";

        enigmaAtual.resolvido = true;



        // Verifica se todos foram resolvidos

        const todosResolvidos = enigmas.every(e => e.resolvido === true);

       

        setTimeout(() => {

            if (todosResolvidos) {

                alert("🎉 PARABÉNS! Você destrancou todos os cofres e escapou da sala!");

            }

            voltarParaCentral();

        }, 2000); // Retorna para a sala central após 2 segundos de sucesso

       

    } else {

        statusScreen.innerText = "ERRO";

        statusScreen.style.color = "#e74c3c";

        feedback.innerHTML = "❌ <span style='color: #e74c3c;'>Senha incorreta. Tente novamente!</span>";

       

        setTimeout(() => {

            if (statusScreen.innerText === "ERRO") {

                statusScreen.innerText = "TRANCADO";

            }

        }, 1500);

    }

} 

