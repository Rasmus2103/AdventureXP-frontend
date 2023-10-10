import { API_URL } from "../../../settings.js"
import { makeOptions, handleHttpErrors} from "../../../utils.js"
const URL = `${API_URL}/activity`

export function initGetActivity() {
    document.getElementById("btn-find").addEventListener("click", findActivity);
}


async function findActivity() {
    document.getElementById("result").innerText = "";
    
    const idElem = document.getElementById("activity-id");
    if (idElem && 'value' in idElem) {
        const id = idElem.value;

        try {
            const activity = await fetch(URL + "/" + id)
            .then(res => {
                if(!res.ok) {
                    throw new Error("Activity not found");
                }
                return res.json();
            });
            document.getElementById("result").innerText = JSON.stringify(activity, null, 3);
        } catch(e) {
            document.getElementById("error").innerText = e.message;
        }
    } else {
        document.getElementById("error").innerText = "Input element not found.";
    }
}
