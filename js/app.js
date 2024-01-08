//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const editMode = "edit-mode";
const hideMode = "hidden";

const newTask = document.querySelector("#new-task");
const addButton = document.querySelector("#btn__new-task_add");
const todoTaskLst = document.querySelector(".lst__todo");
var completedTasksLst = document.querySelector(".lst__completed");

/**
 * Create new task list item
 * @param {string} taskString - Task name
 * @returns new task element
 */
const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");
  listItem.className = "lst__item";
  listItem.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="block__row">
        <input class="input__chk" type="checkbox">
        <label class="lbl__chk todo__text">${taskString}</label>
        <input class="input__text todo__text hidden" type="text">
        <button class="btn__str">Edit</button>
        <button class="btn__del">
        <img class="btn__del-img"
            src="./assets/icons/remove.svg"
            alt="Remove button image">
        </button>
    </div>
  `
  );
  return listItem;
};

/**
 * Add new task to TODO list
 * @returns new task item
 */
const addTask = function () {
  console.log("Add Task...");

  if (!newTask.value) return;
  const listItem = createNewTaskElement(newTask.value);
  todoTaskLst.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  newTask.value = "";
};

/**
 * Edit an existing task.
 */
const editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  const listItem = this.parentNode.parentNode;
  const editInput = listItem.querySelector(".input__text");
  const label = listItem.querySelector(".lbl__chk");
  const editBtn = listItem.querySelector(".btn__str");
  const isEditingTask = listItem.classList.contains(editMode);
  if (isEditingTask) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  listItem.classList.toggle(editMode);
  label.classList.toggle(hideMode);
  editInput.classList.toggle(hideMode);
};

/**
 * Delete task.
 */
const deleteTask = function () {
  console.log("Delete Task...");

  const listItem = this.parentNode.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

/**
 * Mark task completed
 */
const taskCompleted = function () {
  console.log("Complete Task...");

  const listItem = this.parentNode.parentNode;
  completedTasksLst.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

/**
 * Mark task as incomplete.
 * When the checkbox is unchecked
 * Append the task list item to the #incompleteTasks.
 */
const taskIncomplete = function () {
  console.log("Incomplete Task...");

  const listItem = this.parentNode.parentNode;
  todoTaskLst.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

/**
 * AJAX Request simulation
 */
var ajaxRequest = function () {
  console.log("AJAX Request");
};

//###############################################################################################
//#region LISTENERS

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

//#endregion LISTENERS

/**
 * Bind list item events
 * @param {*} taskListItem Task item
 * @param {*} checkBoxEventHandler
 */
const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");

  //select ListItems children
  const checkBox = taskListItem.querySelector(".input__chk");
  const editButton = taskListItem.querySelector(".btn__str");
  const deleteButton = taskListItem.querySelector(".btn__del");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

//cycle over todoTaskLst ul list items for each list item
for (let i = 0; i < todoTaskLst.children.length; i++) {
  bindTaskEvents(todoTaskLst.children[i], taskCompleted);
}

//cycle over completedTasksLst ul list items
for (let i = 0; i < completedTasksLst.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksLst.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
