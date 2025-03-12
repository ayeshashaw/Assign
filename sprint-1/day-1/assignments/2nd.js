const process = require('process');

let tasks = [];
let taskCounter = 1;

function addTask(title, dueDate) {
  if (!title || !dueDate) {
    console.log("Task title and due date cannot be empty.");
    return;
  }
  const task = {
    id: taskCounter++,
    title,
    dueDate,
    status: "pending"
  };
  tasks.push(task);
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
    console.log(`Task "${task.title}" marked as completed.`);
  } else {
    console.log("Task not found.");
  }
}

function updateTask(identifier, title, dueDate) {
  const task = tasks.find(t => t.id === parseInt(identifier) || t.title.toLowerCase() === identifier.toLowerCase());
  if (task) {
    task.title = title;
    task.dueDate = dueDate;
    console.log(`Task "${task.title}" updated successfully.`);
  } else {
    console.log("Task not found.");
  }
}

function deleteTask(identifier) {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(identifier) || t.title.toLowerCase() === identifier.toLowerCase());
    if (taskIndex !== -1) {
        const task = tasks.splice(taskIndex, 1)[0];
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
console.log("- set-preference <showCompleted/showPending> <true/false> : Set display preferences");
console.log("- exit : Quit the application\n");

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
