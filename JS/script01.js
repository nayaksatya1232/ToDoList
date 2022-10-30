let taskform = document.getElementById('task-form');
taskform.addEventListener('submit', function (event) {
    event.preventDefault();
    let taskBox = document.getElementById('task');
    let task = taskBox.value.trim();
    if (task == '') {
        alert('Empty Task..');
    }
    else {
        let tasklist = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
        if (tasklist.includes(task)) {
            alert('The Task is already Present');
            taskBox.value='';
        }
        else {
            tasklist.unshift(task);
            localStorage.setItem('tasks', JSON.stringify(tasklist));
            display();
            taskBox.value='';
        }
    }
});
function display() {
    let tasklist = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    let listUl = document.getElementById('task-list');
    let output = ``;
    for (let item of tasklist) {
        output += `<li class="list-group-item list-group-item-secondary mt-3">${item}
        <button class="close"><i class="fa-solid fa-circle-xmark"></i></button>
    </li>`;
    }
    listUl.innerHTML = output;
}

display();


let taskListUl = document.getElementById('task-list');
taskListUl.addEventListener('click', function (event) {
    let targetElement = event.target;

    if (targetElement.classList.contains("fa-circle-xmark")) {
        let actualElement = targetElement.parentElement.parentElement;
        let selectedTask = actualElement.innerText;
        
        let taskList = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

        taskList = taskList.filter((task) => {
            return task !== selectedTask;
        });

        localStorage.setItem('tasks', JSON.stringify(taskList));
        display();
    }
});