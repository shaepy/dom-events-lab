/* 
The HTML was altered to include data-type attribute and data-value attributes to
easily identify which button type and which value for numbers/operators that have
multiple values.
*/

/*-------------------------- Variables & Constants --------------------------*/

let n1 = null
let n2 = null
let operator = null

/*------------------------ Cached Element References ------------------------*/

const display = document.querySelector('.display')
const buttons = document.querySelectorAll('.button')

/*----------------------------- Event Listeners -----------------------------*/

buttons.forEach(button => {
    button.addEventListener('click', buttonClick)
  })

/*-------------------------------- Functions --------------------------------*/

// This function will switch based on which type of button it is
function buttonClick(event) {
    const button = event.target
    const type = button.dataset.type
    const value = button.dataset.value

    console.log('this button is a:', type)
    console.log('value is:', value)

    switch (type) {
        case 'number': handleNumber(value); break
        case 'operator': handleOperator(value); break
        case 'equals': handleEquals(); break
        case 'clear': handleClear(); break
        case 'plusminus': handlePlusMinus(); break
        case 'decimal': handleDecimal(); break
    }
}

// This function figures out which position number and displays it
function handleNumber(value) {
    if (operator === null) {
        if (n1 === '0') {
            n1 = null
            display.textContent = '0'
        }
        n1 = n1 ? n1 + value : value
        display.textContent = n1
    } else {
        n2 = n2 ? n2 + value : value
        display.textContent = `${n1} ${operator} ${n2}`
    }
}

// This function figures out which operator and displays it
function handleOperator(value) {
    if (n1 === null) n1 = '0'

    if (n1 && n2) {
        console.log('already have 2 numbers, calculating first..')
        const result = calculate()
        if (result === undefined) {return}
        n1 = result
        n2 = null
    }
    operator = value
    display.textContent = `${n1} ${operator}`
  }

// This function calls the calculate function when equals is pressed
function handleEquals() {
    const result = calculate()
    if (result !== undefined) {
        display.textContent = result
        // reset numbers, keep number1
        n1 = result
        n2 = null
        operator = null
    }
}

// This function sets variables back to null and displays '0'
function handleClear() {
    // reset everything
    n1 = n2 = operator = null
    display.textContent = '0'
    console.log('resetting..', n1, n2, operator)
}

// This function checks which number and applies inverse of number
function handlePlusMinus() {
    if (operator === null) {
        // check for n1
        n1 = n1 ? String(Number(n1) * -1) : '0'
        console.log('inversed:', n1)
        display.textContent = n1
    } 
        // this is already negative, toggle
    else {
        if (n2 === '-') {
            console.log('this is already negative')
            n2 = null
            return display.textContent = `${n1} ${operator} `
        }
        // check for n2
        n2 = n2 ? String(Number(n2) * -1) : '-'
        console.log('inversed:', n2)
        display.textContent = `${n1} ${operator} ${n2}`
    }
}

// This function applies decimal logic based on which number it is being added to
function handleDecimal() {
    const decimal = '.'
    // This checks which number (n1 or n2) and assigns to currentNum
    let currentNum = operator === null ? n1 : n2

    if (!currentNum) {currentNum = '0'}
    else if (currentNum.includes(decimal)) {
        console.log('already a decimal. cannot have multiple')
        return
    }
    currentNum += decimal
    
    // if n1
    if (operator === null) {
        n1 = currentNum
        display.textContent = n1
    // else if n2
    } else {
        n2 = currentNum
        display.textContent = `${n1} ${operator} ${n2}`
    }
}

// This function calculates the total between two numbers
function calculate() {
    if (!n1 && !n2) return handleClear()
    else if (!n2) return n1

    const first = Number(n1)
    const second = Number(n2)
    let result

    console.log(`${n1} ${operator} ${n2}`)

    switch(operator) {
        case '+': result = first + second; break
        case '-': result = first - second; break
        case '*': result = first * second; break
        case '/':
            if (second === 0) {
            console.log('cannot divide. will lead to infinity or NaN')
            handleClear()
            display.textContent = "Can't divide by 0."
            return
            }
            result = first / second
            break
    }
    console.log('total is =', result)
    return String(result)
}