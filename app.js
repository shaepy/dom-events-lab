/* 

- HTML was altered to include data-type attribute and data-value attributes to
easily identify which button type and which value for numbers/operators that have
multiple values.

*/

/*-------------------------------- Constants --------------------------------*/

const display = document.querySelector('.display')
const buttons = document.querySelectorAll('.button')

/*-------------------------------- Variables --------------------------------*/

let n1 = null
let n2 = null
let operator = null

/*------------------------ Cached Element References ------------------------*/

/*----------------------------- Event Listeners -----------------------------*/

buttons.forEach(button => {
    // For each button click, call the buttonClick function
    button.addEventListener('click', buttonClick)
  })

/*-------------------------------- Functions --------------------------------*/

// This function will switch based on which type of button it is
function buttonClick(event) {
    const button = event.target
    const type = button.dataset.type
    const value = button.dataset.value
    // log to check 
    console.log('this button is a:', type)
    console.log('value is:', value)

    // each type of button will perform a different function
    switch (type) {
        case 'number':
            handleNumber(value)
            break
        case 'operator':
            handleOperator(value)
            break
        case 'equals':
            handleEquals()
            break
        case 'clear':
            handleClear()
            break
        case 'plusminus':
            handlePlusMinus()
            break
        case 'decimal':
            handleDecimal()
    }
}

// This function figures out which position number and displays it
function handleNumber(value) {
    if (operator === null) {
        if (n1 === '0') {
            n1 = null
            display.textContent = '0'
        }
        // is number1 true ? yes, add it. no, assign it.
        n1 = n1 ? n1 + value : value
        display.textContent = n1
    } else {
        // is nunmber2 true ? yes, add it. no, assign it.
        n2 = n2 ? n2 + value : value
        display.textContent = `${n1} ${operator} ${n2}`
    }
}

// This function figures out which operator and displays it
function handleOperator(value) {
    // if operator is pressed before number1
    if (n1 === null) {n1 = '0'}

    // if operator is pressed when 2 numbers have been pressed, calculate the total
    if (n1 && n2) {
      const result = calculate()
      // if the result returned is undefined (divided by 0)
      if (result === undefined) {return}
      // otherwise, set result to number1 and number2 to null
      n1 = result
      n2 = null
    }
    operator = value
    display.textContent = `${n1} ${operator}`
  }

// This function calls the calculate function when equals is pressed
function handleEquals() {
    // call the calculate function
    const result = calculate()
    // if result returned is not undefined
    if (result !== undefined) {
        display.textContent = result // display
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
    console.log('resetting...', n1, n2, operator)
}

// This function checks which number and applies inverse of number
function handlePlusMinus() {
// if no operation was pressed yet
    if (operator === null) {
        // check for n1. if yes, convert to negative
        n1 = n1 ? String(Number(n1) * -1) : '0'
        console.log(n1)
        display.textContent = n1
    } else {
        if (n2 === '-') {
            console.log('this is already negative')
            n2 = null
            return display.textContent = `${n1} ${operator} `
        }
        // check for n2. if yes, convert to negative
        n2 = n2 ? String(Number(n2) * -1) : '-'
        display.textContent = `${n1} ${operator} ${n2}`
    }
}

function handleDecimal() {
    const decimal = '.'
    // assigns number to currentNum based on whether operator is null or not
    let currentNum = operator === null ? n1 : n2

    if (!currentNum) {
        currentNum = '0'
    } 
    else if (currentNum.includes(decimal)) {
        console.log('already a decimal. cannot have multiple')
        return
    }

    currentNum += decimal
    
    if (operator === null) {
        n1 = currentNum
        display.textContent = n1
    } else {
        n2 = currentNum
        display.textContent = `${n1} ${operator} ${n2}`
    }
}

function calculate() {
// if both are null, call clear function
    if (!n1 && !n2) {return handleClear()}
    // else, return n1 if n2 is missing
    else if (!n2) {return n1}

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
            display.textContent = "Can't divide by 0"
            return
            }
            result = first / second
            break
    }
    console.log('total is =', result)
    return String(result)
}