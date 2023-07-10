const input = document.getElementById('task');
const list = document.getElementById('list');

let tasks = [];

// Function to add a task
function addTask() {
    const task = input.value;
    
    if (task !== '') {
        tasks.push({ name: task, completed: false });
        renderTasks();
        input.value = '';
    }
}

// Function to toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Function to remove a task
function removeTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Function to render tasks in the list container
function renderTasks() {
    // Clear the list container
    list.innerHTML = '';

    // Create separate arrays for completed and incomplete tasks
    const completedTasks = [];
    const incompleteTasks = [];

    // Split tasks into completed and incomplete arrays
    tasks.forEach((task, index) => {
        if (task.completed) {
            completedTasks.push({ ...task, index });
        } else {
            incompleteTasks.push({ ...task, index });
        }
    });

    // Render incomplete tasks first
    incompleteTasks.forEach((task) => {
        createTaskElement(task);
    });

    // Render completed tasks last
    completedTasks.forEach((task) => {
        createTaskElement(task);
    });
}

function createTaskElement(task) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(task.index));

    const span = document.createElement('span');
    span.innerText = task.name;
    if (task.completed) {
        span.style.textDecoration = 'line-through';
    }

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'x';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => removeTask(task.index));

    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');
    taskContainer.appendChild(checkbox);

    const taskNameContainer = document.createElement('div');
    taskNameContainer.classList.add('task-name-container');
    taskNameContainer.appendChild(span);

    taskContainer.appendChild(taskNameContainer);

    li.appendChild(taskContainer);
    li.appendChild(deleteButton);

    list.appendChild(li);
}



