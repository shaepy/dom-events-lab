# 🧮 Retro Calculator
This is a lab assignment for General Assembly to create a functioning calculator. This calculator takes two multi-digit numbers and displays the result of a mathematical operation.

### Deployment 🔗 https://shaepy.github.io/retro-calculator
<br>
<img src="screenshot.png" width="700px">

## Tech Stack
* HTML
* CSS
* JavaScript

## Features
1. The calculator accepts multi-digit numbers and decimals
4. Plus-Minus (±) feature where you can set negative or positive integers for either number
2. The recent total is always saved so it can be used as the first number in the next operation
3. Displays the entire operation in the same display until the total

## MVP Requirements
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
2. Created an event listener for the HTML class of `button`. It would check to see whether the button class was an operator, number, or equals and continue the logic of determining which button, which operator, or calling the `calculate()` function (if equals).

<img width="600" alt="button-event-listener" src="https://github.com/user-attachments/assets/bd1d5133-2a80-46c8-925e-b3f4cf0b73e6" />

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

<img width="600" alt="refactor-js-nested-ifs" src="https://github.com/user-attachments/assets/4da261c8-7027-4df7-bf32-74bd14854e31" />

6. As I added more edge cases and fixed more bugs, I realized my code was getting nested with various if/else statements. This made it difficult to return and add more functionality due to the lack of modularity. I decided to refactor the code with a branch of `refactor-js`.
    * Added additional HTML attributes of `data-type` and `data-value` to some buttons.
    * The button event listener now calls a single function on each click that handles switching between each button with a specific `data-type` (operator, number, clear, equals, decimal, etc.). This allows for easy adding of new buttons or functionality in the future.
    * Each switch case in the `buttonClick()` function will match a `data-type` and call a different function based on that type. Example: `case 'number': handleNumber(value)` versus `case 'operator': handleOperator(value)`
    * This way, repeatable actions like `handleClear()` can be reused if needed.

```
// HTML refactored to include data-type and data-value to distinguish buttons
         <div class="button" data-type="number" data-value="7">7</div>
         <div class="button" data-type="number" data-value="8">8</div>
         <div class="button" data-type="number" data-value="9">9</div>
         <div class="button" data-type="operator" data-value="/">/</div>
         <div class="button" data-type="equals">=</div>
         <div class="button" data-type="plusminus">±</div>
         <div class="button" data-type="clear">C</div>
```
<img width="595" alt="buttonClick()" src="https://github.com/user-attachments/assets/ddf0677c-f1f0-4df5-b0a0-def0450ce086" />

<img width="527" alt="equals-and-clear" src="https://github.com/user-attachments/assets/0c13015c-4958-46e0-9ad2-08db80706c88" />

7. After refactoring my code to be more modular and easier to maintain, I added a new handler for a type of `decimal` and removed it from the `data-type` of `number`.
    * This allowed me to control the decimal logic specifically to this `data-type`.
    * Now I can cover the edge case of only one decimal being added to each number.
    * Also, added support to decimal so when pressed before a number, it defaults to `0.`

<img width="600" alt="handleDecimal()" src="https://github.com/user-attachments/assets/b3a64b0a-d2f0-4eed-9d0e-48eed1c0a9c1" />

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
