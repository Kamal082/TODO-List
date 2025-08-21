const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#task-list li').forEach(li => {
    tasks.push({
      text: li.querySelector('span').innerText,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    createTaskElement(task.text, task.completed);
  });
}

function createTaskElement(taskText, completed = false) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = taskText;

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '🗑️';

  deleteBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  span.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  if (completed) li.classList.add('completed');

  taskList.appendChild(li);
  saveTasks();
}

addTaskBtn.addEventListener('click', () => {
  const task = taskInput.value.trim();
  if (task !== '') {
    createTaskElement(task);
    taskInput.value = '';
  }
});

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTaskBtn.click();
  }
});

loadTasks();
