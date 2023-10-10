import { API_URL,FETCH_NO_API_ERROR } from "../../../settings.js"
import { makeOptions, handleHttpErrors} from "../../../utils.js"
const URL = `${API_URL}/employee`

export function initGetEmployee() {
    document.getElementById("btn-find").addEventListener("click", findEmployee)
}

async function findEmployee() {
    document.getElementById("result").innerText = "";
    
    const idElem = document.getElementById("employee-username");
    if (idElem && 'value' in idElem) {
        const id = idElem.value;

        try {
            const employee = await fetch(URL + "/" + id)
            .then(res => {
                if(!res.ok) {
                    throw new Error("Employee not found");
                }
                return res.json();
            });
            document.getElementById("result").innerText = JSON.stringify(employee, null, 3);
        } catch(e) {
            document.getElementById("error").innerText = e.message;
        }
    } else {
        document.getElementById("error").innerText = "Input element not found.";
    }
}