
const btn = document.getElementById('bar-btn').addEventListener('click', () =>{
  let a = document.getElementById('manager-box');
  a.classList.toggle('show')
});


const btn_manager = document.getElementById('manager-box').addEventListener('click', () =>{
  let b = document.getElementById('user-list');
  b.classList.toggle('show')
});

const parent = document.getElementById('drop-list');
domo.get("/domo/users/v1?includeDetails=true&limit=200").then(function(data){
  //username and id 
  data.forEach(element => {
    const username = document.createElement('option')
    username.value = element.id;
    username.textContent = element.displayName;
    parent.appendChild(username)
  });
  //console.log(domo.env)
  console.log(data)

  data.forEach(temp => {
    if(temp.id == domo.env.userId) {
      document.getElementById('navbar-name').textContent = "Welcome " + temp.displayName;
    }
    //console.log(temp.displayName);
  });
})


  const sendEmail = document.getElementById("sendEmail")
  sendEmail.addEventListener('click', ()=>{
  const selectedUsers = [...parent.selectedOptions].map(each_user_id => each_user_id.value);
  console.log(selectedUsers);
  const startWorkflow = (alias, body) => {
    domo.post(`/domo/workflow/v1/models/${alias}/start`, body)
    //console.log("insideflow")
  }
  selectedUsers.forEach(each_id => {
  startWorkflow("send_email", { to: each_id, sub:"DOMO", body:"Hey Welcome to GWC!!"});
  const notification = document.getElementById('notification');
  notification.classList.add('show');

  // Hide notification after 3 seconds
  setTimeout(function() {
      notification.classList.remove('show');
  }, 3000); 


})
});