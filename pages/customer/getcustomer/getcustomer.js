import { API_URL,FETCH_NO_API_ERROR } from "../../../settings.js"
import { makeOptionsToken, handleHttpErrors} from "../../../utils.js"
const URL = `${API_URL}/customer`

export function initGetCustomer() {
    document.getElementById("btn-find").addEventListener("click", findCustomer)
}

async function findCustomer() {
    document.getElementById("result").innerText = "";
    
    const idElem = document.getElementById("customer-username");
    if (idElem && 'value' in idElem) {
        const id = idElem.value;

        try {
            const options = makeOptionsToken("GET", null, true);
            const customer = await fetch(URL + "/" + id, options)
            .then(res => {
                if(!res.ok) {
                    throw new Error("Customer not found");
                }
                return res.json();
            });
            document.getElementById("result").innerText = JSON.stringify(customer, null, 3);
        } catch(e) {
            document.getElementById("error").innerText = e.message;
        }
    } else {
        document.getElementById("error").innerText = "Input element not found.";
    }
}