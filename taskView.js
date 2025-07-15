import { createTask } from './taskController.js';

const openBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('newTaskModal');
const closeBtn = document.getElementById('closeModalBtn');
const form = document.getElementById('newTaskForm');

openBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// window.addEventListener('click', (event) => {
//     if (event.target !== modal) {
//         modal.style.display = 'none';
//     }
// });

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('title');
    const description = formData.get('description');
    const assignee = formData.get('assignee');
    const status = formData.get('status');

    // Direct call to storage logic
    createTask(title, description, assignee, status);

    modal.style.display = 'none';
    form.reset();
});