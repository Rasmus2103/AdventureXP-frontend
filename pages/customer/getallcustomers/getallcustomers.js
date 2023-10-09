import { API_URL } from "../../../settings.js"
const URL = API_URL + "/customer"
import {sanitizeStringWithTableRows, handleHttpErrors} from "../../../utils.js"

export async function initCustomers() {
    const customers = await fetch(URL).then(res => res.json())

    const tableRows = customers.map(customer => 
        `<tr>
            <td>${customer.username}</td>
            <td>${customer.email}</td>
            <td>${customer.firstName}</td>
            <td>${customer.lastName}</td>
            <td>${customer.phoneNumber}</td>
            <td>${customer.address}</td>
            <td>${customer.credit}</td>
        </tr>`
    )
    const tableRowsAsStr = tableRows.join("")
    document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsAsStr);
}