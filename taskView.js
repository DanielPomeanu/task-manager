import { createOrUpdateTask, createTask, deleteTask, retrieveAllTasks, retrieveTask } from './taskController.js';

/*
==============================================================================
                                DECLARATIONS
==============================================================================
*/

// ==== MODALS ====
const existingTaskModal = document.getElementById("existingTaskModal");
const addOrUpdateTaskModal = document.getElementById('addOrUpdateTaskModal');

// ==== BUTTONS ====
const closeModalButton = document.querySelectorAll('.modal__close');
const openAddOrUpdateTaskModalButton = document.getElementById('addNewTaskButton');
const taskEditButton = existingTaskModal.querySelector(".modalFooter__edit");
const taskDeleteButton = existingTaskModal.querySelector(".modalFooter__delete");

// ==== HELPERS ====
let currentTask = null;

// ==== FORMS ====
const form = document.getElementById('newTaskForm');

/*
==============================================================================
                                EVENT HANDLERS
==============================================================================
*/

/**
 * Display modal to add a new task when the add new task button is pressed
 */
openAddOrUpdateTaskModalButton.addEventListener('click', () => {
    addOrUpdateTaskModal.style.display = 'block';
});

/**
 * Hide modal when the close modal button is pressed
 */
closeModalButton.forEach(el => {
    el.addEventListener('click', () => {
        const modal = el.closest('.modal');
        modal.style.display = 'none';
    });
});

/**
 * Handle submit of the data when a task is added or updated
 */
form.addEventListener('submit', (event) => {
    // prevent sending form data to the URL and triggering of a page reload
    event.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('title');
    const id = formData.get('id');
    const description = formData.get('description');
    const assignee = formData.get('assignee');
    const status = formData.get('status');

    // call the controller to perform an add or an update
    createOrUpdateTask(id, title, description, assignee, status);

    // hide the modal after submit
    addOrUpdateTaskModal.style.display = 'none';

    // clear the id in the hidden input value
    form.elements['id'].value = "";

    // clear the form to delete potential existing values in the form fields
    form.reset();

    // refresh the UI to show the most accurate state of the tasks
    displayAllTasks();
});

/**
 * Attach click event handler to the edit button inside the task details modal
 */
taskEditButton.addEventListener("click", function (event) {
    if (!currentTask) return;

    form.elements['id'].value = currentTask.id;
    form.elements['title'].value = currentTask.title;
    form.elements['description'].value = currentTask.description;
    form.elements['assignee'].value = currentTask.assignee;
    form.elements['status'].value = currentTask.status;

    existingTaskModal.style.display = 'none';
    addOrUpdateTaskModal.style.display = 'block';
});

/**
 * Attach click event handler to the delete button inside the task details modal
 */
taskDeleteButton.addEventListener("click", function (event) {
    if (!currentTask) return;

    deleteTask(currentTask.id);
    existingTaskModal.style.display = 'none';
    displayAllTasks();
});

/**
 * Display all tasks on page load
 */
document.addEventListener("DOMContentLoaded",function () {
    displayAllTasks();
})

/*
==============================================================================
                                FUNCTIONS
==============================================================================
*/

/**
 * Display all tasks in each corresponding column, based on their status.
 * Attach click event handler to each task, to display a modal with task details.
 */
function displayAllTasks() {
    const allTasks = retrieveAllTasks();

    document.querySelector(".pendingColumn__tasks").innerHTML = '';
    document.querySelector(".inProgressColumn__tasks").innerHTML = '';
    document.querySelector(".finishedColumn__tasks").innerHTML = '';

    if (allTasks.length) {
        allTasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add("task");
            taskDiv.id = task.id;

            const headingEl = document.createElement('h2');
            headingEl.textContent = task.title;
            headingEl.classList.add("task__title");

            const assigneeEl = document.createElement('p');
            assigneeEl.textContent = task.assignee;
            assigneeEl.classList.add("task__assignee");

            taskDiv.appendChild(headingEl);
            taskDiv.appendChild(assigneeEl);

            taskDiv.addEventListener("click", function () {
                currentTask = task;

                existingTaskModal.querySelector(".modal__title").innerHTML = task.title || "";
                existingTaskModal.querySelector(".modalContent__description").innerHTML = task.description || "";
                existingTaskModal.querySelector(".modalContent__assignee").innerHTML = "Assignee: " + (task.assignee || "");

                existingTaskModal.style.display = 'block';
            });

            switch (task.status) {
                case "pending":
                    taskDiv.classList.add("pendingColumnTasks__task");
                    document.querySelector(".pendingColumn__tasks").appendChild(taskDiv);
                    break;
                case "in-progress":
                    taskDiv.classList.add("inProgressColumnTasks__task");
                    document.querySelector(".inProgressColumn__tasks").appendChild(taskDiv);
                    break;
                case "completed":
                    taskDiv.classList.add("finishedColumnTasks__task");
                    document.querySelector(".finishedColumn__tasks").appendChild(taskDiv);
                    break;
            }
        });
    }
}
