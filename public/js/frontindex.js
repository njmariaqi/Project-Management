if (window.location.pathname === '/new_user') {
     console.log('new user here')
     function createUser() {
          const createAccountBtn = document.getElementById('create-account-btn')
          createAccountBtn.addEventListener('click', (e) => {
               console.log('create account');
               e.preventDefault();
               let createEmailVal = document.getElementById("signup-email-input");
               let createPassVal = document.getElementById("signup-password-input");
               let data = {}
               data.email = createEmailVal.value;
               data.password = createPassVal.value;
               fetch('/new_user', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
               })
          })
     }
     createUser();
}



if (window.location.pathname === '/') {
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
}

