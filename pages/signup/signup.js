import { API_URL} from "../../settings.js"
import { makeOptionsToken, makeOptions, handleHttpErrors} from "../../utils.js"

const URL = API_URL + "/customer"

export function initSignup() {
    document.getElementById("new-customer-response").innerText = "";
    document.getElementById("form").addEventListener("submit", singUp)
}


async function singUp(event) {
    event.preventDefault();
  var username = document.getElementById("input-username").value
  var password = document.getElementById("input-password").value
  var email = document.getElementById("input-email").value
  var firstName = document.getElementById("input-firstname").value
  var lastName = document.getElementById("input-lastname").value
  var phoneNumber = document.getElementById("input-phone").value
  var address = document.getElementById("input-address").value
  

  const customer = { username, password, email, firstName, lastName, phoneNumber, address }

  const options = makeOptionsToken("POST", customer);
  fetch(URL, options)
  .then(handleHttpErrors)
  .then( 
    carResponse => document.getElementById("new-customer-response")
    .innerText = JSON.stringify(carResponse, null, 3)).catch(err =>
        document.getElementById("new-customer-response").innerHTML = err
    )
    
}