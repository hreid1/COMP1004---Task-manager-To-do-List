let tasks = []; // Array to store tasks

// Function to add a task
function addTask() {
    var taskInput = document.getElementById("taskInput").value;
    var dueDate = document.getElementById("dueDate").value;
    var priority = document.getElementById("priority").value;
    var categoryInput = document.getElementById("categoryInput").value;

    // Create task object
    var task = {
        title: taskInput,
        dueDate: dueDate,
        priority: priority,
        category: categoryInput,
        status: "Pending"
    };

    // Add task object to tasks array
    tasks.push(task);

    // Save tasks to local storage as JSON string
    saveTasksToLocalStorage();

    // Display tasks
    displayTasks();

    // Clear input fields
    document.getElementById("taskInput").value = "";
    document.getElementById("dueDate").value = "";
    document.getElementById("categoryInput").value = "";
}

// Function to display tasks
function displayTasks() {
    // Retrieve tasks from local storage and parse JSON string
    tasks = getTasksFromLocalStorage();

    // Display tasks in UI
    var taskList = document.getElementById("taskList");
    var completedList = document.getElementById("completedList");
    taskList.innerHTML = "";
    completedList.innerHTML = "";

    tasks.forEach(function(task, index) {
        var li = document.createElement("li");
        li.textContent = "Task: " + task.title + ", Due Date: " + task.dueDate + ", Priority: " + task.priority + ", Category: " + task.category;

        // Create checkbox for each task
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.status === "Completed"; // Check the box if task is completed
        checkbox.addEventListener("change", function() {
            toggleTaskStatus(index);
        });
        li.appendChild(checkbox);

        // Create delete button for each task
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function() {
            deleteTask(index);
        });
        li.appendChild(deleteBtn);

        if (task.status === "Completed") {
            completedList.appendChild(li);
        } else {
            taskList.appendChild(li);
        }
    });
}

// Function to toggle task status
function toggleTaskStatus(index) {
    tasks[index].status = tasks[index].status === "Pending" ? "Completed" : "Pending";
    saveTasksToLocalStorage();
    displayTasks();
}

// Function to delete a task
function deleteTask(index) {
    // Remove task from tasks array
    tasks.splice(index, 1);

    // Update local storage with updated tasks array
    saveTasksToLocalStorage();

    // Refresh task list
    displayTasks();
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to retrieve tasks from local storage
function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Function to handle initial display of tasks
window.onload = displayTasks();
