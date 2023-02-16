"use strict";

function loadQuiz(username){

    document.querySelector("#wrapper").style.backgroundColor = "rgb(86, 170, 210)"

    document.querySelector("#login_register").classList.add("hidden");

    document.querySelector("#quiz").classList.remove("hidden")

    const loggedInHeaderAddition = document.querySelector("#logged_in_header");
    loggedInHeaderAddition.classList.remove("hidden");
    loggedInHeaderAddition.classList.add("not_hidden")
    loggedInHeaderAddition.querySelector("#user").textContent = username;

    newQuestion()
}

async function newQuestion(){

    document.querySelector("img").setAttribute("src", "./media/logo.png")
    document.querySelector("#answers").innerHTML = "";



    const randomNumbers = getRandomNumbers(4);

    let dogBreedObjects = [];
    for(let i = 0; i < randomNumbers.length; i++){
        dogBreedObjects.push(ALL_BREEDS[randomNumbers[i]])
    }

    const dogIndex = randomNumber(dogBreedObjects.length);
    const breedByDogIndex = dogBreedObjects[dogIndex].name;
    const urlByDogIndex = dogBreedObjects[dogIndex].url;

    const response = await fetchRequest(`https://dog.ceo/api/breed/${urlByDogIndex}/images/random`);
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

function getRandomNumbers(amount){
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