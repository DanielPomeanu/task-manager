import {loadTasks, loadTask, saveTasks, clearAllTasks} from "./taskModel.js"

/**
 * Creates a new task or update an existing one.
 * @param {string} id - The id of the new task
 * @param {string} title - The title of the new task
 * @param {string} description - The description of the new task
 * @param {string} assignee - The assignee of the new task
 * @param {string} status - The status of the new task
 * @returns {Object} The newly created task, the updated task or null.
 */
export function createOrUpdateTask(id, title, description, assignee, status) {
    if (id === "") {
        return createTask(title, description, assignee, status);
    } else {
        return updateTask(id, {
            title: title,
            description: description,
            assignee: assignee,
            status: status
        });
    }
}

/**
 * Create a new task and store it.
 * @param {string} title - The title of the new task
 * @param {string} description - The description of the new task
 * @param {string} assignee - The assignee of the new task
 * @param {string} status - The status of the new task
 * @returns {Object} The newly created task.
 */
export function createTask(title, description, assignee, status) {
    const tasks = loadTasks();
    const newTask = {
        id: Date.now().toString(),
        title: title,
        description: description,
        assignee: assignee,
        status: status
    };
    tasks.push(newTask);
    saveTasks(tasks);
    return newTask;
}

/**
 * Update a task's title or completion status.
 * @param {string} id - The ID of the task.
 * @param {Object} updatedTask - Object with fields to update: { title?, description?, assignee?, status? }.
 * @returns {Object|null} The updated task or null if not found.
 */
export function updateTask(id, updatedTask) {
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === id);
    if (!task) return null;

    if (updatedTask.title !== undefined) task.title = updatedTask.title;
    if (updatedTask.description !== undefined) task.description = updatedTask.description;
    if (updatedTask.assignee !== undefined) task.assignee = updatedTask.assignee;
    if (updatedTask.status !== undefined) task.status = updatedTask.status;

    saveTasks(tasks);
    return task;
}

/**
 * Delete a task by ID.
 * @param {string} id - The ID of the task.
 * @returns {boolean} True if a task was deleted, false otherwise.
 */
export function deleteTask(id) {
    const tasks = loadTasks();
    const filtered = tasks.filter(t => t.id !== id);

    if (filtered.length === tasks.length) return false;

    saveTasks(filtered);
    return true;
}

/**
 * Retrieves all tasks from the local storage via the model.
 * @returns {Object|[]} The list of tasks or an empty array, if no tasks are found.
 */
export function retrieveAllTasks() {
    return loadTasks();
}

export function retrieveTask(taskId) {
    return loadTask(taskId);
}