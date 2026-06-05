const input = document.getElementById("inp");
const resultEl = document.getElementById("result");
const dateEl = document.getElementById("date");

let expression = "";


function showDate() {
 
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString();
 
}
showDate();



document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", () => handleInput(btn.innerText));
});


function handleInput(val) {

  if (val === "C") {
    clearAll();
    return;
  }

  if (val === "DEL") {
    expression = expression.slice(0, -1);
    updateDisplay();
    return;
  }

  if (val === "=") {
    calculate();
    return;
  }

  if (isValidInput(val)) {
    expression += val;
    updateDisplay();
  }
}


function isValidInput(val) {
  const allowed = "0123456789+-*/().";
  return allowed.includes(val);
}


function updateDisplay() {
  input.value = expression;
}


function calculate() {
  try {
    if (!expression) return;

  
    if (/\/0(?!\d)/.test(expression)) {
      throw new Error("Divide by zero");
    }

    const result = Function(`"use strict"; return (${expression})`)();

    resultEl.textContent = result;
    expression = String(result);

  } catch (err) {
    resultEl.textContent = "Error";
  }
}


function clearAll() {
  expression = "";
  input.value = "";
  resultEl.textContent = "";
}


document.addEventListener("keydown", (e) => {

  if ("0123456789+-*/().".includes(e.key)) {
    expression += e.key;
    updateDisplay();
  }

  if (e.key === "Enter") calculate();

  if (e.key === "Backspace") {
    expression = expression.slice(0, -1);
    updateDisplay();
  }

  if (e.key === "Escape") clearAll();
});