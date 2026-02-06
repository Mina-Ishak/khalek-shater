
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
let schedule = JSON.parse(localStorage.getItem('mySchedule')) || [];

renderTasks();
renderSchedule();

function showPage(pageId) {

    document.querySelectorAll('.content').forEach(div => {
        div.style.display = 'none';
    });

    document.getElementById(pageId).style.display = 'block';
    

    document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
}


const taskInput = document.getElementById('taskInput');

function addTask() {
    if (taskInput.value.trim() !== "") {
        tasks.push(taskInput.value);
        saveTasks();
        renderTasks();
        taskInput.value = "";
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

function renderTasks() {
    const list = document.getElementById('taskList');
    if (!list) return;
    list.innerHTML = "";
    tasks.forEach((task, index) => {
        list.innerHTML += `
            <li>
                <span>${task}</span>
                <button class="delete-btn" onclick="deleteTask(${index})">حذف</button>
            </li>`;
    });
}


function addSchedule() {
    const subject = document.getElementById('subjectInput').value;
    const period = document.getElementById('periodInput').value;
    const day = document.getElementById('dayInput').value;

    if (subject && period) {
        const newClass = {
            id: Date.now(),
            subject: subject,
            period: parseInt(period),
            day: day
        };
        
        schedule.push(newClass);
        saveSchedule();
        renderSchedule();
        
  
        document.getElementById('subjectInput').value = "";
        document.getElementById('periodInput').value = "";
    }
}

function deleteClass(id) {
    schedule = schedule.filter(item => item.id !== id);
    saveSchedule();
    renderSchedule();
}

function saveSchedule() {
    localStorage.setItem('mySchedule', JSON.stringify(schedule));
}

function renderSchedule() {

    const days = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu'];
    days.forEach(day => {
        const col = document.getElementById(`${day}-col`);
        if (col) col.innerHTML = "";
    });

    schedule.sort((a, b) => a.period - b.period);

    
    schedule.forEach(item => {
        const column = document.getElementById(`${item.day}-col`);
        if (column) {
            column.innerHTML += `
                <div class="class-card">
                    <div>
                        <small>حصة ${item.period}</small><br>
                        <strong>${item.subject}</strong>
                    </div>
                    <button class="delete-btn" style="padding:2px 8px;" onclick="deleteClass(${item.id})">×</button>
                </div>`;
        }
    });
}


document.getElementById('addBtn')?.addEventListener('click', addTask);
document.getElementById('addSchedBtn')?.addEventListener('click', addSchedule);