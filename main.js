const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

const botoes = document.querySelectorAll('.parametro-senha__botao');

botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

function diminuiTamanho() {
    if (tamanhoSenha > 1) tamanhoSenha--;
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) tamanhoSenha++;
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

const campoSenha = document.querySelector('#campo-senha');

const chkMai = document.querySelector('input[name="maiusculo"]');
const chkMin = document.querySelector('input[name="minusculo"]');
const chkNum = document.querySelector('input[name="numero"]');
const chkSim = document.querySelector('input[name="simbolo"]');

const barraForca = document.querySelector('.forca');

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@#$%&*?+-';

geraSenha();

function geraSenha() {
    let caracteres = '';

    if (chkMai.checked) caracteres += letrasMaiusculas;
    if (chkMin.checked) caracteres += letrasMinusculas;
    if (chkNum.checked) caracteres += numeros;
    if (chkSim.checked) caracteres += simbolos;

    // Se nada foi marcado, usar pelo menos maiúsculas
    if (caracteres.length === 0) caracteres = letrasMaiusculas;

    let senha = '';

    for (let i = 0; i < tamanhoSenha; i++) {
        let indice = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[indice];
    }

    campoSenha.value = senha;
    calcularForca();
}

function calcularForca() {
    let pontuacao = 0;

    if (chkMai.checked) pontuacao++;
    if (chkMin.checked) pontuacao++;
    if (chkNum.checked) pontuacao++;
    if (chkSim.checked) pontuacao++;
    if (tamanhoSenha >= 12) pontuacao++;

    barraForca.classList.remove('fraca', 'media', 'forte');

    if (pontuacao <= 2) {
        barraForca.classList.add('fraca');
    } else if (pontuacao === 3) {
        barraForca.classList.add('media');
    } else {
        barraForca.classList.add('forte');
    }
}

// Atualizar senha quando clicar nos checkboxes
document.querySelectorAll('.checkbox').forEach(c => {
    c.onchange = geraSenha;
});