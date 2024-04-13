const uppercaseCheckbox = document.getElementById("upperCase");
const lowercaseCheckbox = document.getElementById("lowerCase");
const numberCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const lengthInput = document.getElementById("length");
const generateButton = document.getElementById("generate");
const result = document.getElementById("result");








function generatePassword(){
    const includeUppercase = uppercaseCheckbox.checked;
    const includeLowercase = lowercaseCheckbox.checked; 
    const includeNumbers = numberCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;
    const length = parseInt(lengthInput.value);

    let password = "Generic Password";
    result.innerHTML = "<p>"+password+"</p>";




}










generateButton.addEventListener("click",generatePassword);