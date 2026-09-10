// Get HTML elements

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const taskCount = document.getElementById("taskCount");
const emptyMessage = document.getElementById("emptyMessage");
const clearCompleted = document.getElementById("clearCompleted");

const filterButtons = document.querySelectorAll(".filter-btn");


// Get tasks from localStorage

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Current filter

let currentFilter = "all";


// Display tasks when page loads

displayTasks();


// Add task

addBtn.addEventListener("click", addTask);


// Press Enter to add task

taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});


// Add Task Function

function addTask() {

    const taskText = taskInput.value.trim();


    // Validation

    if (taskText === "") {

        alert("Please enter a task!");

        return;
    }


    // Create task object

    const task = {

        id: Date.now(),

        text: taskText,

        completed: false

    };


    // Add task to array

    tasks.push(task);


    // Save task

    saveTasks();


    // Clear input

    taskInput.value = "";


    // Display tasks

    displayTasks();

}


// Display Tasks

function displayTasks() {

    taskList.innerHTML = "";


    const searchText = searchInput.value
        .toLowerCase()
        .trim();


    // Filter tasks

    let filteredTasks = tasks.filter(function (task) {

        // Search filter

        const matchesSearch =
            task.text.toLowerCase().includes(searchText);


        // Category filter

        let matchesFilter = true;


        if (currentFilter === "active") {

            matchesFilter = !task.completed;

        }


        if (currentFilter === "completed") {

            matchesFilter = task.completed;

        }


        return matchesSearch && matchesFilter;

    });


    // Show empty message

    if (filteredTasks.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }


    // Create task elements

    filteredTasks.forEach(function (task) {

        const li = document.createElement("li");

        li.classList.add("task");


        if (task.completed) {

            li.classList.add("completed");

        }


        // Checkbox

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.classList.add("task-checkbox");

        checkbox.checked = task.completed;


        checkbox.addEventListener("change", function () {

            toggleTask(task.id);

        });


        // Task text

        const span = document.createElement("span");

        span.classList.add("task-text");

        span.textContent = task.text;


        // Edit button

        const editButton = document.createElement("button");

        editButton.classList.add("edit-btn");

        editButton.textContent = "Edit";


        editButton.addEventListener("click", function () {

            editTask(task.id);

        });


        // Delete button

        const deleteButton = document.createElement("button");

        deleteButton.classList.add("delete-btn");

        deleteButton.textContent = "Delete";


        deleteButton.addEventListener("click", function () {

            deleteTask(task.id);

        });


        // Add elements to li

        li.appendChild(checkbox);

        li.appendChild(span);

        li.appendChild(editButton);

        li.appendChild(deleteButton);


        // Add li to list

        taskList.appendChild(li);

    });


    updateTaskCount();

}


// Toggle completed

function toggleTask(id) {

    tasks = tasks.map(function (task) {

        if (task.id === id) {

            task.completed = !task.completed;

        }


        return task;

    });


    saveTasks();

    displayTasks();

}


// Edit task

function editTask(id) {

    const task = tasks.find(function (task) {

        return task.id === id;

    });


    if (!task) {

        return;

    }


    const newText = prompt(
        "Edit your task:",
        task.text
    );


    if (newText === null) {

        return;

    }


    const updatedText = newText.trim();


    if (updatedText === "") {

        alert("Task cannot be empty!");

        return;

    }


    task.text = updatedText;


    saveTasks();

    displayTasks();

}


// Delete task

function deleteTask(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this task?"
    );


    if (!confirmDelete) {

        return;

    }


    tasks = tasks.filter(function (task) {

        return task.id !== id;

    });


    saveTasks();

    displayTasks();

}


// Search

searchInput.addEventListener("input", function () {

    displayTasks();

});


// Filter buttons

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Remove active class

        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        // Add active class

        button.classList.add("active");


        // Get filter

        currentFilter = button.dataset.filter;


        displayTasks();

    });

});


// Clear completed

clearCompleted.addEventListener("click", function () {

    tasks = tasks.filter(function (task) {

        return !task.completed;

    });


    saveTasks();

    displayTasks();

});


// Update task count

function updateTaskCount() {

    const remainingTasks = tasks.filter(function (task) {

        return !task.completed;

    }).length;


    if (remainingTasks === 1) {

        taskCount.textContent = "1 task remaining";

    } else {

        taskCount.textContent =
            remainingTasks + " tasks remaining";

    }

}


// Save tasks to localStorage

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}