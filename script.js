// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task to the list and local storage
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();

    if (task) {
        const taskList = document.getElementById('taskList');
        const listItem = createTaskElement(task);
        taskList.appendChild(listItem);

        saveTask(task);
        taskInput.value = '';
    }
}

// Create a task list item element
function createTaskElement(taskText) {
    const listItem = document.createElement('li');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onclick = markTaskCompleted;
    
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = deleteTask;

    listItem.appendChild(checkbox);
    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteButton);

    return listItem;
}

// Mark task as completed
function markTaskCompleted() {
    const listItem = this.parentElement;
    listItem.classList.toggle('completed');
}

// Delete task from the list and local storage
function deleteTask() {
    const listItem = this.parentElement;
    const taskText = listItem.querySelector('span').textContent;

    listItem.remove();
    removeTask(taskText);
}

// Save task to local storage
function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(task => {
        const taskList = document.getElementById('taskList');
        const listItem = createTaskElement(task);
        taskList.appendChild(listItem);
    });
}

// Remove task from local storage
function removeTask(task) {
    const tasks = getTasks();
    const updatedTasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// Get tasks from local storage
function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}
