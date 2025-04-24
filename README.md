
# Retro Calculator
This is a lab assignment for General Assembly to create a functioning calculator. This calculator takes two multi-digit numbers and displays the result of a mathematical operation.

### Deployment Link: https://shaepy.github.io/retro-calculator
<br>
<img src="screenshot.png" width="700px">

## Technologies Used
* HTML
* CSS
* JavaScript

## Features
1. The calculator accepts multi-digit numbers and decimals
4. Plus-Minus (±) feature where you can set negative or positive integers for either number
2. The recent total is always saved so it can be used as the first number in the next operation
3. Displays the entire operation in the same display until the total

## User Stories (MVP Requirements)
As a user, I want to be able to:
* select numbers so that I can perform operations with them.
* add two numbers together.
* subtract one number from another.
* multiply two numbers together.
* divide one number by another.
* see the output of the mathematical operation.
* clear all operations and start from 0.

## Build/Code Process
1. The initial HTML and CSS were provided to us by the GA assignment. We were mainly to create the functionality of the calculator through JavaScript. 
    * Psuedo-code to begin. Example:
```
      I want to select two numbers and one operator, and calculate the total.
      When I click a button that's a number, I should know which number and display that number..
      When I click an operator, I should know which operator and display that operator..
      When I click equals, I should calculate the two numbers based on the operator
```
2. Created an event listener for the HTML class of `button`. It would check to see whether the button class was an operator, number, or equals and continue the logic of determining which button, which operator, or calling the calculate() function (if equals).
```
buttons.forEach((button) => {
     button.addEventListener('click', (event) => {
         // this makes an array of classes from the button that was pressed
         const buttonClasses = Array.from(button.classList)
 
```
3. After the main functionality for each button was working, I decided to tackle displaying the numbers and operators.
    * Turning the `display` class into a saved/cached element, `.textContent` would be used to switch the display based on which buttons were pressed.
    * I also changed the CSS for a more fitting design.
```
const displayDiv = document.querySelector(".display")
```
4. Once the display was functioning alongside the logic and behavior as expected, I began testing for additional edge cases and ways to improve the calculator by:
    * Adding multi-digit support for each number (no longer limited to only a single digit of 0, 1, 2, 3, etc.)
    * Checking for dividing by 0 (infinity/NaN) and preventing errors
    * Making the display show the entire operation before displaying the result
    * Accepting and supporting decimals

5. Some minor bugs and unintended behavior would occur. Also tackled that by fixing these bugs:
    * Pressing clear was not saving the 0 value
    * 'Can't divide by zero' text was not defaulting to 0 when operator was selected before number
    * Plus-Minus (±) was inversing the number 0 causing incorrect calculations
    * Calculations resulting in 0 would string the next numbers pressed
    * Toggling Plus-Minus before second number was presesd would result in NaN

<img width="650" alt="refactor-js-nested-ifs" src="https://github.com/user-attachments/assets/4da261c8-7027-4df7-bf32-74bd14854e31" />

6. As I added more edge cases and fixed more bugs, I realized my code was getting nested with various if/else statements. This made it difficult to return and add more functionality due to the lack of modularity. I decided to refactor the code with a branch of `refactor-js`.
    * Added additional HTML attributes of `data-type` and `data-value` to some buttons.
    * The button event listener now calls a single function on each click that handles switching between each button with a specific `data-type` (operator, number, clear, equals, decimal, etc.). This allows for easy adding of new buttons or functionality in the future.
    * Each switch case in the `buttonClick()` function will match a `data-type` and call a different function based on that type. Example: `case 'number': handleNumber(value)` versus `case 'operator': handleOperator(value)`
    * This way, repeatable actions like `handleClear()` can be reused if needed.

```
// HTML
// refactored to include data-type and data-value to distinguish buttons
         <div class="button" data-type="number" data-value="7">7</div>
         <div class="button" data-type="number" data-value="8">8</div>
         <div class="button" data-type="number" data-value="9">9</div>
         <div class="button" data-type="operator" data-value="/">/</div>
         <div class="button" data-type="equals">=</div>
         <div class="button" data-type="plusminus">±</div>
         <div class="button" data-type="clear">C</div>

// app.js
// Event listener for each button when pressed, to call the buttonClick function
buttons.forEach(button => {
     button.addEventListener('click', buttonClick)
   })

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
        case 'number': handleNumber(value); break
        case 'operator': handleOperator(value); break
        case 'equals': handleEquals(); break
        case 'clear': handleClear(); break
        case 'plusminus': handlePlusMinus(); break
        case 'decimal': handleDecimal(); break
    }
}
```
```
// This function sets variables back to null and displays '0'
function handleClear() {
    // reset everything
    n1 = n2 = operator = null
    display.textContent = '0'
    console.log('resetting..', n1, n2, operator)
}
```
7. After refactoring my code to be more modular and easier to maintain, I added a new handler for a type of `decimal` and removed it from the `data-type` of `number`.
    * This allowed me to control the decimal logic specifically to this `data-type`.
    * Now I can cover the edge case of only one decimal being added to each number.
    * Also, added support to decimal so when pressed before a number, it defaults to `0.`
```
// This function applies decimal logic based on which number it is being added to
function handleDecimal() {
    const decimal = '.'
    // assigns number to currentNum based on whether operator is null or not (1st or 2nd number)
    let currentNum = operator === null ? n1 : n2
    // if currentNum is false (null), set to 0
    if (!currentNum) {
        currentNum = '0'
    } // if currentNum already includes a decimal, return
    else if (currentNum.includes(decimal)) {
        console.log('already a decimal. cannot have multiple')
        return
    }
    // add decimal to currentNum
    currentNum += decimal
    
    // check if n1
    if (operator === null) {
        n1 = currentNum
        display.textContent = n1
    // or if n2
    } else {
        n2 = currentNum
        display.textContent = `${n1} ${operator} ${n2}`
    }
}
```

## Edge Cases Covered
* When trying to divide by 0, it returns a message "can't divide by 0".
* An Operator being selected before a number will now default to 0.
* Selecting another Operator will perform the operation automatically if there’s already two numbers.
* If only one number is selected, selecting multiple operators will switch the operator.
* When using the equals (=) sign before a second number is selected, it will keep the first number.
* When selecting ± before any button, it will default to 0. Trying to inverse a first number of 0 will default to 0 unless a decimal and number is selected.
* The ± sign can be used before a second number is chosen, and will toggle on/off without a second number.
* Prevents more than one decimal per number

## Next Steps
* Fix display so it does not bleed numbers past the screen
* Backspace functionality
* Additional modularity: combining `handleNumber` and `handleDecimal` into a `handleInput(type, value)` handler.
