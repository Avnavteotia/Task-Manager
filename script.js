let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTask");

function renderTasks(filter = "all") {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        if (filter === "completed" && !task.completed) return;
        if (filter === "incomplete" && task.completed) return;

        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${task.title}</strong> - ${task.description} (Due: ${task.dueDate})
            <br>
            <button onclick="toggleComplete(${index})">${task.completed ? "Mark Incomplete" : "Mark Complete"}</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        if (task.completed) li.classList.add("completed");

        taskList.appendChild(li);

        checkReminder(task);
    });
}

addTaskBtn.addEventListener("click", () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("dueDate").value;

    if (title === "" || dueDate === "") {
        alert("Title and Due Date are required!");
        return;
    }

    tasks.push({ title, description, dueDate, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
});

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

document.getElementById("all").addEventListener("click", () => renderTasks("all"));
document.getElementById("completed").addEventListener("click", () => renderTasks("completed"));
document.getElementById("incomplete").addEventListener("click", () => renderTasks("incomplete"));

function checkReminder(task) {
    const today = new Date().toISOString().split("T")[0];
    const diff = new Date(task.dueDate) - new Date(today);

    if (diff <= 86400000 && diff > 0) {  // 1 day in ms
        alert(`Reminder: Task "${task.title}" is due soon!`);
    }
}

renderTasks();
function checkReminder(task) {
    const today = new Date();
    const dueDate = new Date(task.dueDate);

    const timeDiff = dueDate - today;
    const oneDay = 24 * 60 * 60 * 1000;

    if (timeDiff <= oneDay && timeDiff > 0 && !task.completed) {
        alert(`Reminder: Task "${task.title}" is due soon!`);
    }
}
