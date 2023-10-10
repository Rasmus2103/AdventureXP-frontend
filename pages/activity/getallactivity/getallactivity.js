
import { API_URL } from "../../../settings.js"
const URL = API_URL + "/activity"

import { makeOptions, handleHttpErrors, sanitizeStringWithTableRows} from "../../../utils.js"

export async function initGetAllActivity() {
    const activities = await fetch(URL).then(res => res.json())

    const tableRows = activities.map(activity => 
        `<tr>
            <td>${activity.id}</td>
            <td>${activity.name}</td>
            <td>${activity.pricePrHour}</td>
            <td>${activity.minAge}</td>
            <td>${activity.capacity}</td>
            <td>${activity.reservations.map(reservation => reservation.id).join(', ')}</td>
        </tr>`
    )
    const tableRowsAsStr = tableRows.join("")
    document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsAsStr);
}