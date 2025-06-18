const taskInput = document.getElementById("task-input");
const reminderInput = document.getElementById("reminder-time");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const taskSummary = document.getElementById("task-summary");
const clearBtn = document.getElementById("clear-all");
const themeToggle = document.getElementById("theme-toggle");
const sidebar = document.getElementById("sidebar");
const body = document.body;

// Request notification permission on load
if ("Notification" in window) {
  Notification.requestPermission();
}

// Toggle theme
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
});

// Add task
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const reminderTime = reminderInput.value;
  if (!taskText || !reminderTime) return;

  const reminderDate = new Date(reminderTime);
  const formattedReminder = reminderDate.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    hour12: true,
  });

  // Create Task in Main List
  const li = document.createElement("li");
  li.innerHTML = `<strong>${taskText}</strong><br/><small>Reminder set for: ${formattedReminder}</small>`;
  taskList.appendChild(li);

  // Show sidebar and animate summary
  sidebar.classList.add("visible");
  const summaryItem = document.createElement("li");
  summaryItem.textContent = `${taskText} - ${formattedReminder}`;
  taskSummary.appendChild(summaryItem);

  // Reminder Notification
  const delay = reminderDate.getTime() - Date.now();
  if (delay > 0) {
    setTimeout(() => {
      if (Notification.permission === "granted") {
        new Notification("⏰ Reminder", {
          body: `Task: ${taskText}`,
        });
      }
    }, delay);
  }

  taskInput.value = "";
  reminderInput.value = "";
});

// Clear All
clearBtn.addEventListener("click", () => {
  taskList.innerHTML = "";
  taskSummary.innerHTML = "";
  sidebar.classList.remove("visible");
});
// Move to time input when Enter is pressed in task input
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    reminderInput.focus();
  }
});

