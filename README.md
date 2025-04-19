
# Description
This is a lab assignment for General Assembly to create a functioning calculator. This calculator takes two multi-digit numbers and displays the result of a mathematical operation.

<img src="screenshot.png">

## Deployment Link
https://shaepy.github.io/retro-calculator

## Technologies Used
* HTML
* CSS
* JavaScript

## Level Up Features
1. The calculator accepts multi-digit numbers and decimals
4. Plus-Minus (±) feature where you can set negative or positive integers for either number
2. The recent total is always saved so it can be used as the first number in the next operation
3. Displays the entire operation in the same display until the total

## Edge Cases Covered
* When trying to divide by 0, it returns a message "can't divide by 0".
* An Operator being selected before a number will now default to 0.
* Selecting another Operator will perform the operation automatically if there’s already two numbers.
* If only one number is selected, selecting multiple operators will switch the operator.
* When using the equals (=) sign before a second number is selected, it will keep the first number.
* When selecting ± before any button, it will default to 0. Trying to inverse a first number of 0 will default to 0 unless a decimal and number is selected.
* The ± sign can be used before a second number is chosen, and will toggle on/off without a second number.

## Known Bugs or Uncovered Edge Cases
* FIXED: Pressing clear was not saving the 0 value
* FIXED: Can't divide by zero text was not defaulting to 0 when operator was selected before number
* FIXED: Plus-Minus (±) was inversing the number 0 causing incorrect calculations
* FIXED: Calculations resulting in 0 would string the next numbers pressed

* To-Do: When using ± after a second number of 0, it will perform each operation automatically except subtraction.

## User Stories (MVP)
* As a user, I want to be able to select numbers so that I can perform operations with them.
* As a user, I want to be able to add two numbers together.
* As a user, I want to be able to subtract one number from another.
* As a user, I want to be able to multiply two numbers together.
* As a user, I want to be able to divide one number by another.
* As a user, I want to be able to see the output of the mathematical operation.
* As a user, I want to be able to clear all operations and start from 0.

## Further Improvements
Not yet implemented but considering on improving the calculator by:
1. Prevent more than one decimal per number
2. Display should not bleed numbers past the screen
