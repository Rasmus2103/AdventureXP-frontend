
import { API_URL, FETCH_NO_API_ERROR } from "../../../settings.js";
import { makeOptions, makeOptionsToken, handleHttpErrors } from "../../../utils.js";
const URL = `${API_URL}/reservation`;

export function initEditReservation() {
    document.getElementById("btn-submit-edited-reservation").addEventListener("click", editReservation);
    document.getElementById("btn-fetch-reservation").addEventListener("click", findReservationToEdit);
    document.getElementById("btn-delete-reservation").addEventListener("click", deleteReservation);
}

async function editReservation() {  
    const form = document.getElementById("editCarForm");
    const reservation = {
        id: form.id.value,
        username: form.username.value,
        participants: parseInt(form.participants.value),
        activityId: parseInt(form['activity-id'].value),
        reservationStart: form['reservation-start'].value,
        reservationEnd: form['reservation-end'].value
    };
  
    const options = makeOptions("PUT", reservation);
  
    const updatedReservation = await fetch(`${URL}/${reservation.id}`, options).then(res => res.json());
  
    document.getElementById("edit-message").innerText = `Reservation with ID: ${reservation.id} has been edited`;
    document.getElementById("new-editResponse").innerText = JSON.stringify(updatedReservation, null, 3);
}
  
async function findReservationToEdit() {
    try {
        const id = document.getElementById("reservation-id-input").value;
        const response = await fetch(`${URL}/${id}`);
        
        if (!response.ok) {
            throw new Error(`Error fetching reservation with ID ${id}: ${response.statusText}`);
        }

        const reservation = await response.json();
        const form = document.getElementById("editReservationForm");
        
        form.id.value = reservation.id;
        form.username.value = reservation.customer.username;
        form.participants.value = reservation.participants;
        form['activity-id'].value = reservation.activity.id;
        form['reservation-start'].value = reservation.reservationStart;
        form['reservation-end'].value = reservation.reservationEnd;

        console.log(document.getElementById("reservation-start").value);
        console.log(document.getElementById("reservation-end").value);

    } catch (error) {
        console.error("Failed to fetch and populate the reservation details:", error);
        document.getElementById("error").innerText = "Reservation with that ID does not exist";
    }
}


async function deleteReservation() {
    try {
        const form = document.getElementById("editCarForm");
        const id = form.id.value;
        const options = makeOptions("DELETE");

        const deletedReservation = await fetch(`${URL}/${id}`, options).then(res => res.json());
        
        document.getElementById("delete-message").innerText = `Reservation with ID: ${id} has been deleted`;
        document.getElementById("new-deleteResponse").innerText = JSON.stringify(deletedReservation);

    } catch(error) {
        console.error("Error with deleting the reservation", error);
        document.getElementById("error").innerText = "Failed to delete the reservation";
    }
}
