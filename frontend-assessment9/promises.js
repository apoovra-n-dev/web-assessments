//Task1 - Promise Utilities

//1. allRequired()

function allRequired(promises) {
    return Promise.all(promises);
}
const p1 = Promise.resolve("A");
const p2 = Promise.resolve("B");
const p3 = Promise.resolve("C");

allRequired([p1, p2, p3])
    .then(result => console.log(result))
    .catch(error => console.log(error));


//2. firstSuccess()

function firstSuccess(promises) {
    return Promise.any(promises);
}
const q1 = Promise.reject("Failed");
const q2 = Promise.resolve("Success");

firstSuccess([q1, q2])
    .then(result => console.log(result))
    .catch(error => console.log(error));


//3.withTimeout()

function withTimeout(promise, ms) {

    return new Promise((resolve, reject) => {

        // Start timeout
        const timer = setTimeout(() => {
            reject(new Error("Timeout"));
        }, ms);

        // Handle original Promise
        promise
            .then(result => {

                // Promise finished before timeout
                clearTimeout(timer);
                resolve(result);

            })
            .catch(error => {

                // Promise failed before timeout
                clearTimeout(timer);
                reject(error);

            });
    });
}



//Task2 - Local Storage Preference Manager

//savePreference(key, value)
function savePreference(key, value) {
    localStorage.setItem(key, value);
}
savePreference("theme", "dark");
savePreference("language", "English");
savePreference("fontSize", "large");


// 2. Get preference
function getPreference(key) {
    return localStorage.getItem(key);
}
console.log(getPreference("theme"));
console.log(getPreference("language"));
console.log(getPreference("fontSize"));


// Remove one preference

function removePreference(key) {
    localStorage.removeItem(key);
}
removePreference("fontSize");

console.log(getPreference("fontSize"));


// 4. Clear all preferences
function clearPreferences() {
    localStorage.clear();
}

clearPreferences();

console.log(getPreference("theme"));
console.log(getPreference("language"));


//Task3 - Storage Synchronization

// THEME

const themeText = document.getElementById("themeText");

function changeTheme(theme) {

    // Save theme in localStorage
    localStorage.setItem("theme", theme);

    // Apply theme
    applyTheme(theme);
}


function applyTheme(theme) {

    if (theme === "dark") {

        // Change background
        document.body.classList.add("dark");

        // Change heading text
        themeText.textContent = "Theme: Dark";

    } else {

        // Remove dark background
        document.body.classList.remove("dark");

        // Change heading text
        themeText.textContent = "Theme: Light";
    }
}


// Get saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
    applyTheme(savedTheme);
} else {
    applyTheme("light");
}

//Task 4-Event Loop Debugging

   console.log("start")

        setTimeout(() => {

            console.log("setTimeout");

        }, 0);


        Promise.resolve().then(() => {

            console.log("Promise.then");

        });


        queueMicrotask(() => {

            console.log("queueMicrotask");

        });

        console.log("End");


        
        Promise.resolve()

            .then(() => {

                console.log("Message A");

            })

            .then(() => {

                console.log("Message B");

            });


// Task 5 - Offline-Aware UI


// 1. ONLINE / OFFLINE STATUS

const connectionStatus =
    document.getElementById("connectionStatus");


function updateConnectionStatus() {

    if (navigator.onLine) {

        connectionStatus.textContent = "Online";

        connectionStatus.className = "online";

    } else {

        connectionStatus.textContent = "Offline";

        connectionStatus.className = "offline";
    }
}


// Check status when page loads

updateConnectionStatus();


// When internet comes back

window.addEventListener("online", function () {

    updateConnectionStatus();

});


// When internet is lost

window.addEventListener("offline", function () {

    updateConnectionStatus();

});


function getUserData() {
    return new Promise(function (resolve) {

        setTimeout(function () {

            resolve({
                name: "Apoorva",
                role: "Java Full Stack Developer"
            });

        }, 2000);
    });
}


function getProductData() {
    return new Promise(function (resolve) {

        setTimeout(function () {

            resolve({
                name: "Laptop",
                price: 60000
            });

        }, 1500);
    });
}


const loading = document.getElementById("loading");
const error = document.getElementById("error");

const userData = document.getElementById("userData");
const productData = document.getElementById("productData");


loading.textContent = "Loading data...";


Promise.all([
    getUserData(),
    getProductData()
])
.then(function (results) {

    const user = results[0];
    const product = results[1];

    userData.textContent =
        user.name + " - " + user.role;

    productData.textContent =
        product.name + " - ₹" + product.price;

})
.catch(function (err) {

    error.textContent =
        "Error loading data: " + err.message;

})
.finally(function () {

    loading.textContent = "Data loaded successfully ✓";

});