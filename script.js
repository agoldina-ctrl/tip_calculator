document.addEventListener("DOMContentLoaded", () => {
    const inputAmount = document.querySelector('.dollar');
    const inputCustom = document.querySelector('.custom');
    const inputPeople = document.querySelector('.people');
    const outputTip = document.querySelector('#output_tip');
    const outputPerson = document.querySelector('#output_person');
    const percentItems = document.querySelectorAll('.percent');
    const resetBtn = document.querySelector('.reset');
    const errorMessagePlace = document.querySelector('.after_people');
    
    let userChoice = 0;
   

    // Function to handle user tip selection and custom input
    function handleInput(event) {
      const target = event.target;
      if (target.tagName === 'BUTTON') {
        percentItems.forEach((item, i) => {
          if (target == item) {
            hideActive();
            showActive(i);
            userChoice = parseFloat(item.textContent);
            inputCustom.value = '';
          }
        });
      } else if (target.tagName === 'INPUT') {
        hideActive();
        userChoice = parseFloat(inputCustom.value);
      }
      updateOutput();
    }
  
    // Function to update tips output
    function updateOutput() {
      const billAmount = parseFloat(inputAmount.value);
      const numPeople = parseInt(inputPeople.value);
  
      if (isNaN(billAmount) || isNaN(numPeople)) {
        outputTip.textContent = `$0.00`;
        outputPerson.textContent = `$0.00`;
        return;
      }
      
      if (inputPeople.value == 0) {
        inputPeople.classList.add('zero');  
        errorMessagePlace.classList.add('zero_message'); 
        outputTip.textContent = `$0.00`;
        outputPerson.textContent = `$0.00`;
        return;
      } else {
        inputPeople.classList.remove('zero');
        errorMessagePlace.classList.remove('zero_message');
      }
      
  
      const tipPercentage = userChoice || parseFloat(inputCustom.value);
      const tipAmountPerson = (billAmount * (tipPercentage / 100)) / numPeople;
      const totalPerson = (billAmount / numPeople) + tipAmountPerson;
  
      outputTip.textContent = `$${tipAmountPerson.toFixed(2)}`;
      outputPerson.textContent = `$${totalPerson.toFixed(2)}`;
    }
  
    // Function to handle the states of the buttons
    function hideActive() {
      percentItems.forEach(element => {
        element.classList.remove('active');
      });
    }
  
    function showActive(i) {
      percentItems[i].classList.add('active');
    }
  
    // Function to reset the calculator
    function reset() {
      inputAmount.value = '';
      inputCustom.value = '';
      inputPeople.value = '';
      userChoice = 0;
      hideActive();
      updateOutput();
    }
  
    // Event listeners
    percentItems.forEach(button => button.addEventListener('click', handleInput));
    inputCustom.addEventListener('input', handleInput);
    inputAmount.addEventListener('input', updateOutput);
    inputPeople.addEventListener('input', updateOutput);
    resetBtn.addEventListener('click', reset);
  
    // Call updateOutput initially to set default values
    updateOutput();
  });
  