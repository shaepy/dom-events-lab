/*-------------------------------- Constants --------------------------------*/

// Saving the div with class of display 
const display = document.querySelector('.display')

/*-------------------------------- Variables --------------------------------*/

// To perform a calculate, we need to know what numbers and which operation
let numOne = null;
let numTwo = null
let operator = null


/*------------------------ Cached Element References ------------------------*/

// Represent the buttons
const buttons = document.querySelectorAll('.button')

// This verifies the button values are correct
console.log(buttons)


/*----------------------------- Event Listeners -----------------------------*/

buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        // this makes an array of classes from the button that was pressed
        const buttonClass = Array.from(button.classList)

        // if button has class of number, save what number it is
        if (buttonClass.includes('number')) {
            // and if the operator has not been selected 
            if (operator == null) {
                if (numOne == null || numOne == '0') {
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

        // if button has class of operator
        else if (buttonClass.includes('operator')) {
            // and if operator was pressed before first number was selected, default to 0
            if (numOne == null) {
                numOne = '0'
                display.textContent = numOne
                console.log('defaulting to ' , numOne)
            } 
            // if there's already two numbers chosen
            else if (numOne && numTwo) {
                console.log('we should perform the previous operation first')
                const anotherResult = calculate()
                // reset if calculation came back undefined (divided by 0)
                if (anotherResult == undefined) {
                    numOne = numTwo = operator = null
                    return
                }
                numOne = anotherResult
                numTwo = null
                operator = event.target.innerText
                display.textContent = `${numOne} ${operator} `
                // log to check
                console.log('saved as: ', numOne, numTwo, operator) 
                return
            }  // if operator has already been chosen
            else if (operator) {
                console.log(`there's already an operator here. switching it`)
                operator = event.target.innerText
                display.textContent = `${numOne} ${operator} `
                console.log('updated operator to:', operator) // check
                return
            }
            operator = event.target.innerText
            display.textContent += ` ${operator} `
            console.log(`you logged an operator: ${operator}`) // check
        }
        // if operator is C - reset the entries
        else if (buttonClass.includes('clear')) {
            display.textContent = 0
            numOne = numTwo = operator = null
            // log to check
            console.log('reset as: ', numOne, numTwo, operator)
        }

        // if button is plusminus sign (inverse negative/positive)
        else if (buttonClass.includes('plusminus')) {
            // if its the first number
            if (operator == null) {
                if (numOne === '0') {
                    console.log(`this is a 0, cannot make negative.`)
                    display.textContent = numOne
                }
                else if (numOne) {
                    numOne = Number(numOne) * -1
                    display.textContent = numOne
                    console.log(`making it -${numOne}`)
                }
                else {
                    numOne = null
                    display.textContent = '0'
                    console.log('no first number. defaulting to', numOne)
                }
            }
            // else, its the second one 
            else {
                // places the plusminus on an existing number
                if (numTwo) {
                    numTwo = Number(numTwo) * -1
                    display.textContent = `${numOne} ${operator} ${numTwo}`
                    console.log(`making it -${numTwo}`)
                } // plusminus before a number is selected
                else {
                    console.log(`adding a negative value before number is pressed`)
                    numTwo = '-'
                    display.textContent = `${numOne} ${operator} ${numTwo}`
                    console.log('waiting for next number, just',numTwo)
                }
            }
        }

        // else, pressing = equals will call the calculate function
        else {
            const resultNumber = calculate()
            // this saves the result as numOne if result is not empty and resets the others
            if (resultNumber) {
                numOne = resultNumber
                display.textContent = resultNumber
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
function calculate() {
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
        console.log(`your total is: ${total}`)
        if (total === 0) {
            total = '0'
        }
        return total
    }
    // else, this will return numOne if no numTwo is selected
    else {
        display.textContent = numOne
        return numOne
    }
}