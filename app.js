/* 
COMPLETED USER STORIES:
* As a user, I want to be able to select numbers so that I can perform operations with them.
* As a user, I want to be able to add two numbers together.
* As a user, I want to be able to subtract one number from another.
* As a user, I want to be able to multiply two numbers together.
* As a user, I want to be able to divide one number by another.
* As a user, I want to be able to see the output of the mathematical operation.
* As a user, I want to be able to clear all operations and start from 0.

COMPLETED * LEVEL UP CHALLENGE 1: Improve the code to accept multi-digit numbers for the calcuates.

COMPLETED * LEVEL UP CHALLENGE 2: Have the recent total become the first number to operate again
*/

/*-------------------------------- Constants --------------------------------*/

// Saving the div with class of display 
const display = document.querySelector('.display')


/*-------------------------------- Variables --------------------------------*/

// To perform a calcuate, we need to know what numbers and which operation
let numOne = null;
let numTwo = null
let operator = null


/*------------------------ Cached Element References ------------------------*/

// Represent the buttons
const buttons = document.querySelectorAll('.button')

// This verifies the button values are correct
console.log(buttons)


/*----------------------------- Event Listeners -----------------------------*/

// This function checks what button was pressed
buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        // this makes an array of classes from the button that was pressed
        const buttonClass = Array.from(button.classList)

        // if button has class of number, save what number it is
        if (buttonClass.includes('number')) {
            // and if the operator has not been selected 
            if (operator == null) {
                if (numOne == null) {
                    numOne = event.target.innerText
                    console.log(`you logged a number: ${numOne}`) // check
                 }
                else {
                    numOne += event.target.innerText
                    console.log(`it is now ${numOne}`) // check
                } 
                display.textContent = numOne
            } 
            // else if operator has been selected, save the second number
            else {
                if (numTwo == null) {
                    numTwo = event.target.innerText
                    console.log(`you logged a 2nd number: ${numTwo}`) // check
                 }
                else {
                    // this displays the number before it is added
                    display.textContent += event.target.innerText
                    numTwo += event.target.innerText
                    console.log(`it is now ${numTwo}`) // check
                    return
                } 
                display.textContent += numTwo
            }
        } 
        // if button has class of operator, save what operator it is
        else if (buttonClass.includes('operator')) {
            operator = event.target.innerText
            display.textContent += ` ${operator} `
            console.log(`you logged an operator: ${operator}`) // check

            // if operator is C - reset the entries
            if (operator === 'C') {
                display.textContent = 0
                numOne = numTwo = operator = null
                // log to check
                console.log('reset as: ', numOne, numTwo, operator)
            }
        }
        // else, pressing = equals will call the calcuate function
        else {
            const resultNumber = calcuate()
            // this saves the result as numOne if result is not empty and resets the others
            if (resultNumber) {
                numOne = resultNumber
                numTwo = operator = null
            } // else reset all
            else {
                numOne = numTwo = operator = null
            }
            // log to check
            console.log('saved as: ', numOne, numTwo, operator) 
        }
    })
  })


/*-------------------------------- Functions --------------------------------*/

// This function takes 2 numbers and an operator, then calculates the total
function calcuate() {
    // if both numbers have been selected
    if (numOne && numTwo) {
        console.log(`logging ${numOne} ${operator} ${numTwo}`) // log to check
        // turn strings into numbers
        numOne = Number(numOne)
        numTwo = Number(numTwo)
        let total;
    
        // check the operator and return the correct total
        if (operator == '+') {
            total = numOne + numTwo
        } else if (operator == '-') {
            total = numOne - numTwo
        } else if (operator == '*') {
            total = numOne * numTwo
        } else if (operator == '/') {
            if (!numTwo) {
                display.textContent = `Can't divide by 0.`
                console.log('this will result in NaN or infinity')
                return
            }
            total = numOne / numTwo
        }
        display.textContent = total
        console.log(`your total is: ${total}`)
        return total
    }
    // else, this will return numOne if no numTwo is selected
    else {
        display.textContent = numOne
        return numOne
    }
}