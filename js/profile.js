let profileName = document.getElementById('profileName');
let profileEmail = document.getElementById('profileEmail');
let profilePass = document.getElementById('profilePass');
let isLogin = JSON.parse(localStorage.getItem('isLoggedIn'))
let AllUsers = JSON.parse(localStorage.getItem('AllUserss'))
let homePage = document.getElementById('homePage')
if(isLogin == true){
    for (let i = 0; i < AllUsers.length; i++) {
        profileName.innerHTML = AllUsers[i].registerName;
        profileEmail.innerHTML = AllUsers[i].registerEmail;
        profilePass.innerHTML = AllUsers[i].registerPassword;

        
    }
}

homePage.onclick = function(){
    window.location.href = "index.html"
}