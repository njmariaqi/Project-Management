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