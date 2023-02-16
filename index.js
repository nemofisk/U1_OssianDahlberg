"use strict";

loadLoginPage();

document.querySelector("#toggler").addEventListener("click", toggleLoginRegisterMode);

document.querySelector("#login_register > button").addEventListener("click", logInToQuiz);