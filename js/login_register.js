"use strict";

function loadLoginPage(){

    window.localStorage.setItem("status", "notLoggedIn");

    document.querySelector("#wrapper").classList.remove("logged_in", "register_mode")
    document.querySelector("#wrapper").classList.add("login_mode");
    
    const quizDiv = document.querySelector("#quiz")
    quizDiv.innerHTML = "";
    quizDiv.classList.add("hidden")
    quizDiv.classList.remove("not_hidden")

    const loggedInHeaderAddition = document.querySelector("#logged_in_header");
    loggedInHeaderAddition.classList.add("hidden");
    loggedInHeaderAddition.classList.remove("not_hidden");
    loggedInHeaderAddition.innerHTML = "";

    const loginRegisterDiv = document.querySelector("#login_register");
    loginRegisterDiv.removeAttribute("class")
    loginRegisterDiv.innerHTML = `
    
    <h1>LOGIN</h1>
    <div id="inputs">
        <div id="username">
            <label for="UN">User Name:</label>
            <input type="text" name="UN">
        </div>

        <div id="password">
            <label for="PW">Password:</label>
            <input type="password" name="PW">
        </div>
    </div>
    <p id="message">Let the magic start!</p>
    <button id="login_register_button">Login</button>
    <p id="toggler">New to this? Register for free</p>

    `

    document.querySelector("#toggler").addEventListener("click", toggleLoginRegisterMode);
    document.querySelector("#login_register > button").addEventListener("click", logInToQuiz);
}

function toggleLoginRegisterMode(){

    const loginPageTitle = document.querySelector("#login_register > h1");
    const loginPageMessage = document.querySelector("#message");
    const loginPageButton = document.querySelector("#login_register > button");
    const loginPageToggler = document.querySelector("#toggler");

    if(loginPageTitle.textContent === "LOGIN"){
        document.querySelector("#wrapper").classList.remove("login_mode");
        document.querySelector("#wrapper").classList.add("register_mode");
        
        loginPageTitle.textContent = "REGISTER";

        loginPageMessage.textContent = "Ready when you are...";
        loginPageMessage.removeAttribute("style");

        loginPageButton.textContent = "Register";
        loginPageButton.removeEventListener("click", logInToQuiz);
        loginPageButton.addEventListener("click", registerToQuiz);

        loginPageToggler.textContent = "Already have an account? Go to login";
    }else{
        if(loginPageTitle.textContent === "REGISTER"){
            document.querySelector("#wrapper").classList.remove("register_mode");
            document.querySelector("#wrapper").classList.add("login_mode");
            
            loginPageTitle.textContent = "LOGIN";

            loginPageMessage.textContent = "Let the magic start!";
            loginPageMessage.removeAttribute("style");

            loginPageButton.textContent = "Login";
            loginPageButton.removeEventListener("click", registerToQuiz);
            loginPageButton.addEventListener("click", logInToQuiz);

            loginPageToggler.textContent = "New to this? Register for free";
        }
    }

}

async function logInToQuiz(){

    const tempModal = document.createElement("div");
    tempModal.classList.add("modal");
    document.querySelector("body").append(tempModal);

    const tempDiv = document.createElement("div");
    tempDiv.classList.add("modal_message");
    tempModal.append(tempDiv);
    tempDiv.textContent = "Contacting server...";


    const inputUsername = document.querySelector("#username > input");
    const inputPassword = document.querySelector("#password > input");
    const request = new Request(`https://teaching.maumt.se/apis/access/?action=check_credentials&user_name=${inputUsername.value}&password=${inputPassword.value}`);

    const loginResponse = await fetchRequest(request)

    if(loginResponse.ok){
        tempModal.remove();
        loadQuiz(inputUsername.value);
    }else{
        if(loginResponse.status === 418){
            const message = "The server thinks it's not a teapot!"
            feedbackModalWithButton(tempModal, tempDiv, message);
        }else{
            tempModal.remove();

            document.querySelector("#message").style.backgroundColor = "white";
            document.querySelector("#message").textContent = "Wrong user name or password.";
        }
    }

}

async function registerToQuiz(){

    const tempModal = document.createElement("div");
    tempModal.classList.add("modal");
    document.querySelector("body").append(tempModal);

    const tempDiv = document.createElement("div");
    tempDiv.classList.add("modal_message");
    tempModal.append(tempDiv);
    tempDiv.textContent = "Contacting server...";

    const inputUsername = document.querySelector("#username > input");
    const inputPassword = document.querySelector("#password > input");

    const postBody = {
        action: "register",
        user_name: inputUsername.value,
        password: inputPassword.value,
    }

    const options = {
        method: "POST",
        body: JSON.stringify(postBody),
        headers: {"Content-type": "application/json; charset=UTF-8"},
    }

    const postRequest = new Request("https://teaching.maumt.se/apis/access/", options)

    const registerResponse = await fetchRequest(postRequest);

    if(registerResponse.ok){
        const message = `Registration Complete.<br>Please proceed to login.`;
        feedbackModalWithButton(tempModal, tempDiv, message);
    }else{
        if(registerResponse.status === 418){
            const message = "The server thinks it's not a teapot!";
            feedbackModalWithButton(tempModal, tempDiv, message);
        }else{
            const message = "Sorry, that name is taken. Please try with another one.";
            feedbackModalWithButton(tempModal, tempDiv, message);
        }
    }

}

function feedbackModalWithButton(modal, buttonParent, message){

    const modalButton = document.createElement("button");

    buttonParent.innerHTML = message;

    buttonParent.append(modalButton);
    modalButton.textContent = "CLOSE";

    modalButton.addEventListener("click", () => modal.remove())

}