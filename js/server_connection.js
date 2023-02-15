"use strict";

async function fetchRequest(URL, requestOptions){
    console.log(requestOptions);
    if(requestOptions === undefined){
        console.log("hej");
        const request = new Request(URL);
        const response = await fetch(request);
    
        return response;

    }else{

        const request = new Request(URL, requestOptions);
        const response = await fetch(request);

        return response;

    }
}