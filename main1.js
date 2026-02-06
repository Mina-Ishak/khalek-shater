let fullTasks = JSON.parse(localStorage.getItem('myFullTasks')) || [];

function addFullTask() {
    const input = document.getElementById('fullTaskInput');
    const day = document.getElementById('fullTaskDay').value;
    if (input.value.trim() !== "") {
        fullTasks.push({ id: Date.now(), text: input.value, day: day });
        localStorage.setItem('myFullTasks', JSON.stringify(fullTasks));
        renderFullTasks();
        input.value = "";
    }
}

function renderFullTasks() {
    const days = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'];
    days.forEach(day => {
        const col = document.getElementById(`${day}-tasks`);
        if (col) col.innerHTML = "";
    });

    fullTasks.forEach(task => {
        const column = document.getElementById(`${task.day}-tasks`);
        if (column) {
            column.innerHTML += `
                <div class="class-card">
                    <span>${task.text}</span>
                    <button class="delete-btn" onclick="deleteFullTask(${task.id})">×</button>
                </div>`;
        }
    });
}

function deleteFullTask(id) {
    fullTasks = fullTasks.filter(t => t.id !== id);
    localStorage.setItem('myFullTasks', JSON.stringify(fullTasks));
    renderFullTasks();
}

renderFullTasks();