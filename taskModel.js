const TASKS_KEY = "tasks";

/**
 * Load all tasks from localStorage.
 * @returns {Array} Array of task objects. If no tasks are saved, it returns an empty array.
 */
export function loadTasks() {
    const data = localStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
}

/**
 * Save all tasks to localStorage.
 * @param {Array} tasks - Array of task objects.
 */
export function saveTasks(tasks) {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

/**
 * Clear all tasks by removing the localStorage item.
 */
export function clearAllTasks() {
    localStorage.removeItem(TASKS_KEY);
}