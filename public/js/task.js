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