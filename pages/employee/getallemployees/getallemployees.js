import { API_URL } from "../../../settings.js"
const URL = API_URL + "/employee"
import {sanitizeStringWithTableRows, handleHttpErrors} from "../../../utils.js"

export async function initAllEmployee() {
    const employees = await fetch(URL).then(res => res.json())

    const tableRows = employees.map(employee => 
        `<tr>
            <td>${employee.username}</td>
            <td>${employee.email}</td>
            <td>${employee.firstName}</td>
            <td>${employee.lastName}</td>
            <td>${employee.phoneNumber}</td>
            <td>${employee.address}</td>
        </tr>`
    )
    const tableRowsAsStr = tableRows.join("")
    document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsAsStr);
}