export function initializeTaskList() {
  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');
  
  let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  
  function renderTasks() {
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
      const taskItem = document.createElement('li');
      taskItem.className = 'task-item';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => {
        toggleTaskCompletion(index);
      });
      
      const taskText = document.createElement('span');
      taskText.textContent = task.text;
      if (task.completed) {
        taskText.classList.add('completed');
      }
      
      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '&times;';
      deleteBtn.className = 'delete-task-btn';
      deleteBtn.addEventListener('click', () => {
        deleteTask(index);
      });
      
      taskItem.appendChild(checkbox);
      taskItem.appendChild(taskText);
      taskItem.appendChild(deleteBtn);
      
      taskList.appendChild(taskItem);
    });
  }
  
  function addTask(text) {
    if (!text.trim()) return;
    
    tasks.push({
      text,
      completed: false,
      createdAt: new Date().toISOString()
    });
    
    saveTasks();
    renderTasks();
  }
  
  function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  }
  
  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
  
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  addTaskBtn.addEventListener('click', () => {
    addTask(taskInput.value);
    taskInput.value = '';
  });
  
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTask(taskInput.value);
      taskInput.value = '';
    }
  });
  
  renderTasks();
  
  return {
    addTask,
    toggleTaskCompletion,
    deleteTask,
    getTasks: () => tasks
  };
}
