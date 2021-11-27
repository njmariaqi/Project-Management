function launchModal() {
    let addTaskBtn = document.getElementById("addTaskBtn");
    let taskModal = document.getElementById("taskModal");
    addTaskBtn.addEventListener('click', () => {
        taskModal.setAttribute("class", "modal is-active");
    })
}
launchModal();

function closeModal() {
    let cancelAddTask = document.getElementById("cancelAddTask");
    let taskModal = document.getElementById("taskModal");
    cancelAddTask.addEventListener('click', () => {
        taskModal.setAttribute("class", "modal");
    })
}
closeModal();

function addTask() {
    let url = window.location.pathname;
    let confirmBtn = document.getElementById('confirmAddTask'),
        newTaskName = document.getElementById('newTaskName'), 
        newTaskComment = document.getElementById('newTaskComment'),
        newTaskDue = document.getElementById('newTaskDue'),
        newTaskStatus = document.getElementById('newTaskStatus'),
        newTaskAssignee = document.getElementById('newTaskAssignee');
    confirmBtn.addEventListener('click', async() => {
        let data = {};
        data.name = newTaskName.value;
        data.comment = newTaskComment.value;
        data.due = newTaskDue.value;
        data.status = newTaskStatus.value;
        data.user = newTaskAssignee.value;
        const res = await fetch(url, {
            method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
        })
        if (res.ok) {
            console.log('can you see me?')
            closeModal();
            window.location.replace(url);
        }
    })
}

addTask();

function logout() {
    let logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', async () => {
        console.log('logout');
        const res = await fetch('/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
        if (res.ok) {
            window.location.replace('/');
        } else {
            alert('Failed to log out.');
        }
    })
}

logout();

function changeStatus() {
    console.log('select')
    let statusBtn = document.querySelectorAll('.statusBtn');
    console.log(statusBtn)
    statusBtn.forEach((e)=>{
        e.addEventListener('change', async ()=> {
            console.log('id', `/task/status/${e.dataset.id}`)
            const data = {};
            data.status = e.value;
            data.id = e.dataset.id
            const res = await fetch(`/task/status/${e.dataset.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                console.log("ok")
            } else {
                alert('Failed to update.');
            }
        })
    })    
}
changeStatus();

