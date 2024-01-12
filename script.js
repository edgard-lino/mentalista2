let numeroSecreto = parseInt(Math.random()*10 + 1);
const inputChute = document.querySelector('.jogo__chute');
const titulo = document.querySelector('.jogo__titulo');
const texto = document.querySelector('.jogo__texto');
const botaoChutarEJogarNovamente = document.querySelector('.botao__chutarOuNovoJogo');
let tentativas = 0;
let jogoFinalizado = false;
botaoChutarEJogarNovamente.addEventListener('click', chutarOuNovoJogo);
let vitoriasPlacar = document.querySelector('.placar__vitorias__pontos');
let derrotasPlacar = document.querySelector('.placar__derrotas__pontos');
const botaoZeraPlacar = document.querySelector('.placar__botao');
let vitorias = 0;
let derrotas = 0;

atualizaPlacar();

botaoZeraPlacar.addEventListener('click', () => {
    vitorias = 0;
    derrotas = 0;
    atualizaPlacar();
})

function atualizaPlacar() {
    vitoriasPlacar.innerHTML = vitorias;
    derrotasPlacar.innerHTML = derrotas;
}

function chutarOuNovoJogo() {
    jogoFinalizado ? novoJogo() : chutar();
}

function chutar() {
    let chute = inputChute.value;
    if(chute === '') {
        texto.innerHTML = `Digite um número`;
    } else {
        tentativas++;
        console.log(`tentativa ${tentativas} chute ${chute} numero secreto ${numeroSecreto}`);
        conferirChute(chute);
        inputChute.value = '';
    }
}

function conferirChute(chute) {
    if (chute == numeroSecreto) {
        titulo.innerHTML = `Parabéns, o número secreto é ${numeroSecreto}!`;
        texto.innerHTML = `Você acertou com ${tentativas} tentativas`;
        finalizarJogo();
        vitorias++;
        atualizaPlacar();
    } else {
        let maiorOuMenor = numeroSecreto < chute ? 'menor' : 'maior';

        if (tentativas === 1) {
            console.log('Você tem duas tentativas');
            titulo.innerHTML = `Errou, o número secreto é ${maiorOuMenor} que ${chute}`;
            texto.innerHTML = `Você tem duas tentativas`;
        } else if (tentativas === 2) {
            console.log('Você tem uma tentativa');
            titulo.innerHTML = `Errou, o número secreto é ${maiorOuMenor} que ${chute}`;
            texto.innerHTML = `Você tem uma tentativa`;
        } else {
            console.log('Você perdeu.');
            titulo.innerHTML = `Errou, o número secreto era ${numeroSecreto}`;
            texto.innerHTML = `Acabaram as tentativas`;
            finalizarJogo();
            derrotas++;
            atualizaPlacar();
        }
    }
}

function finalizarJogo() {
    inputChute.disabled = true;
    botaoChutarEJogarNovamente.innerHTML = 'NOVO JOGO';
    jogoFinalizado = true;
}

function novoJogo() {
    gerarNumeroSecreto();
    inputChute.removeAttribute('disabled');
    tentativas = 0;
    titulo.innerHTML = `Adivinhe um número entre 1 e 10`;
    texto.innerHTML = `Você tem três tentativas`;
    botaoChutarEJogarNovamente.innerHTML = 'CHUTAR'
    jogoFinalizado = false;
}

function gerarNumeroSecreto() {
    numeroSecreto = parseInt(Math.random()*10 + 1);
}