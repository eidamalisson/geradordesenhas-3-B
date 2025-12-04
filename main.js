const passwordInput = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.getElementById("generateBtn");

const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const upperCheck = document.getElementById("uppercase");
const lowerCheck = document.getElementById("lowercase");
const numberCheck = document.getElementById("numbers");
const symbolCheck = document.getElementById("symbols");

const strengthBar = document.getElementById("strengthBar");

// Atualiza o número na tela ao mexer no slider
lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});

// Funções para gerar caracteres
function getUppercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getLowercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getSymbol() {
    const symbols = "!@#$%^&*()_+{}[]<>?/|";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// Gera senha
function generatePassword() {
    const length = lengthSlider.value;

    const options = [];

    if (upperCheck.checked) options.push(getUppercase);
    if (lowerCheck.checked) options.push(getLowercase);
    if (numberCheck.checked) options.push(getNumber);
    if (symbolCheck.checked) options.push(getSymbol);

    if (options.length === 0) {
        passwordInput.value = "";
        return;
    }

    let password = "";

    for (let i = 0; i < length; i++) {
        const randomFunc = options[Math.floor(Math.random() * options.length)];
        password += randomFunc();
    }

    passwordInput.value = password;
    updateStrength(password);
}

// Atualiza barra de força
function updateStrength(password) {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const percent = (score / 6) * 100;
    strengthBar.style.width = percent + "%";

    if (percent < 40) strengthBar.style.background = "red";
    else if (percent < 70) strengthBar.style.background = "yellow";
    else strengthBar.style.background = "lime";
}

// Copiar senha
copyBtn.addEventListener("click", () => {
    if (passwordInput.value === "") return;

    navigator.clipboard.writeText(passwordInput.value);
    alert("Senha copiada!");
});

generateBtn.addEventListener("click", generatePassword);