"use strict";

if(window.localStorage.getItem("status") === "loggedIn"){
    loadQuiz(window.localStorage.getItem("username"));
}else{
    loadLoginPage();
}