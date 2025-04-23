
# Retro Calculator
This is a lab assignment for General Assembly to create a functioning calculator. This calculator takes two multi-digit numbers and displays the result of a mathematical operation.

<img src="screenshot.png" width="700px">

## Deployment Link
https://shaepy.github.io/retro-calculator

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
    * Psuedo-code to begin: ex. when I click a button that's a number, I should know which number and display that number.
    * After psuedo-code for most of the main buttons (numbers, operators, equals)
    * Created an event listener for the HTML class of `button`. It would check to see whether the button was an operator, number, or equals and continue the logic of determining which button, which operator, or calling the calculate() function.
        * Calculate function tied to equals being pressed that calculates the result between number 1 and number 2
        * Clear functionality included in button event listener

2. After the main functionality for each button was working, I decided to tackle displaying the numbers and operators.
    * Turning the `display` class into a saved/cached element, `.textContent` would be used to switch the display based on which buttons were pressed.

3. Once the display was functioning alongside the logic and behavior as expected, I began testing for additional edge cases and ways to improve the calculator by:
    * Adding multi-digit support for each number (no longer limited to only a single digit of 0, 1, 2, 3, etc.)
    * Checking for dividing by 0 (infinity/NaN) and preventing errors
    * Making the display show the entire operation before displaying the result
    * Accepting and supporting decimals

4. Some minor bugs and unintended behavior would occur. Also tackled that by fixing these bugs:
    * Pressing clear was not saving the 0 value
    * 'Can't divide by zero' text was not defaulting to 0 when operator was selected before number
    * Plus-Minus (±) was inversing the number 0 causing incorrect calculations
    * Calculations resulting in 0 would string the next numbers pressed
    * Toggling Plus-Minus before second number was presesd would result in NaN

5. As I added more edge cases and fixed more bugs, I realized my code was getting nested with various if/else statements. This made it difficult to return and add more functionality due to the lack of modularity. I decided to refactor the code with a branch of `refactor-js`.
    * Added additional HTML attributes of `data-type` and `data-value` to some buttons.
    * The button event listener now calls a single function on each click that handles switching between each button with a specific `data-type` (operator, number, clear, equals, decimal, etc.). This allows for easy adding of new buttons or functionality in the future.
    * Each switch case in the `buttonClick()` function will match a `data-type` and call a different function based on that type. Example: `case 'number': handleNumber(value)` versus `case 'operator': handleOperator(value)`
    * This way, repeatable actions like `handleClear()` can be reused if needed.

6. After refactoring my code to be more modular and easier to maintain, I added a new handler for a type of `decimal` and removed it from the `data-type` of `number`.
    * This allowed me to control the decimal logic specifically to this `data-type`.
    * Now I can cover the edge case of only one decimal being added to each number.
    * Also, added support to decimal so when pressed before a number, it defaults to `0.`

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
