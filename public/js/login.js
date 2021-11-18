function loginUser() {
     const loginBtn = document.getElementById('login-btn')
     loginBtn.addEventListener('click', function (e) {
          console.log('login-post')
          e.preventDefault()
          let emailVal = document.getElementById("email-input")
          let passVal = document.getElementById("password-input")
          let data = {}
          data.email = emailVal.value
          data.password = passVal.value
          console.log(data);
          const login = async () => {
               const res = await fetch('/', {
                         method: 'POST',
                         headers: {
                              'Content-Type': 'application/json',
                         },
                         body: JSON.stringify(data)
                    })
               console.log('ok')  
               if (res.ok) {
                    document.location.replace('/project')
               } else {
                    alert('login failed')
               }
          } 
          login();
     })
}
loginUser();

function launchModal() {
     let signUpBtn = document.getElementById("signUpBtn");  
     signUpBtn.addEventListener('click', () => {
          window.location.replace('/new_user')
     })
}
launchModal();

function closeModal() {
     let cancelBtn = document.getElementById("cancelBtn");
     let modal = document.getElementById("modal");
     cancelBtn.addEventListener('click', () => {
          modal.setAttribute("class", "modal");
     })
}
closeModal();

