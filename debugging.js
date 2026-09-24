
//breakpoints

//line breakpoints

// let price = 100;
// let quantity = 2;

// let total = price * quantity;

// console.log(total);

//conditional breakpoints

// for (let i = 1; i <= 100; i++) {
//     console.log(i);
// }

//Event Listener Breakpoint

// Get the button from HTML
// let button = document.getElementById("myButton");

// Add click event
// button.addEventListener("click", function () {
//     console.log("clicked");
// });

// Logpoint

let price1 = 100;
let quantity1 = 2;

let total1 = price * quantity;

console.log(total1);

//DOM breakpoint

box.textContent = "Welcome";

//XHR / Fetch Breakpoint

fetch("http://localhost:3000/users");

//Function Breakpoint

function calculateTotal(price, quantity) {
    let total = price * quantity;
    return total;
}

let result = calculateTotal(100, 2);

console.log(result);

//Exception Breakpoint

try {
    let result = unknownVariable; // ❌ exception
} catch (error) {
    console.log("Error handled");
}

//debugger statement

let price = 100;
let quantity = 2;

debugger; // 🔴 Browser pauses here

let total = price * quantity;

console.log(total);

