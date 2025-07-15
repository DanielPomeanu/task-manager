import { createTask, retrieveAllTasks, retrieveTask } from './taskController.js';

const openNewTaskModalButton = document.getElementById('openModalButton');
const newTaskModal = document.getElementById('newTaskModal');
const closeModalButton = document.querySelectorAll('.modal__close');
const form = document.getElementById('newTaskForm');
const task = document.querySelector(".task");
const existingTaskModal = document.getElementById("existingTaskModal");

openNewTaskModalButton.addEventListener('click', () => {
    newTaskModal.style.display = 'block';
});

closeModalButton.forEach(el => {
    el.addEventListener('click', () => {
        const modal = el.closest('.modal');
        modal.style.display = 'none';
    });
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('title');
    const description = formData.get('description');
    const assignee = formData.get('assignee');
    const status = formData.get('status');

    // Direct call to storage logic
    createTask(title, description, assignee, status);

    newTaskModal.style.display = 'none';
    form.reset();

    displayAllTasks();
});

function displayAllTasks() {
    const allTasks = retrieveAllTasks();

    // always delete the displayed tasks before retrieving the latest version from the localStorage
    document.querySelector(".pendingColumn__tasks").innerHTML = '';
    document.querySelector(".inProgressColumn__tasks").innerHTML = '';
    document.querySelector(".finishedColumn__tasks").innerHTML = '';

    if (allTasks.length) {
        // create a new DOM element for each task and place it in the corresponding column, based on its status
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

            taskDiv.addEventListener("click", function (event) {
                existingTaskModal.querySelector(".modal__title").innerHTML = task.title || "";
                existingTaskModal.querySelector(".modalContent__description").innerHTML = task.description || "";
                existingTaskModal.querySelector(".modalContent__assignee").innerHTML = "Assignee: " + task.assignee || "";
                existingTaskModal.style.display = 'block';
            })

            switch (task.status) {
                case "pending" :
                    taskDiv.classList.add("pendingColumnTasks__task");
                    document.querySelector(".pendingColumn__tasks").appendChild(taskDiv);
                    break;
                case "in-progress" :
                    taskDiv.classList.add("inProgressColumnTasks__task");
                    document.querySelector(".inProgressColumn__tasks").appendChild(taskDiv);
                    break;
                case "finished" :
                    taskDiv.classList.add("finishedColumnTasks__task");
                    document.querySelector(".finishedColumn__tasks").appendChild(taskDiv);
                    break;
            }
        });
    }
}

document.addEventListener("DOMContentLoaded",function () {
    displayAllTasks();
})