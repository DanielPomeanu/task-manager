# 🗂️ Task Manager SPA

A responsive single-page application (SPA) for managing tasks, built using **HTML5**, **CSS3**, and **vanilla JavaScript (ES6)** — no frameworks, no build tools.

---

## 🚀 Features

- Create, edit, and delete tasks
- Task status management: **Pending**, **In-Progress**, **Completed**
- Persistent data using `localStorage`
- Fully responsive layout for mobile and desktop
- Modular and extensible architecture
- Automated test cases included

---

## 📁 Tech Stack

- HTML5
- CSS3
- JavaScript (ES6+)
- `localStorage` for persistence
- No external libraries or frameworks

---

## 💡 Architecture Overview
- /index.html         → Main HTML layout
- /styles.css         → All CSS styles
- /taskView.js        → Manages DOM creation and event handling
- /taskController.js  → Handles operation requests from the view, acts as a layer between the view and the model
- /taskModel.js       → Handles CRUD operations on the localStorage
- /tests.js           → Test runner for logic verification

---

## 🧪 Manual Test Cases

### Creating a task
1. Click the **"New Task"** button in the header
2. Fill in the form fields
3. Click **Save**
4. The task appears in the column corresponding to the selection made in the form

### Editing a task
1. Click on a task → modal opens
2. Click **Edit**
3. Modify any of the fields
4. Click **Save**
5. Latest changes are reflected and the updated task is shown on the screen

### Deleting a task
1. Click on a task → modal opens
2. Click **Delete**
3. Task disappears from the corresponding column and is removed from storage

### Updating task status
1. Click on a task → modal opens
2. Click **Edit**
3. Modify the status in the dropdown
4. Click **Save**
5. The task appears in the column corresponding to the selection made in the form

---

## 🧪 Automated Test Cases

The automated test cases are run at initialisation and check for the accurate creation, update, and deletion of tasks in `localStorage`.
The original `localStorage` is always persisted, despite running the tests on each page load.

---

## 📱 Responsive Behavior

A mobile-first approach has been used during the development.

- Below `768px`: the status sections are displayed in full-width, with all corresponding tasks being displayed in a vertical stacking
- Above `768px`: the status sections are displayed in a standard 3-column layout, with all corresponding tasks being displayed in a vertical stacking
- Optimized for iPhone and Android using `meta viewport`

---

## 🧩 Extensibility Ideas
- Add task due dates or priority labels
- Drag and drop to change task status
- Search/filter tasks
- Implement custom dropdown for a similar user-experience across different devices & browsers
- Implement sticky header of the task table
- Backend integration for persistence across devices

---

## 🧰 How to Run

Just open the app in your browser, at https://taskmanager.danielul.ro 🥳

---

## 👨‍💻 Author

Built with ❤️ by Daniel Pomeanu for the Adobe technical interview.

July 2025
