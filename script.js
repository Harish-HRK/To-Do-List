// constants declared for input button and task list area
const taskInput = document.querySelector("#newtask input");
const taskSection = document.querySelector(".tasks");
const addBtn = document.querySelector("#push");

// Load tasks from localStorage when page opens
window.onload = loadTasks;

// listener for the enter key
taskInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    createTask();
  }
});

// onclick event for the 'Add' button
addBtn.onclick = function () {
  createTask();
};

// function that creates a task
function createTask() {
  if (taskInput.value.trim().length === 0) {
    alert("The task field is blank. Enter a task name and try again.");
  } else {
    addTask(taskInput.value, false); // add unchecked task
    saveTasks(); // update localStorage
    taskInput.value = ""; // clear input
  }
}

// function to insert HTML for a task
function addTask(text, completed) {
  let taskHTML = `
    <div class="task">
      <label class="taskname">
        <input onclick="updateTask(this)" type="checkbox" class="check-task" ${
          completed ? "checked" : ""
        }>
        <p class="${completed ? "checked" : ""}">${text}</p>
      </label>
      <div class="delete"><i class="uil uil-trash"></i></div>
    </div>`;

  taskSection.innerHTML += taskHTML;

  // delete functionality
  let current_tasks = document.querySelectorAll(".delete");
  current_tasks.forEach((btn) => {
    btn.onclick = function () {
      this.parentNode.remove();
      saveTasks(); // update after delete
    };
  });
}

// update task (checkbox → line-through)
function updateTask(task) {
  let taskItem = task.nextElementSibling; // <p>
  if (task.checked) {
    taskItem.classList.add("checked");
  } else {
    taskItem.classList.remove("checked");
  }
  saveTasks(); // update localStorage
}

// save tasks to localStorage
function saveTasks() {
  let tasks = [];
  document.querySelectorAll(".task").forEach((task) => {
    let text = task.querySelector("p").innerText;
    let completed = task.querySelector("input").checked;
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// load tasks from localStorage
function loadTasks() {
  let storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    JSON.parse(storedTasks).forEach((task) =>
      addTask(task.text, task.completed)
    );
  }
}
