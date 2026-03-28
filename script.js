// Select elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const taskCount = document.getElementById('taskCount');
const clearAllBtn = document.getElementById('clearAll');
const emptyState = document.getElementById('empty-state');

// Load tasks from local storage or initialize empty array
let tasks = JSON.parse(localStorage.getItem('todos')) || [];

// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem('todos', JSON.stringify(tasks));
}

// Function to update the task count display
function updateTaskCount() {
    const remainingTasks = tasks.filter(task => !task.completed).length;
    taskCount.textContent = `${remainingTasks} Tersisa`;

    // Toggle empty state visibility
    if (tasks.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = ' ';
    }
}

// Function to render the To-Do list
function renderTasks() {
    todoList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <div class="item-content" onclick="toggleTask(${index})">
                <div class="checkbox">
                    <i class="fa-solid fa-check"></i>
                </div>
                <span class="todo-text">${task.text}</span>
            </div>
            <button class="delete-btn" onclick="deleteTask(${index})">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;
        
        todoList.appendChild(li);
    });

    updateTaskCount();
}

// Function to add a new task
function addTask() {
    const text = todoInput.value.trim();
    if (text === '') return;

    const newTask = {
        text: text,
        completed: false,
        id: Date.now()
    };

    tasks.push(newTask);
    todoInput.value = '';
    saveTasks();
    renderTasks();
}

// Function to toggle task completion
window.toggleTask = function(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
};

// Function to delete a task
window.deleteTask = function(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
};

// Clear all tasks
clearAllBtn.addEventListener('click', () => {
    if (tasks.length === 0) return;
    if (confirm('Apakah kamu yakin ingin menghapus semua tugas?')) {
        tasks = [];
        saveTasks();
        renderTasks();
    }
});

// Event listeners
addBtn.addEventListener('click', addTask);

// Support for 'Enter' key
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initial render
renderTasks();
