import { API_URL} from "../../../settings.js"
import { makeOptionsToken, handleHttpErrors} from "../../../utils.js"

const URL = API_URL + "/members"

export function initSignup() {
    document.getElementById("new-member-response").innerText = "";
    document.getElementById("form").addEventListener("submit", singUp)
}


async function singUp(event) {
    event.preventDefault();
  var username = document.getElementById("input-username").value
  var email = document.getElementById("input-email").value
  var password = document.getElementById("input-password").value
  var firstName = document.getElementById("input-firstname").value
  var lastName = document.getElementById("input-lastname").value
  var street = document.getElementById("input-street").value
  var city = document.getElementById("input-city").value
  var zip = document.getElementById("input-zip").value

  const member = { username, email, password, firstName, lastName, street, city, zip }

  const options = makeOptionsToken("POST", member, true);
  fetch(URL, options)
  .then(handleHttpErrors)
  .then( 
    carResponse => document.getElementById("new-member-response")
    .innerText = JSON.stringify(carResponse, null, 3)).catch(err =>
        document.getElementById("new-member-response").innerHTML = err
    )

    document.getElementById("input-username").reset();
}