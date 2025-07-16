import { createOrUpdateTask, deleteTask, retrieveAllTasks } from "./taskController.js"
import { clearAllTasks, loadTasks } from "./taskModel.js"

export function runTaskManagerTests() {
    let passed = 0;
    let failed = 0;

    const log = {
        pass: (testName) => {
            console.log(`✅ ${testName}`);
            passed++;
        },
        fail: (testName, error) => {
            console.error(`❌ ${testName}`);
            console.error(`   → ${error}`);
            failed++;
        }
    };

    function test(testName, fn) {
        try {
            fn();
            log.pass(testName);
        } catch (error) {
            log.fail(testName, error.message);
        }
    }

    /*
    ==============================================================================
                                    TESTS
    ==============================================================================
    */
    const TASKS_KEY = "tasks";
    const backup = localStorage.getItem(TASKS_KEY); // backup real data

    test("should create a new task", () => {
        clearAllTasks();

        createOrUpdateTask("", "Task 1", "For Adobe interview :)", "Daniel", "in-progress");
        const tasks = loadTasks();
        if (tasks.length !== 1) throw new Error("Expected one stored task.");
        if (tasks[0].title !== "Task 1") throw new Error("Stored task has wrong or missing data.");
    });

    test("should update existing task with same id", () => {
        clearAllTasks();

        localStorage.setItem(TASKS_KEY, JSON.stringify([{
            id: "12345",
            title: "Task 1",
            description: "For Adobe interview :)",
            assignee: "Daniel",
            status: "pending"
        }]));

        createOrUpdateTask("12345", "Task 1", "For Adobe interview :)", "Daniel", "in-progress");
        const tasks = loadTasks();
        if (tasks.length !== 1) throw new Error("Should only have one task after update.");
        if (tasks[0].status !== "in-progress") throw new Error("Update operation didn't perform correctly.");
    });

    test("should retrieve all tasks correctly", () => {
        clearAllTasks();

        createOrUpdateTask("", "Task 1", "For Adobe interview :)", "Daniel", "in-progress");
        createOrUpdateTask("", "Task 2", "Also for Adobe interview :)", "Daniel", "completed");
        const all = retrieveAllTasks();
        if (all.length !== 2) throw new Error("Should retrieve 2 tasks.");
    });

    test("should delete a task by id", () => {
        clearAllTasks();

        createOrUpdateTask("12345", "Task 1", "For Adobe interview :)", "Daniel", "pending");
        deleteTask("12345");
        const tasks = retrieveAllTasks();
        if (tasks.find(t => t.id === "12345")) throw new Error("Delete operation didn't perform correctly.");
    });

    test("should not crash when deleting non-existent id", () => {
        clearAllTasks();
        deleteTask("12345");
        // no error should be thrown
    });
    /*
    ==============================================================================
    */

    // Restore the original localStorage data by putting back the backup, if the key existed; otherwise, remove the fake data
    if (backup) {
        localStorage.setItem(TASKS_KEY, backup);
    } else {
        localStorage.removeItem(TASKS_KEY);
    }

    // Show a summary of the test executions
    console.log(`\n--- ${passed} tests passed, ${failed} tests failed ---`);
}