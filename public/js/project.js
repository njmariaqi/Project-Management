
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
                 const projectNo = e.currentTarget.dataset.projectnum;
                 document.location.replace(`/task/${projectNo}`)
            })
       })
       
  }
  viewTask();