/* 
COMPLETED USER STORIES:
* As a user, I want to be able to select numbers so that I can perform operations with them.
* As a user, I want to be able to add two numbers together.
* As a user, I want to be able to subtract one number from another.
* As a user, I want to be able to multiply two numbers together.
* As a user, I want to be able to divide one number by another.
* As a user, I want to be able to see the output of the mathematical operation.
* As a user, I want to be able to clear all operations and start from 0.


LEVEL UP CHALLENGE: 
* Improve the code to accept multi-digit numbers for the calculations.

pseudo-code:
if (operator is null), as in no operation has been selected, then
string the numbers selected together as firstNumber

if (operator is true), then
string the numbers selected together as secondNumber 

*/

/*-------------------------------- Constants --------------------------------*/
// Saving the div with class of display 
const displayDiv = document.querySelector(".display")

/*-------------------------------- Variables --------------------------------*/
// To perform a calculation, we need to know what numbers and which operation
let firstNumber = null
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

        // if button has class of .number, save what number it is
        if (buttonClasses.includes('number')) {
            if (firstNumber == null) {
                firstNumber = event.target.innerText
                console.log(`you logged 1st number: ${firstNumber} typeof ${typeof firstNumber}`)  // log to check
                displayDiv.textContent += firstNumber
            }
            displayDiv.textContent = null // setting it back to null
            secondNumber = event.target.innerText
            console.log(`you logged 2nd number: ${secondNumber} typeof ${typeof secondNumber}`)  // log to check
            displayDiv.textContent += secondNumber
        } 
        // if button has class of .operator, save what operator it is
        else if (buttonClasses.includes('operator')) {
            operator = event.target.innerText
            displayDiv.textContent += operator
            console.log(`you logged an operator: ${operator}`) // log to check

            // if operator is C - reset the entries
            if (operator.toLowerCase() === 'c') {
                displayDiv.textContent = 0
                firstNumber = secondNumber = operator = null
                console.log('you pressed C. resetting...')
                // console.log(firstNumber, secondNumber, operator) // log to check
            }
        }
        // else, the " = " will calculate the total
        else {
            displayDiv.textContent = null
            console.log('calculating...')
            calculation()
            // this resets the numbers and operators for the next calculation
            firstNumber = secondNumber = operator = null
            // console.log(firstNumber, secondNumber, operator) // log to check
            console.log('do another one!')
        }
    })
  })

// This function takes 2 numbers and an operator, then calculates the total
function calculation() {
    if (firstNumber && secondNumber) {
        console.log(`logging ${firstNumber} ${operator} ${secondNumber}`) // check if it works
        firstNumber = Number(firstNumber)
        secondNumber = Number(secondNumber)
        let total = 0

        // check the operator and return the correct total
        switch (operator) {
            case '+':
                displayDiv.textContent = null
                total = firstNumber + secondNumber
                displayDiv.textContent += total
                console.log(`your addition total is: ${total}`)
                break;
            case '-':
                displayDiv.textContent = null
                total = firstNumber - secondNumber
                displayDiv.textContent += total
                console.log(`your subtraction difference is: ${total}`)
                break;
            case '*':
                displayDiv.textContent = null
                total = firstNumber * secondNumber
                displayDiv.textContent += total
                console.log(`your multiplication product is: ${total}`)
                break;
            case '/':
                displayDiv.textContent = null
                total = firstNumber / secondNumber
                displayDiv.textContent += total
                console.log(`your division result is: ${total}`)
                break;
        }
    }
}
