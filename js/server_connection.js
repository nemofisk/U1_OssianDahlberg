"use strict";

async function fetchRequest(URL){
    const request = new Request(URL);
    const response = await fetch(request);

    return response;
}