const uppercaseCheckbox = document.getElementById("upperCase");
const lowercaseCheckbox = document.getElementById("lowerCase");
const numberCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const generateButton = document.getElementById("generate");
const result = document.getElementById("result");

const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()';

lengthInput.addEventListener("input", function() {
    lengthValue.textContent = this.value;
});

function generatePassword(event) {
    event.preventDefault();

    const includeUppercase = uppercaseCheckbox.checked;
    const includeLowercase = lowercaseCheckbox.checked;
    const includeNumbers = numberCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;
    const length = parseInt(lengthInput.value);

    let charSet = '';
    let password = '';
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
        alert('Please select at least one character type');
        return;
    }
    if (includeUppercase) {
        charSet += upperCaseChars;
        password += upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)];
    }
    if (includeLowercase) {
        charSet += lowerCaseChars;
        password += lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)];
    }
    if (includeNumbers) {
        charSet += numberChars;
        password += numberChars[Math.floor(Math.random() * numberChars.length)];
    }
    if (includeSymbols) {
        charSet += symbolChars;
        password += symbolChars[Math.floor(Math.random() * symbolChars.length)];
    }

    for (let i = password.length; i < length; i++) {
        let randomChar;
        do {
            randomChar = charSet[Math.floor(Math.random() * charSet.length)];
        } while (randomChar === password[i - 1]);
        password += randomChar;
    }

    password = password.split('').sort(() => Math.random() - 0.5).join('');

    result.innerHTML = "<p>" + password + "</p>";
}

generateButton.addEventListener("click", generatePassword);

document.getElementById('copy').addEventListener('click', function() {
    var password = document.getElementById('result').innerText;
    var textarea = document.createElement('textarea');
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    alert('Password copied to clipboard');
    document.body.removeChild(textarea);

});