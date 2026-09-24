# JavaScript Mouse Events Practice

## About

This project is a JavaScript practice project created to understand and practice
DOM event handling using `addEventListener()` and `removeEventListener()`.

A button changes its styles when the mouse moves over it and returns to its
original style when the mouse moves out.

## Technologies Used

- HTML5
- CSS3
- JavaScript

## Concepts Practiced

- `getElementById()`
- `addEventListener()`
- `removeEventListener()`
- `mouseover` event
- `mouseout` event
- Arrow functions
- DOM style manipulation
- CSS `linear-gradient()`
- CSS `box-shadow`
- Button hover effects

## How It Works

### Mouse Over

When the mouse pointer moves over the button:

- Background gradient changes
- Text color changes to white
- Padding is applied
- Border radius changes
- Box shadow is applied

```javascript
btn.addEventListener("mouseover", btnStyleMouseOver);