import { API_URL, FETCH_NO_API_ERROR } from "../../../settings.js";
import { makeOptionsToken, handleHttpErrors } from "../../../utils.js";
const URL = `${API_URL}/arrangements`;

export function initEditArrangement() {
    document.getElementById("btn-submit-edited-arrangement").addEventListener("click", editArrangement);
    document.getElementById("btn-fetch-arrangement").addEventListener("click", findArrangementToEdit);
    document.getElementById("btn-delete-arrangement").addEventListener("click", deleteArrangement);
}

async function editArrangement() {  
    const form = document.getElementById("editArrangementForm");
    const arrangement = {
        id: form.id.value,
        name: form.name.value,
        customerUsername: form.customerUsername.value,
        participants: parseInt(form.participants.value),
        reservationIds: form.reservationIds.value.split(",").map(id => parseInt(id)),
        arrangementStart: form.arrangementStart.value,
        arrangementEnd: form.arrangementEnd.value
    };
  
    const options = makeOptionsToken("PUT", arrangement, true);
  
    const updatedArrangement = await fetch(`${URL}/${arrangement.id}`, options).then(res => res.json());
  
    document.getElementById("edit-message").innerText = `Arrangement with ID: ${arrangement.id} has been edited`;
    document.getElementById("new-editResponse").innerText = JSON.stringify(updatedArrangement, null, 3);
}
  
async function findArrangementToEdit() {
    try {
        const id = document.getElementById("arrangement-id-input").value;
        const options = makeOptionsToken("GET", null, true);
        const response = await fetch(`${URL}/${id}`, options);
        
        if (!response.ok) {
            throw new Error(`Error fetching arrangement with ID ${id}: ${response.statusText}`);
        }

        const arrangement = await response.json();
        const form = document.getElementById("editArrangementForm");

    form.id.value = arrangement.id;
    form.name.value = arrangement.name;

    if (arrangement.customer && arrangement.customer.username) {
        form.customerUsername.value = arrangement.customer.username;
    } else {
        form.customerUsername.value = '';  // default value if not available
    }

    form.participants.value = arrangement.participants;

    // Check if 'arrangement.reservations' exists, is an array, and every element has 'id' property.
    if (arrangement.reservations 
        && Array.isArray(arrangement.reservations) 
        && arrangement.reservations.every(res => res && res.id !== undefined)) {
        // Map through each reservation to get the IDs and then join them into a string.
        const idsString = arrangement.reservations.map(res => res.id).join(", ");
        form.reservationIds.value = idsString;
    } else {
        form.reservationIds.value = "";  // or any default value you'd like
    }

    form.arrangementStart.value = arrangement.arrangementStart;
    form.arrangementEnd.value = arrangement.arrangementEnd;


    } catch (error) {
        console.error("Failed to fetch and populate the arrangement details:", error);
        document.getElementById("error").innerText = "Arrangement with that ID does not exist";
    }
}


async function deleteArrangement() {
    try {
        const form = document.getElementById("editArrangementForm");
        const id = form.id.value;
        const options = makeOptionsToken("DELETE", null, true);

        const deletedArrangement = await fetch(`${URL}/${id}`, options).then(res => res.json());
        
        document.getElementById("delete-message").innerText = `Arrangement with ID: ${id} has been deleted`;
        document.getElementById("new-deleteResponse").innerText = JSON.stringify(deletedArrangement);

    } catch(error) {
        console.error("Error with deleting the arrangement", error);
        document.getElementById("error").innerText = "Failed to delete the arrangement";
    }
}
