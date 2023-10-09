
import { API_URL,FETCH_NO_API_ERROR } from "../../../settings.js"
//Add id to this URL to get a single user
import { makeOptions, handleHttpErrors, sanitizeStringWithTableRows} from "../../../utils.js"

export async function initGetAllReservations() {
   document.getElementById("error").innerText = ""
  try {
    const HARDCODED_USER = "johnDoe123"
    const URL = API_URL + "/reservation" + HARDCODED_USER
    const reservations = await fetch(URL).then(handleHttpErrors)
    const rows = reservations.map(res =>  {
      console.log(res)
      console.log(res.carId)
      console.log(res.carb)
      return `
    <tr>
      <td>${res.id}</td>
      <td>${res.participants}</td>
      <td>${res.totalPrice}</td>
      <td>${res.reservationStart}</td>
      <td>${res.reservationEnd}</td>
    </tr>
   `}).join("\n")
    const safeRows = sanitizeStringWithTableRows(rows)
    document.getElementById("tablerows").innerHTML = safeRows
  } catch (err) {
    if (err.apiError) {
      document.getElementById("error").innerText = err.apiError.message
    } else {
      document.getElementById("error").innerText = err.message + FETCH_NO_API_ERROR
      console.error(err.message + FETCH_NO_API_ERROR)
    }
  }
    
}