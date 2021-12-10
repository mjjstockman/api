
const API_KEY = "xv-S2DWlLp0TVL5ED6ys-ksBXH4";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));


// on click, call the function getStatus, pass in e (which is the event 
// object).
// getStatus is not used here, but it's good practive to pass the event
// object (e), to the handler function
document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById("submit").addEventListener("click", e => postForm(e));

async function postForm(e) {
    // use JS interface FormData to get all form fields from #checksform
    //  and return as an object
    const form = new FormData(document.getElementById("checksform"));

    // use formData default method of entries() in a loop to check the the 
    // formData properties
    // for (let entry of form.entries()) {
    //     console.log(entry);
    // }


    // pass the form data object to fetch POST request
    // use await fetch because it returns a promise
    const response = await fetch(API_URL, {
                                method: "POST",
                                headers: {
                                    "Authorization": API_KEY,
        },
    // add the form object to the body of POST request
                                body: form
    });

    // now need to convert form data into json and display the data
    // response.json is a promise so need to use await
    const data = await response.json();

    // if response.ok is set to True...
    if (response.ok) {
        displayErrors(data);
    } else {
        // if not, throw an error with the error message
        throw new Error(data.error);
    }
}

function displayErrors(data) {

    let results = "";

    let heading = `JSHint Results for ${data.file}`;
    if (data.total_errors === 0) {
        results = `<div class="no_errors">No errors reported!</div>`;
    } else {
        results = `<div>Total Errors: <span class="error_count">${data.total_errors}</span></div>`;
        for (let error of data.error_list) {
            results += `<div>At line <span class="line">${error.line}</span>, `;
            results += `column <span class="column">${error.col}:</span></div>`;
            results += `<div class="error">${error.error}</div>`;
        }
    }

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
}

// qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq

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
        displayStatus(data);
    } else {
        throw new Error(data.error);
    }
}

function displayStatus(data) {

    let heading = "API Key Status";
    let results = `<div>Your key is valid until</div>`;
    results += `<div class="key-status">${data.expiry}</div>`;

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
}