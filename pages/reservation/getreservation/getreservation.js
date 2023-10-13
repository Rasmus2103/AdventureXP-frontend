import { API_URL,FETCH_NO_API_ERROR } from "../../../settings.js"
import { makeOptionsToken, handleHttpErrors} from "../../../utils.js"
const URL = `${API_URL}/reservation`

export function initGetReservation() {
   document.getElementById("btn-find").addEventListener("click", findReservation)
}

async function findReservation() {
   document.getElementById("result").innerText = "";
    
    const idElem = document.getElementById("reservation-id");
    if (idElem && 'value' in idElem) {
        const id = idElem.value;

        try {
            const options = makeOptionsToken("GET", null, true);
            const reservation = await fetch(URL + "/" + id, options)
            .then(res => {
                if(!res.ok) {
                    throw new Error("Reservation not found");
                }
                return res.json();
            });
            document.getElementById("result").innerText = JSON.stringify(reservation, null, 3);
        } catch(e) {
            document.getElementById("error").innerText = e.message;
        }
    } else {
        document.getElementById("error").innerText = "Input element not found.";
    }
}