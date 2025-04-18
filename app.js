/* 
User Stories
* As a user, I want to be able to select numbers so that I can perform operations with them.
* As a user, I want to be able to add two numbers together.
* As a user, I want to be able to subtract one number from another.
* As a user, I want to be able to multiply two numbers together.
* As a user, I want to be able to divide one number by another.
* As a user, I want to be able to see the output of the mathematical operation.
* As a user, I want to be able to clear all operations and start from 0.
*/

/*-------------------------------- Constants --------------------------------*/
// Represent the buttons and numbers
const buttons = document.querySelectorAll(".button")

// This verifies the button values are correct
console.log(buttons)

/*-------------------------------- Variables --------------------------------*/
// To perform a calculation, we need to know what numbers and which operation
let firstNumber = null
let secondNumber = null
let operator = null

/*------------------------ Cached Element References ------------------------*/

/*----------------------------- Event Listeners -----------------------------*/

/*-------------------------------- Functions --------------------------------*/


// event.classList turn into an array and use .includes()
// Array.from(event.classList)

// if operator is C - set the numbers to null

buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        // this makes an array of classes from the button that was pressed
        const buttonClasses = Array.from(button.classList)

        // if button has class of .number 
        if (buttonClasses.includes('number')) {
            if (firstNumber == null) {
                firstNumber = Number(event.target.innerText)
                console.log(`you logged 1st number: ${firstNumber} typeof ${typeof firstNumber}`)  // log to check
            }
            secondNumber = Number(event.target.innerText)
            console.log(`you logged 2nd number: ${secondNumber} typeof ${typeof secondNumber}`)  // log to check
        } 
        // if button has class of .operator
        else if (buttonClasses.includes('operator')) {
            operator = event.target.innerText
            console.log(`you logged an operator: ${operator}`) // log to check
            // if the operator is C, reset
            if (operator.toLowerCase() === 'c') {
                firstNumber = null;
                secondNumber = null;
                operator = null;
                console.log('you pressed C. resetting...')
            }
        }
        else {
            console.log('calculating...')
            calculation();
            // this resets the numbers and operators for the next calculation
            firstNumber = null;
            secondNumber = null;
            operator = null;
            console.log(firstNumber, secondNumber, operator) // log to check
            console.log('do another one!')
        }
    })
  })

// Write something that actually does the calculation
// It should take 2 numbers
// Take an operator
// And calculate the total

function calculation() {
    if (firstNumber && secondNumber) {
        console.log(`logging ${firstNumber} ${operator} ${secondNumber}`) // check if it works
        let total = 0;

        // check the operator 
        if (operator === '+') {
            total = firstNumber + secondNumber
            console.log(`your addition total is: ${total}`)
            return total
        }
        else if (operator === '-') {
            total = firstNumber - secondNumber
            console.log(`your subtraction difference is: ${total}`)
            return total
        }
        else if (operator === '*') {
            total = firstNumber * secondNumber
            console.log(`your multiplication product is: ${total}`)
            return total
        }
        else if (operator === '/') {
            total = firstNumber / secondNumber
            console.log(`your division result is: ${total}`)
            return total
        }
    }
}

// clicking the " = " will calculate the total