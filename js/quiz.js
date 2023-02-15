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