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
        loginPageButton.textContent = "Register";
        loginPageToggler.textContent = "Already have an account? Go to login";
    }else{
        if(loginPageTitle.textContent === "REGISTER"){
            document.querySelector("body").style.backgroundColor = "rgb(129, 239, 202)";

            loginPageTitle.textContent = "LOGIN";
            loginPageMessage.textContent = "Let the magic start!";
            loginPageButton.textContent = "Login";
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
    console.log(loginResponse);
    if(loginResponse.ok){
    }else{
        if(loginResponse.status === 418){
            const tempButton = document.createElement("button");
            
        }
    }

}