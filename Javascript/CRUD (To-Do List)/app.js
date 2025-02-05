const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const addTaskBtn = document.getElementById('add-task-btn');

// Function to create a new task element

function createTaskElement(taskText) {
  const li = document.createElement('li');
  li.className =
    'flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-md';

  const span = document.createElement('span');
  span.textContent = taskText;
  span.className = 'flex-grow text-gray-800';

  const editBtn = createButton(
    'Edit',
    'bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md mr-3',
    '✏️',
    () => enableEditing(li, span, editBtn, deleteBtn)
  );
  const deleteBtn = createButton(
    'Delete',
    'bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md',
    '🗑️',
    () => li.remove()
  );

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  return li;
}

// Add task

addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const taskElement = createTaskElement(taskText);
    taskList.appendChild(taskElement);
    taskInput.value = '';
  } else {
    alert('Please enter a task');
  }
});

// Enable editing for a task

function enableEditing(taskElement, span, editBtn, deleteBtn) {
  const input = document.createElement('input');
  input.type = 'text';
  input.value = span.textContent;
  input.className = 'flex-grow border border-gray-300 rounded-lg p-2 mr-3';

  const saveBtn = createButton(
    'Save',
    'bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md mr-3',
    '💾',
    () => saveTask(taskElement, input, saveBtn, deleteBtn)
  );

  taskElement.replaceChild(input, span);
  taskElement.replaceChild(saveBtn, editBtn);
}

// Save the edited task

function saveTask(taskElement, input, saveBtn, deleteBtn) {
  const newSpan = document.createElement('span');
  newSpan.textContent = input.value.trim() || 'Untitled Task';
  newSpan.className = 'flex-grow text-gray-800';

  const editBtn = createButton(
    'Edit',
    'bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md mr-3',
    '✏️',
    () => enableEditing(taskElement, newSpan, editBtn, deleteBtn)
  );

  taskElement.replaceChild(newSpan, input);
  taskElement.replaceChild(editBtn, saveBtn);
}

// Helper function to create buttons with icons

function createButton(text, classNames, icon, onClick) {
  const button = document.createElement('button');
  button.className = classNames + ' flex items-center';
  button.innerHTML = `${icon} <span class="ml-1">${text}</span>`;
  button.onclick = onClick;
  return button;
}
