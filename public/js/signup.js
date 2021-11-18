function signUp() {
    let confirm = document.getElementById('confirm');
    confirm.addEventListener('click', async ()=>{
        let newUserName = document.getElementById('newUserName'),
        newEmail = document.getElementById('newEmail'),
        newPass = document.getElementById('newPass');
        let data = {};
        data.name = newUserName.value;
        data.email = newEmail.value;
        data.pass = newPass.value;
        const res = await fetch('/new_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        if (res.ok) {
            console.log('haha')
            window.location.replace('/')
        }
    })
}
signUp();

function closeModal() {
    let cancelBtn = document.getElementById("cancelBtn");
    cancelBtn.addEventListener('click', () => {
        window.location.replace('/')
    })
}
closeModal();