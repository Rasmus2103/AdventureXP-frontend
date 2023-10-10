import { API_URL, FETCH_NO_API_ERROR } from "../../../settings.js";
import { makeOptions, handleHttpErrors } from "../../../utils.js";
const URL = `${API_URL}/activity`;

export function initEditActivity() {
    document.getElementById("btn-submit-edited-activity").addEventListener("click", editActivity);
    document.getElementById("btn-fetch-activity").addEventListener("click", findActivityToEdit);
    document.getElementById("btn-delete-activity").addEventListener("click", deleteActivity);
}

async function editActivity() {  
    const form = document.getElementById("editActivityForm");
    const activity = {
        id: form.id.value,
        name: form.name.value,
        pricePrHour: parseFloat(form.pricePrHour.value),
        minAge: parseInt(form.minAge.value),
        capacity: parseInt(form.capacity.value)
    };
  
    const options = makeOptions("PUT", activity);
  
    const updatedActivity = await fetch(`${URL}/${activity.id}`, options).then(res => res.json());
  
    document.getElementById("edit-message").innerText = `Activity with ID: ${activity.id} has been edited`;
    document.getElementById("new-editResponse").innerText = JSON.stringify(updatedActivity, null, 3);
}
  
async function findActivityToEdit() {
    try {
        const id = document.getElementById("activity-id-input").value;
        const response = await fetch(`${URL}/${id}`);
        
        if (!response.ok) {
            throw new Error(`Error fetching activity with ID ${id}: ${response.statusText}`);
        }

        const activity = await response.json();
        const form = document.getElementById("editActivityForm");
        
        form.id.value = activity.id;
        form.name.value = activity.name;
        form.pricePrHour.value = activity.pricePrHour;
        form.minAge.value = activity.minAge;
        form.capacity.value = activity.capacity;

    } catch (error) {
        console.error("Failed to fetch and populate the activity details:", error);
        document.getElementById("error").innerText = "Activity with that ID does not exist";
    }
}

async function deleteActivity() {
    try {
        const form = document.getElementById("editActivityForm");
        const id = form.id.value;
        const options = makeOptions("DELETE");

        const deletedActivity = await fetch(`${URL}/${id}`, options).then(res => res.json());
        
        document.getElementById("delete-message").innerText = `Activity with ID: ${id} has been deleted`;
        document.getElementById("new-deleteResponse").innerText = JSON.stringify(deletedActivity);

    } catch(error) {
        console.error("Error with deleting the activity", error);
        document.getElementById("error").innerText = "Failed to delete the activity";
    }
}
