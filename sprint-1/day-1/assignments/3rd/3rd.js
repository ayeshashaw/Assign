const process = require('process');
const fs = require('fs');

let tasks = [];
let taskCounter = 1;

function loadTasks() {
  try {
    const data = fs.readFileSync('data.json', 'utf-8');
    tasks = JSON.parse(data).tasks || [];
    taskCounter = tasks.length ? tasks[tasks.length - 1].id + 1 : 1; 
  } catch (error) {
    console.log("Error loading tasks from file:", error);
    tasks = [];
    taskCounter = 1; 
  }
}

function saveTasks() {
  const data = JSON.stringify({ tasks }, null, 2);
  fs.writeFileSync('data.json', data, 'utf-8');
}

function validateTask(title, dueDate) {
  if (!title || !dueDate) {
    return "Task title and due date cannot be empty.";
  }
  const dueDateRegex = /^\d{4}-\d{2}-\d{2}$/; 
  if (!dueDate.match(dueDateRegex)) {
    return "Please enter a valid due date in the format YYYY-MM-DD.";
  }
  return null;
}

function addTask(title, dueDate) {
  const validationError = validateTask(title, dueDate);
  if (validationError) {
    console.log(validationError);
    return;
  }
  const task = {
    id: taskCounter++,
    title,
    dueDate,
    status: "pending"
  };
  tasks.push(task);
  saveTasks();
  console.log(`Task "${title}" added successfully!`);
}

function listTasks() {
  if (tasks.length === 0) {
    console.log("No tasks available.");
    return;
  }
  console.log("\nTasks:");
  tasks.forEach(task => {
    console.log(`${task.id}. [${task.status}] ${task.title} - Due: ${task.dueDate}`);
  });
}

function completeTask(identifier) {
  const task = tasks.find(t => t.id === parseInt(identifier) || t.title.toLowerCase() === identifier.toLowerCase());
  if (task) {
    task.status = "completed";
    saveTasks();
    console.log(`Task "${task.title}" marked as completed.`);
  } else {
    console.log("Task not found.");
  }
}

function updateTask(identifier, title, dueDate) {
  const validationError = validateTask(title, dueDate);
  if (validationError) {
    console.log(validationError);
    return;
  }

  const task = tasks.find(t => t.id === parseInt(identifier) || t.title.toLowerCase() === identifier.toLowerCase());
  if (task) {
    task.title = title;
    task.dueDate = dueDate;
    saveTasks();
    console.log(`Task "${task.title}" updated successfully.`);
  } else {
    console.log("Task not found.");
  }
}

function deleteTask(identifier) {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(identifier) || t.title.toLowerCase() === identifier.toLowerCase());
  if (taskIndex !== -1) {
    const task = tasks.splice(taskIndex, 1)[0];
    saveTasks();
    console.log(`Task "${task.title}" deleted successfully.`);
  } else {
    console.log("Task not found.");
  }
}

function searchTask(identifier) {
  const task = tasks.find(t => t.id === parseInt(identifier) || t.title.toLowerCase() === identifier.toLowerCase());
  if (task) {
    console.log(`Task "${task.title}" found.`);
  } else {
    console.log("Task not found.");
  }
}

console.log("\nWelcome to Task Manager!");
console.log("Available commands:");
console.log("- add-task <title> <dueDate> : Add a new task");
console.log("- list-tasks : List all tasks");
console.log("- complete-task <id/title> : Mark a task as completed");
console.log("- update-task <id/title> <newTitle> <newDueDate> : Update task details");
console.log("- delete-task <id/title> : Delete a task");
console.log("- search-task <id/title> : Search for a task");
console.log("- exit : Quit the application\n");

loadTasks();

process.stdin.on('data', (input) => {
  const args = input.toString().trim().split(" ");
  const command = args[0];

  switch (command) {
    case 'add-task':
      addTask(args.slice(1, -1).join(" "), args[args.length - 1]);
      break;
    case 'list-tasks':
      listTasks();
      break;
    case 'complete-task':
      completeTask(args.slice(1).join(" "));
      break;
    case 'update-task':
      updateTask(args[1], args.slice(2, -1).join(" "), args[args.length - 1]);
      break;
    case 'delete-task':
      deleteTask(args.slice(1).join(" "));
      break;
    case 'search-task':
      searchTask(args.slice(1).join(" "));
      break;
    case 'exit':
      console.log("Exiting Task Manager...");
      process.exit();
      break;
    default:
      console.log("Invalid command. Try again.");
  }
});
