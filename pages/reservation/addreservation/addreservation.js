
import { API_URL,FETCH_NO_API_ERROR } from "../../../settings.js"
//Add id to this URL to get a single user
import { makeOptionsToken, handleHttpErrors} from "../../../utils.js"

export async function initAddReservation() {

  // Assuming this needs to be a POST request
  const requestOptions = makeOptionsToken("POST", { name: document.getElementById("name").value, date: document.getElementById("date").value, time: document.getElementById("time").value }, true);
  
  fetch(API_URL+"reservations", requestOptions)
    .then(handleHttpErrors)
    .then((createdReservation)=> {
        // Handle the created reservation... Redirect, show message, etc.
        console.log(createdReservation)
    })
    .catch((error) => {
         // Handle error
         console.error(FETCH_NO_API_ERROR, error);
    });
}