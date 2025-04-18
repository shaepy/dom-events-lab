/* 

COMPLETED USER STORIES:
* As a user, I want to be able to select numbers so that I can perform operations with them.
* As a user, I want to be able to add two numbers together.
* As a user, I want to be able to subtract one number from another.
* As a user, I want to be able to multiply two numbers together.
* As a user, I want to be able to divide one number by another.
* As a user, I want to be able to see the output of the mathematical operation.
* As a user, I want to be able to clear all operations and start from 0.

COMPLETED * LEVEL UP CHALLENGE 1: 
A. Improve the code to accept multi-digit numbers for the calculations.

COMPLETED * LEVEL UP CHALLENGE 2:
B. Have the recent total become the first number to operate again

*/

/*-------------------------------- Constants --------------------------------*/
// Saving the div with class of display 
const displayDiv = document.querySelector(".display")

/*-------------------------------- Variables --------------------------------*/
// To perform a calculation, we need to know what numbers and which operation
let firstNumber = null;
let secondNumber = null
let operator = null

/*------------------------ Cached Element References ------------------------*/
// Represent the buttons
const buttons = document.querySelectorAll(".button")

// This verifies the button values are correct
console.log(buttons)

/*-------------------------------- Functions --------------------------------*/

// This function checks what button was pressed
buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        // this makes an array of classes from the button that was pressed
        const buttonClasses = Array.from(button.classList)

        // if button has class of number, save what number it is
        if (buttonClasses.includes('number')) {
            // if the operator has not been selected 
            if (operator == null) {
                if (firstNumber == null) {
                    firstNumber = event.target.innerText
                    console.log(`you logged a number: ${firstNumber}`) // check
                 }
                else {
                    firstNumber += event.target.innerText
                    console.log(`${firstNumber}`) // check
                } 
                displayDiv.textContent = firstNumber
            } 
            // operator has been selected
            else {
                if (secondNumber == null) {
                    secondNumber = event.target.innerText
                    console.log(`you logged a 2nd number: ${secondNumber}`) // check
                 }
                else {
                    secondNumber += event.target.innerText
                    console.log(`${secondNumber}`) // check
                } 
                displayDiv.textContent = secondNumber
            }
        } 

        // if button has class of operator, save what operator it is
        else if (buttonClasses.includes('operator')) {
            operator = event.target.innerText
            displayDiv.textContent += operator
            // log to check
            console.log(`you logged an operator: ${operator}`)

            // if operator is C - reset the entries
            if (operator.toLowerCase() === 'c') {
                displayDiv.textContent = 0
                firstNumber = secondNumber = operator = null
                // log to check
                console.log('you pressed C. resetting...')
                console.log(firstNumber, secondNumber, operator)
            }
        }
        // else, pressing = equals will calculate the total
        else {
            const resultNumber = calculation()
            
            // this resets the numbers and operators for the next calculation
            if (resultNumber) {
                firstNumber = resultNumber
                secondNumber = operator = null
            }
            else {
                firstNumber = secondNumber = operator = null
            }

            // log to check
            console.log(firstNumber, secondNumber, operator) 
            console.log('do another one!')
        }
    })
  })

// This function takes 2 numbers and an operator, then calculates the total
function calculation() {
    if (firstNumber && secondNumber) {
        console.log(`logging ${firstNumber} ${operator} ${secondNumber}`) // log to check
        // turn strings into numbers
        firstNumber = Number(firstNumber)
        secondNumber = Number(secondNumber)
        let total;

        // check the operator and return the correct total

        switch (operator) {
            case '+':
                //displayDiv.textContent = null
                total = firstNumber + secondNumber
                displayDiv.textContent = total
                console.log(`your addition total is: ${total}`)
                return total;
            case '-':
                //displayDiv.textContent = null
                total = firstNumber - secondNumber
                displayDiv.textContent = total
                console.log(`your subtraction difference is: ${total}`)
                return total;
            case '*':
                //displayDiv.textContent = null
                total = firstNumber * secondNumber
                displayDiv.textContent = total
                console.log(`your multiplication product is: ${total}`)
                return total;
            case '/':
                //displayDiv.textContent = null
                if (!secondNumber) {
                    displayDiv.textContent = "Try again."
                    console.log('this will result in NaN or infinity')
                    return;
                }
                total = firstNumber / secondNumber
                displayDiv.textContent = total
                console.log(`your division result is: ${total}`)
                return total;
        }
    }
}
