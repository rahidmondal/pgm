const passwordInput = document.getElementById("password");
const resultsDiv = document.querySelector(".results");
const progressBar = document.getElementById("progressBar");



passwordInput.addEventListener("input", function() {
    const result = zxcvbn(this.value);

    const score = document.createElement("p");
    score.textContent = `Score: ${result.score}`;

    const time = document.createElement("p");
    time.textContent = `Crack Time: ${result.crack_times_display.offline_slow_hashing_1e4_per_second}`;

    const feedback = document.createElement("p");
    if (result.feedback.warning || result.feedback.suggestions.length) {
        feedback.textContent = `Feedback: ${result.feedback.warning} ${result.feedback.suggestions.join(' ')}`;
    } else {
        feedback.textContent = 'Feedback: Good password!';
    }    

    var strength = calculatePasswordStrength(this.value);

    progressBar.style.width = strength + '%';

    progressBar.className = '';
    if (strength <= 20) {
        progressBar.classList.add('very-weak');
    } else if (strength <= 40) {
        progressBar.classList.add('weak');
    } else if (strength <= 60) {
        progressBar.classList.add('medium');
    } else if (strength <= 80) {
        progressBar.classList.add('strong');
    } else {
        progressBar.classList.add('very-strong');
    }

    resultsDiv.innerHTML = '';
    resultsDiv.appendChild(score);
    resultsDiv.appendChild(time);
    resultsDiv.appendChild(feedback);
});
function calculatePasswordStrength(password) {
    return Math.min(Math.floor(password.length * 2), 100); 
}