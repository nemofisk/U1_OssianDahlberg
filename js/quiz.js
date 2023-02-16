"use strict";

function loadQuiz(username){

    const loginRegisterDiv = document.querySelector("#login_register");
    const quizDiv = document.querySelector("#quiz");

    document.querySelector("#wrapper").classList.remove("login_mode", "register_mode");
    document.querySelector("#wrapper").classList.add("logged_in");

    loginRegisterDiv.classList.add("hidden");
    loginRegisterDiv.innerHTML = "";

    quizDiv.innerHTML = `
    <img>
    <div id="answers"></div>
    `
    quizDiv.classList.remove("hidden")
    quizDiv.classList.add("not_hidden")

    const loggedInHeaderAddition = document.querySelector("#logged_in_header");
    loggedInHeaderAddition.innerHTML = `
    <div id="user"></div>
    <button id="logout_button">logout</button>
    `
    loggedInHeaderAddition.classList.remove("hidden");
    loggedInHeaderAddition.classList.add("not_hidden")
    loggedInHeaderAddition.querySelector("#user").textContent = username;

    document.querySelector("#logout_button").addEventListener("click", loadLoginPage);

    newQuestion()
}

async function newQuestion(){

    const generatingImageModal = document.createElement("div");
    document.querySelector("#wrapper").append(generatingImageModal);
    generatingImageModal.classList.add("modal");
    generatingImageModal.innerHTML = `
    <div class="modal_message">Getting a random image...</div>
    `

    document.querySelector("img").setAttribute("src", "./media/logo.png")
    document.querySelector("#answers").innerHTML = "";

    const randomNumbers = getArrayOfRandomNumbers(4);

    let dogBreedObjects = [];
    for(let i = 0; i < randomNumbers.length; i++){
        dogBreedObjects.push(ALL_BREEDS[randomNumbers[i]])
    }

    const dogIndex = randomNumber(dogBreedObjects.length);
    const breedByDogIndex = dogBreedObjects[dogIndex].name;
    const urlByDogIndex = dogBreedObjects[dogIndex].url;

    const response = await fetchRequest(`https://dog.ceo/api/breed/${urlByDogIndex}/images/random`);
    generatingImageModal.remove();
    const resource = await response.json();

    document.querySelector("img").setAttribute("src", resource.message)
    for(let dog of dogBreedObjects){
        const answerButton = document.createElement("button");
        document.querySelector("#answers").append(answerButton);
        answerButton.textContent = dog.name;
        if(answerButton.textContent === breedByDogIndex){
            answerButton.addEventListener("click", () => {
                quizFeedbackModal(true);
            });
        }else{
            answerButton.addEventListener("click", () => {
                quizFeedbackModal(false);
            });
        }
    }
}

function getArrayOfRandomNumbers(amount){
    let numbers = [];

    for(let i = 0; i < amount; i++){
        pushRandomNumber();
    }

    function pushRandomNumber(){
        const number = randomNumber(ALL_BREEDS.length);

        if(numbers.includes(number)){
            pushRandomNumber();
        }else{
            numbers.push(number);
        }
    }

    return numbers;
}

function randomNumber(max){
    return Math.floor(Math.random() * max);
}

function quizFeedbackModal(answer){
    const modal = document.createElement("div");
    modal.classList.add("modal");
    document.querySelector("#wrapper").append(modal);

    if(answer){
        modal.innerHTML = `
        <div class="modal_message">
            <div>CORRECT!</div>
            <button id="modalbutton">ONE MORE</button>
        </div>
        `
        modal.querySelector(".modal_message").style.backgroundColor = "lime";
    }else{
        modal.innerHTML = `
        <div class="modal_message">
            <div>I'm afraid not...:-(</div>
            <button id="modalbutton">ONE MORE</button>
        </div>
        `
        modal.querySelector(".modal_message").style.backgroundColor = "tomato";
    }

    document.querySelector("#modalbutton").addEventListener("click", () => {
        modal.remove();
        newQuestion();
    })
}