"use strict";

if(window.localStorage.getItem("status") === "notLoggedIn"){
    loadLoginPage();
}else{
    if(window.localStorage.getItem("status") === "loggedIn"){
        loadQuiz(window.localStorage.getItem("username"));
    }
}