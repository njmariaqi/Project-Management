
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
               const res = await fetch('/project/new', {
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
}
addNewProject();
function cancelAddNewProject() {
     let cancelAddProject = document.getElementById("cancelAddProject");
     cancelAddProject.addEventListener('click', () =>{
          let projectModal = document.getElementById("projectModal");
          projectModal.setAttribute("class", "modal");
     })
}
cancelAddNewProject();

function viewTask() {
     let cards = document.querySelectorAll(".projectCard");
     cards.forEach(e => {
          e.addEventListener('click', (e) => {
               const choose = e.target.matches('.deleteProject');
               if (!choose) {
               const projectNo = e.currentTarget.dataset.projectnum;
               document.location.replace(`/task/project/${projectNo}`) 
               }    
          })     
     })
     
}
viewTask();

function deleteProject() {
     let deleteProject = document.querySelectorAll(".deleteProject")
     deleteProject.forEach( e => {
          e.addEventListener('click', async(e) => {
               const no = e.target.dataset.projectnum;
               console.log(no);
               let data = {}
               data.no = no;
               const res = await fetch('/project', {
                    method: 'DELETE',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
               })
               if(res.ok) {
                    document.location.replace('/project')
               }
          })
     }) 
}
deleteProject();

function logout() {
     console.log('test1')
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