
const API_KEY = "xv-S2DWlLp0TVL5ED6ys-ksBXH4";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));


// on click, call the git function getStatus, pass in e (which is the event 
// object).
// getStatus is not used here, but it's good practive to pass the event
// object (e), to the handler function
document.getElementById("status").addEventListener("click", e => getStatus(e));


// need to make a GET request to API URL with API Key
// use async function to handle the promise, instead of chaining .then()'s...
async function getStatus(e) {
    // JS template literals to create quesryString with URL and Keys
    const queryString = `${API_URL}?api_key=${API_KEY}`;
    // ... then await for promise to come true
    const response = await fetch(queryString);
    // json() method also returns a promise so need to await for that as well..
    const data = await response.json();

    // once promises have been fullfilled check if the response is ok, ie, 
    // 200 http status code
    if (response.ok) {
        console.log(data.expiry);
    }
}

