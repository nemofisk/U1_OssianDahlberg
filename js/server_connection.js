"use strict";

async function fetchRequest(URL, request_options){
    console.log(request_options);
    if(request_options === undefined){

        const request = new Request(URL);
        const response = await fetch(request);
    
        return response;

    }else{

        const request = new Request(URL, request_options);
        const response = await fetch(request);

        return response;

    }
}