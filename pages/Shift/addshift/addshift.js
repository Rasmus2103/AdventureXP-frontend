
import { API_URL,FETCH_NO_API_ERROR } from "../../../settings.js"
//Add id to this URL to get a single user
import { makeOptionsToken, handleHttpErrors} from "../../../utils.js"
const URL = `${API_URL}/shift`;

export async function initAddShift() {
   document.getElementById("btn-fetch-shift").addEventListener("click", findEmployeeAndActivity);
   document.getElementById("btn-submit-shift").addEventListener("click", addShift);   
   }

async function findEmployeeAndActivity() {
   document.getElementById("succes").innerText = " ";
   document.getElementById("error").innerText = " ";
    try {
        document.getElementById("error").innerText = "";
        const form = document.getElementById("addShiftForm");

        const idEmployee = document.getElementById("employee-id-input").value;
        const options = makeOptionsToken("GET", null, true);
        const responseEmployee = await fetch(`${API_URL}/employee/${idEmployee}`, options);
        if (!responseEmployee.ok) {
            throw new Error(`Error fetching employee with ID ${idEmployee}: ${responseEmployee.statusText}`);
        }
        const employee = await responseEmployee.json();
        form.username.value = employee.username;

        const idActivity = document.getElementById("activity-id-input").value;
        const responseActivity = await fetch(`${API_URL}/activity/${idActivity}`);
        if (!responseActivity.ok) {
         throw new Error(`Error fetching activity with ID ${idActivity}: ${responseActivity.statusText}`);
        }
        const activity = await responseActivity.json();
        form.activityId.value = activity.id;

    } catch (error) {
        console.error("Failed to fetch and populate the details:", error);
        document.getElementById("error").innerText = "employee/activity with that ID does not exist";
    }
}

async function addShift() {
   document.getElementById("succes").innerText = " ";
   document.getElementById("error").innerText = " ";
   const shift = {
      employeeUsername: document.getElementById("employee-id-input").value,
      activityId: document.getElementById("activity-id-input").value,
      shiftStart: document.getElementById("start-time").value,
      shiftEnd: document.getElementById("end-time").value,
  };


   const options = makeOptionsToken("POST", shift, true);
   fetch(URL, options)
   .then(handleHttpErrors)
    .then( 
      shiftResponse => document.getElementById("new-shift-response")
      .innerText = JSON.stringify(shiftResponse, null, 3)
      )
      .catch(err => document.getElementById("error").innerText = err) 
      document.getElementById("addShiftForm").reset();
}