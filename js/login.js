
//signUp Form
let registerForm = document.getElementById('registerForm')
let registerName = document.getElementById('registerName')
let registerEmail = document.getElementById('registerEmail')
let registerPassword = document.getElementById('registerPassword')
let registerRepeatPassword = document.getElementById('registerRepeatPassword')
let signUp = document.getElementById('signUp')

let AllUsers;
if(localStorage.AllUserss != null){
  AllUsers = JSON.parse(localStorage.AllUserss)

}else{
     AllUsers = [];
}


  signUp.onclick = function(e){
    e.preventDefault();
   let userData = {
        registerName : registerName.value,
        registerEmail : registerEmail.value,
        registerPassword : registerPassword.value,
        registerRepeatPassword : registerRepeatPassword.value,
      }
      if(registerName.value && registerEmail.value && registerPassword.value && registerRepeatPassword.value != null){
        AllUsers.push(userData);
        alert('Welcome to Warehouse management WebSite website')
        window.location.href = 'login.html'
      }
      else
      {
        AllUsers;
        alert('make sure that all field filled correctly')
      }
      
      localStorage.setItem('AllUserss',JSON.stringify(AllUsers));
      
      
        


      }
      
  


//signIn Form

let loginForm = document.getElementById('loginForm');
let loginName = document.getElementById('loginName');
let loginPassword = document.getElementById('loginPassword');
let signIn = document.getElementById('signIn');


signIn.onclick = function(e){
  e.preventDefault();
  for (let i = 0; i < AllUsers.length; i++) {
    if(loginName.value == AllUsers[i].registerEmail && loginPassword.value == AllUsers[i].registerPassword){
      
      localStorage.setItem('isLoggedIn',true)
      window.location.href = 'index.html'
      
    }
    else
    {
      
      loginName.value = '';
      loginPassword.value = '';
      

    }
    
  }


}

let clearBtn = document.getElementById('clearBtn')

clearBtn.onclick = function(e){
  e.preventDefault();
  localStorage.clear()
}

