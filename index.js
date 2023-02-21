"use strict";

if(window.localStorage.getItem("status") === "notLoggedIn"){
    loadLoginPage();
}else{
    loadQuiz(window.localStorage.getItem("username"));
}


