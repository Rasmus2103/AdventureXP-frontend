import {API_URL} from "../../settings.js"
import { makeOptions, handleHttpErrors, makeOptionsToken } from "../../utils.js"

const URL = API_URL + "/activity"
const URL_RESERVATION = API_URL + "/reservation";

export async function initHomePage() {

    const activitySelect = document.getElementById("activity-select");
    activitySelect.innerHTML = "";

    const activities = await fetch(URL).then(res => res.json());

    activities.forEach((activity) => {
        const option = document.createElement("option");
        option.value = activity.id;
        option.textContent = activity.name;

        activitySelect.appendChild(option);
    });
    const bookingButton = document.getElementById("booking-button");
    bookingButton.addEventListener("click", makeReservation);
}

async function makeReservation() {
    const roles = localStorage.getItem('roles').split(',');

    // Ensure it's a USER role making the reservation
    if (!roles.includes('USER')) {
        console.error("Only users can make a reservation.");
        return;
    }

    const activityId = document.getElementById("activity-select").value;
    let reservationStart = new Date(document.getElementById('booking-date-time-start').value);
    let duration = parseInt(document.getElementById('booking-range').value, 10);

    let reservationEnd = new Date(reservationStart);
    reservationEnd.setHours(reservationStart.getHours() + duration);

    // Convert the date objects to match backend's LocalDateTime format
    reservationStart = formatLocalDateTime(reservationStart);
    reservationEnd = formatLocalDateTime(reservationEnd);

    const numberOfPeople = document.getElementById("booking-people").value;

    if (!activityId || !reservationStart || !duration || !numberOfPeople) {
        console.error("All fields are required to make a reservation.");
        return;
    }

    const reservationData = {
        activityId,
        reservationStart,
        reservationEnd,
        numberOfPeople
    };

    const options = makeOptionsToken('POST', reservationData, true);

    try {
        const response = await fetch(URL_RESERVATION, options);
        if (!response.ok) throw new Error("Reservation failed");

        console.log("Reservation made successfully.");
    } catch (error) {
        console.error("Error making reservation:", error);
    }
}

function formatLocalDateTime(date) {
    return date.toISOString().slice(0, 16);
}



