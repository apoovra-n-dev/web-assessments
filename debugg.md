# JavaScript Debugging & Breakpoints Practice

## About

This project is a JavaScript debugging practice project created to understand
different debugging techniques available in browser Developer Tools.

The project covers breakpoints, conditional breakpoints, event listener
breakpoints, logpoints, DOM breakpoints, Fetch/XHR breakpoints, function
breakpoints, exception breakpoints, and the `debugger` statement.

## Technologies Used

- HTML5
- JavaScript
- Browser Developer Tools

## Debugging Concepts Practiced

- Line Breakpoints
- Conditional Breakpoints
- Event Listener Breakpoints
- Logpoints
- DOM Breakpoints
- XHR / Fetch Breakpoints
- Function Breakpoints
- Exception Breakpoints
- `debugger` Statement

---

## 1. Line Breakpoint

A line breakpoint pauses JavaScript execution at a specific line.

Example:

```javascript
let price = 100;
let quantity = 2;
let total = price * quantity;
console.log(total);