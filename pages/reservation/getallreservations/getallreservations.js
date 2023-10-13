
import { API_URL,FETCH_NO_API_ERROR } from "../../../settings.js"
const URL = API_URL + "/reservation"
import { makeOptionsToken, handleHttpErrors, sanitizeStringWithTableRows} from "../../../utils.js"

export async function initGetAllReservations() {
    const options = makeOptionsToken("GET", null, true);
  const reservations = await fetch(URL, options).then(res => res.json())

    const tableRows = reservations.map(reservation => 
        `<tr>
            <td>${reservation.id}</td>
            <td>${reservation.participants}</td>
            <td>${reservation.totalPrice}</td>
            <td>${reservation.reservationStart}</td>
            <td>${reservation.reservationEnd}</td>
        </tr>`
    )
    const tableRowsAsStr = tableRows.join("")
    document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsAsStr);
}