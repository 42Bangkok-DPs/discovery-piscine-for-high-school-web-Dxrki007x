document.addEventListener('DOMContentLoaded', () => {
    const ftList = document.getElementById('ft_list');
    const newTaskButton = document.getElementById('newTaskButton');

    // Load existing tasks from cookies
    loadTasks();

    // Add event listener for the New button
    newTaskButton.addEventListener('click', () => {
        const task = prompt("Enter a new task:");
        if (task && task.trim() !== "") {
            addTask(task);
            saveTasks();
        }
    });

    // Function to add a new task
    function addTask(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'todo-item';
        taskDiv.textContent = task;

        // Add click event to remove the task
        taskDiv.addEventListener('click', () => {
            if (confirm("Do you really want to remove this task?")) {
                ftList.removeChild(taskDiv);
                saveTasks();
            }
        });

        // Add new task at the top
        ftList.insertBefore(taskDiv, ftList.firstChild);
    }

    // Function to save tasks to a cookie
    function saveTasks() {
        const tasks = Array.from(ftList.children).map(task => task.textContent);
        document.cookie = `tasks=${JSON.stringify(tasks)}; path=/;`;
    }

    // Function to load tasks from a cookie
    function loadTasks() {
        const cookie = document.cookie.split('; ').find(row => row.startsWith('tasks='));
        if (cookie) {
            const tasks = JSON.parse(cookie.split('=')[1]);
            tasks.forEach(task => addTask(task));
        }
    }
});
