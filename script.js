const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const tipButtons = document.querySelectorAll('.tip-buttons button');
const customTipInput = document.getElementById('custom-tip');
const tipAmountDisplay = document.querySelectorAll('.result .value')[0];
const totalDisplay = document.querySelectorAll('.result .value')[1];
const resetButton = document.querySelector('.reset-btn');
const errorMessage = document.querySelector('.error-message');

let tipPercent = 0;

// Handle clicks on preset tip percentage buttons
tipButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Clear custom tip input and set tip percentage
    customTipInput.value = '';
    tipPercent = parseInt(button.textContent) / 100;

    // Highlight the selected button
    tipButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    calculateTip();
  });
});

// Handle custom tip input
customTipInput.addEventListener('input', () => {
  // Clear selected tip button styles
  tipButtons.forEach(button => button.classList.remove('active'));

  tipPercent = parseFloat(customTipInput.value) / 100 || 0;
  calculateTip();
});

// Handle input changes for bill and people
[billInput, peopleInput].forEach(input => {
  input.addEventListener('input', calculateTip);
});

resetButton.addEventListener('click', () => {
  billInput.value = '';
  peopleInput.value = '';
  customTipInput.value = '';
  tipAmountDisplay.textContent = '$0.00';
  totalDisplay.textContent = '$0.00';
  errorMessage.style.visibility = 'hidden';

  tipButtons.forEach(button => button.classList.remove('active'));
  tipPercent = 0;
});

function calculateTip() {
  const bill = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value);

  if (!people || people <= 0) {
    errorMessage.style.visibility = 'visible';
    return;
  }
  errorMessage.style.visibility = 'hidden';

  const tipAmount = people > 0 ? ((bill * tipPercent) / people).toFixed(2) : '0.00';
  const total = people > 0 ? ((bill + bill * tipPercent) / people).toFixed(2) : '0.00';

  // Update the display
  tipAmountDisplay.textContent = `$${tipAmount}`;
  totalDisplay.textContent = `$${total}`;
}
