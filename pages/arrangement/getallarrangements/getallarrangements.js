
import { API_URL,FETCH_NO_API_ERROR } from "../../../settings.js"
const URL = API_URL + "/arrangements"
//Add id to this URL to get a single user
import { makeOptions, handleHttpErrors, sanitizeStringWithTableRows} from "../../../utils.js"

export async function initGetAllArrangements() {
    const arrangements = await fetch(URL).then(res => res.json())

    const tableRows = arrangements.map(arrangement => 
        `<tr>
            <td>${arrangement.id}</td>
            <td>${arrangement.customer}</td>
            <td>${arrangement.participants}</td>
            <td>${arrangement.reservations}</td>
            <td>${arrangement.name}</td>
            <td>${arrangement.aggregatePrice}</td>
            <td>${arrangement.arrangementStart}</td>
            <td>${arrangement.arrangementEnd}</td>
        </tr>`
    )
    const tableRowsAsStr = tableRows.join("")
    document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsAsStr);
}