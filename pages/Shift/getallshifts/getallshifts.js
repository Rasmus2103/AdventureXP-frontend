
import { API_URL,FETCH_NO_API_ERROR } from "../../../settings.js"
const URL = API_URL + "/shift"
//Add id to this URL to get a single user
import { makeOptions, handleHttpErrors, sanitizeStringWithTableRows} from "../../../utils.js"

export async function initGetAllShifts() {
   const shifts = await fetch(URL).then(res => res.json())

    const tableRows = shifts.map(shift => 
        `<tr>
            <td>${shift.id}</td>
            <td>${shift.employeeResponse.username}</td>
            <td>${shift.activityResponse.name}</td>
            <td>${shift.shiftStart}</td>
            <td>${shift.shiftEnd}</td>
        </tr>`
    )
    const tableRowsAsStr = tableRows.join("")
    document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsAsStr);
}