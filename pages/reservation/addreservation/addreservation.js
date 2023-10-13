
import { API_URL,FETCH_NO_API_ERROR } from "../../../settings.js"
//Add id to this URL to get a single user
import { makeOptionsToken, handleHttpErrors} from "../../../utils.js"
const URL = `${API_URL}/reservation`;

export async function initAddReservation() {

    document.getElementById("btn-fetch-activity").addEventListener("click", findActivity);
    document.getElementById("btn-submit-reservation").addEventListener("click", addReservation);   
  
}

async function findActivity() {
  
      document.getElementById("succes").innerText = " ";
      document.getElementById("error").innerText = " ";
  
      try {
  
          const form = document.getElementById("addReservationForm");
  
          const idActivity = document.getElementById("activity-id-input").value;
          const options = makeOptionsToken("GET", null, true);
          const responseActivity = await fetch(`${API_URL}/activity/${idActivity}`, options);
          if (!responseActivity.ok) {
              throw new Error(`Error fetching activity with ID ${idActivity}: ${responseActivity.statusText}`);
          }
          const activity = await responseActivity.json();
          form.activityId.value = activity.id;
  
      } catch (error) {
          console.error("Failed to fetch and populate the details:", error);
          document.getElementById("error").innerText = "activity with that ID does not exist";
      }
}

async function addReservation() {

    document.getElementById("succes").innerText = " ";
    document.getElementById("error").innerText = " ";

    const reservation = {
        activityId: document.getElementById("activity-id-input").value,
        reservationStart: document.getElementById("start-time").value,
        reservationEnd: document.getElementById("end-time").value,
        participants: document.getElementById("Participants").value,
    };

    const options = makeOptionsToken("POST", reservation, true);
    fetch(URL, options)
    .then(handleHttpErrors)
     .then( 
       reservationResponse => document.getElementById("new-reservation-response")
       .innerText = JSON.stringify(reservationResponse, null, 3)
       )
       .catch(err => document.getElementById("error").innerText = err) 
       document.getElementById("addReservationForm").reset();

}
