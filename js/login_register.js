"use strict";

function toggleLoginRegisterMode(){

    const loginPageTitle = document.querySelector("#login_register > h1");
    const loginPageMessage = document.querySelector("#message");
    const loginPageButton = document.querySelector("#login_register > button");
    const loginPageToggler = document.querySelector("#toggler");

    if(loginPageTitle.textContent === "LOGIN"){
        document.querySelector("body").style.backgroundColor = "rgb(0, 197, 132)";

        loginPageTitle.textContent = "REGISTER";

        loginPageMessage.textContent = "Ready when you are...";
        loginPageMessage.removeAttribute("style");

        loginPageButton.textContent = "Register";
        loginPageButton.removeEventListener("click", logInToQuiz);
        loginPageButton.addEventListener("click", registerToQuiz);

        loginPageToggler.textContent = "Already have an account? Go to login";
    }else{
        if(loginPageTitle.textContent === "REGISTER"){
            document.querySelector("body").style.backgroundColor = "rgb(129, 239, 202)";

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
    tempModal.classList.add("contacting_server_modal");
    document.querySelector("body").append(tempModal);

    const tempDiv = document.createElement("div");
    tempDiv.classList.add("contacting_server_message");
    tempModal.append(tempDiv);
    tempDiv.textContent = "Contacting server...";


    const inputUsername = document.querySelector("#username > input");
    const inputPassword = document.querySelector("#password > input");

    const loginResponse = await fetchRequest(`https://teaching.maumt.se/apis/access/?action=check_credentials&user_name=${inputUsername.value}&password=${inputPassword.value}`)

    if(loginResponse.ok){
        console.log(loginResponse);
        console.log(await loginResponse.json());
        const message = "Sorry the site is under construction.";
        feedbackModalWithButton(tempModal, tempDiv, message)
    }else{
        if(loginResponse.status === 418){
            const message = "The server thinks it's not a teapot!"
            feedbackModalWithButton(tempModal, tempDiv, message)
        }else{
            tempModal.remove();

            document.querySelector("#message").style.backgroundColor = "white";
            document.querySelector("#message").textContent = "Wrong user name or password."
        }
    }

}

async function registerToQuiz(){

    const tempModal = document.createElement("div");
    tempModal.classList.add("contacting_server_modal");
    document.querySelector("body").append(tempModal);

    const tempDiv = document.createElement("div");
    tempDiv.classList.add("contacting_server_message");
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

    const registerResponse = await fetchRequest("https://teaching.maumt.se/apis/access/", options);

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

    const tempButton = document.createElement("button");

    buttonParent.innerHTML = message;

    buttonParent.append(tempButton);
    tempButton.textContent = "CLOSE";

    tempButton.addEventListener("click", () => {
        modal.remove();
    })

}