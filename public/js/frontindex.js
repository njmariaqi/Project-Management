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


if (window.location.pathname === '/project') {
     function launchModal() {
          let addNewProjectBtn = document.getElementById("addNewProjectBtn");
          let projectModal = document.getElementById("projectModal");
          addNewProjectBtn.addEventListener('click', () => {
               projectModal.setAttribute("class", "modal is-active");
          })
     }
     launchModal();
     function addNewProject() {
          let confirmAddProject = document.getElementById("confirmAddProject");
          let cancelAddProject = document.getElementById("cancelAddProject");
          confirmAddProject.addEventListener('click', () => {
               let newProjectName = document.getElementById("newProjectName");
               let newProjectDue = document.getElementById("newProjectDue");
               let newProjectMgr = document.getElementById("newProjectMgr");
               let data= {};
               data.name = newProjectName.value;
               data.due = newProjectDue.value;
               data.mgrName = newProjectMgr.value;
               console.log(data);
               const postData = async() => {
                    const res = await fetch('/project', {
                         method: 'POST',
                         headers: {
                              'Content-Type': 'application/json',
                         },
                         body: JSON.stringify(data)
                    })
                    if (res.ok) {
                         console.log('ok') 
                         let projectModal = document.getElementById("projectModal");
                         projectModal.setAttribute("class", "modal");
                         document.location.replace('/project')
                    }
               }
               postData();
          })        
          // let newProjectName = document.getElementById("newProjectName");
          // let newProjectDue = document.getElementById("newProjectDue");
          // let newProjectMgr = document.getElementById("newProjectMgr");
          // let data= {};
          // data.name = newProjectName.value;
          // data.due = newProjectDue.value;
          // data.mgrName = newProjectMgr.value;
          // console.log(newProjectName.value);
          // let confirmAddProject = document.getElementById("confirmAddProject");
          // let cancelAddProject = document.getElementById("cancelAddProject");
          // confirmAddProject.addEventListener('click', () => {
          //      const newProject = async () => {
          //           // if (!newProjectName || !newProjectDue || !newProjectMgr) {
          //           //      alert("please fill in the correct info")
          //           // } else {
          //                console.log('here!!!!')
          //                const res = await fetch('/', {
          //                     method: 'POST',
          //                     headers: {
          //                          'Content-Type': 'application/json',
          //                     },
          //                     body: JSON.stringify(data)
          //                })
          //           if (res.ok) {
          //                console.log('ok') 
          //                let projectModal = document.getElementById("projectModal");
          //                projectModal.setAttribute("class", "modal");
          //                document.location.replace('/project')
          //           }
          //      }
          //      newProject();
          // })
     }
     addNewProject();
}