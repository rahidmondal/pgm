document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const currentTheme = localStorage.getItem("theme") || "light";

  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      let theme = document.documentElement.getAttribute("data-theme");
      if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      }
    });
  }

  const navItems = document.querySelectorAll(".nav-item, .action-card");
  const views = document.querySelectorAll(".view-section");
  const sidebarNavItems = document.querySelectorAll(".nav-item");

  function switchView(targetViewId) {
    sidebarNavItems.forEach((item) => {
      if (item.getAttribute("data-nav-target") === targetViewId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    views.forEach((view) => {
      if (view.id === `view-${targetViewId}`) {
        view.classList.add("active");
      } else {
        view.classList.remove("active");
      }
    });
  }

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      const target = item.getAttribute("data-nav-target");
      if (target) switchView(target);
    });
  });

  const customAlert = document.getElementById("customAlertModal");
  const customAlertButton = document.getElementById("customAlertButton");
  const customAlertMessage = document.getElementById("customAlertMessage");
  const toastElem = document.getElementById("toast");
  let toastTimeout;

  function showAlert(msg) {
    customAlertMessage.innerHTML = msg;
    customAlert.style.display = "flex";
  }

  if (customAlertButton) {
    customAlertButton.addEventListener("click", () => {
      customAlert.style.display = "none";
    });
  }

  function showToast(message, color = "#17a2b8") {
    toastElem.textContent = message;
    toastElem.style.borderLeft = `4px solid ${color}`;
    toastElem.classList.add("show");

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastElem.classList.remove("show");
    }, 3000);
  }

  const pgUpper = document.getElementById("pgUpper");
  const pgLower = document.getElementById("pgLower");
  const pgNumbers = document.getElementById("pgNumbers");
  const pgSymbols = document.getElementById("pgSymbols");
  const pgUtf8 = document.getElementById("pgUtf8");
  const pgAllCheck = document.getElementById("pgAllCheck");
  const pgLength = document.getElementById("pgLength");
  const pgLengthVal = document.getElementById("pgLengthVal");
  const pgGenerateBtn = document.getElementById("pgGenerateBtn");
  const pgOutput = document.getElementById("pgOutput");
  const pgCopyBtn = document.getElementById("pgCopyBtn");

  if (pgLength) {
    pgLength.addEventListener("input", (e) => {
      pgLengthVal.textContent = e.target.value;
    });
  }

  if (pgAllCheck) {
    pgAllCheck.addEventListener("change", (e) => {
      const isChecked = e.target.checked;
      pgUpper.checked = isChecked;
      pgLower.checked = isChecked;
      pgNumbers.checked = isChecked;
      pgSymbols.checked = isChecked;
    });

    const updateMasterToggle = () => {
      pgAllCheck.checked =
        pgUpper.checked &&
        pgLower.checked &&
        pgNumbers.checked &&
        pgSymbols.checked;
    };
    [pgUpper, pgLower, pgNumbers, pgSymbols].forEach((cb) => {
      cb.addEventListener("change", updateMasterToggle);
    });
  }

  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  const utf8Chars = "©®™±÷×∆Ω∑∏∞≈≠≡≤≥∂∫√⊕⊗★☆☺☹❤✌✍⚒⚓⚔⚖⚙";

  function getRandomInt(max) {
    const array = new Uint32Array(1);
    let randomValue;
    const limit = Math.floor(0xffffffff / max) * max;

    do {
      window.crypto.getRandomValues(array);
      randomValue = array[0];
    } while (randomValue >= limit);

    return randomValue % max;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = getRandomInt(i + 1);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  if (pgGenerateBtn) {
    pgGenerateBtn.addEventListener("click", () => {
      const length = parseInt(pgLength.value);
      let charSet = "";
      let passwordParts = [];

      if (
        !pgUpper.checked &&
        !pgLower.checked &&
        !pgNumbers.checked &&
        !pgSymbols.checked
      ) {
        showAlert("Please select at least one character set.");
        return;
      }

      if (pgUpper.checked) {
        charSet += upperCaseChars;
        passwordParts.push(upperCaseChars[getRandomInt(upperCaseChars.length)]);
      }
      if (pgLower.checked) {
        charSet += lowerCaseChars;
        passwordParts.push(lowerCaseChars[getRandomInt(lowerCaseChars.length)]);
      }
      if (pgNumbers.checked) {
        charSet += numberChars;
        passwordParts.push(numberChars[getRandomInt(numberChars.length)]);
      }
      if (pgSymbols.checked) {
        charSet += symbolChars;
        passwordParts.push(symbolChars[getRandomInt(symbolChars.length)]);
      }
      if (pgUtf8.checked) {
        charSet += utf8Chars;
        passwordParts.push(utf8Chars[getRandomInt(utf8Chars.length)]);
      }

      for (let i = passwordParts.length; i < length; i++) {
        passwordParts.push(charSet[getRandomInt(charSet.length)]);
      }

      const password = shuffleArray(passwordParts).join("");

      pgOutput.textContent = password;
    });
  }

  if (pgCopyBtn) {
    pgCopyBtn.addEventListener("click", () => {
      const password = pgOutput.textContent;

      if (password === "" || password === "Click Generate to create password") {
        showAlert("Please generate a password first.");
        return;
      }

      navigator.clipboard
        .writeText(password)
        .then(() => {
          showToast("Password copied to clipboard!", "#10b981");
        })
        .catch(() => {
          showAlert("Failed to copy password to clipboard");
        });
    });
  }

  const pscInput = document.getElementById("pscInput");
  const pscMeter = document.getElementById("pscMeter");
  const pscResults = document.getElementById("pscResults");

  if (pscInput) {
    pscInput.addEventListener("input", function () {
      const val = this.value;

      if (!val) {
        pscMeter.style.width = "0%";
        pscMeter.className = "meter-fill";
        pscResults.innerHTML =
          '<div class="empty-state"><p>Password Summary awaits input...</p></div>';
        return;
      }

      if (typeof zxcvbn === "undefined") {
        console.error("zxcvbn is not loaded");
        return;
      }

      const result = zxcvbn(val);
      const score = result.score;

      pscMeter.style.width = (score + 1) * 20 + "%";
      pscMeter.className = "meter-fill";

      let color = "";
      let label = "";
      if (score === 0) {
        pscMeter.classList.add("v-weak");
        color = "red";
        label = "Very Weak";
      } else if (score === 1) {
        pscMeter.classList.add("weak");
        color = "orange";
        label = "Weak";
      } else if (score === 2) {
        pscMeter.classList.add("medium");
        color = "#eab308";
        label = "Moderate";
      } else if (score === 3) {
        pscMeter.classList.add("strong");
        color = "#10b981";
        label = "Strong";
      } else {
        pscMeter.classList.add("v-strong");
        color = "#059669";
        label = "Very Strong";
      }

      let feedbackStr = "Great password! Hard to crack.";
      if (result.feedback.warning || result.feedback.suggestions.length) {
        feedbackStr = `<strong>Warning:</strong> ${result.feedback.warning}<br> ${result.feedback.suggestions.join("<br>")}`;
      }

      pscResults.innerHTML = `
                <div style="margin-bottom: 16px;">
                    <h3 style="color:${color}; margin-bottom: 8px;">${label} (Score: ${score}/4)</h3>
                    <p>${feedbackStr}</p>
                </div>
                
                <div class="metrics-section">
                    <p><strong>Estimated Guesses to Crack:</strong> ${result.guesses.toLocaleString()}</p>
                    <p><strong>Crack Time (Offline Slow Hashing):</strong> ${result.crack_times_display.offline_slow_hashing_1e4_per_second}</p>
                    <p><strong>Crack Time (Online Fast Hashing):</strong> ${result.crack_times_display.online_no_throttling_10_per_second}</p>
                    <p><strong>Sequence Details:</strong> ${result.sequence.map((seq) => seq.pattern).join(", ") || "No simple sequence patterns found"}</p>
                </div>
            `;
    });
  }
});
