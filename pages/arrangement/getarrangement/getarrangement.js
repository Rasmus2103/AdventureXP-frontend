import { API_URL,FETCH_NO_API_ERROR } from "../../../settings.js"
import { makeOptions, handleHttpErrors} from "../../../utils.js"
const URL = `${API_URL}/arrangements`

export function initGetArrangement() {
    document.getElementById("btn-find").addEventListener("click", findArrangement)
}

async function findArrangement() {
    document.getElementById("result").innerText = "";
    
    const idElem = document.getElementById("arrangement-id");
    if (idElem && 'value' in idElem) {
        const id = idElem.value;

        try {
            const arrangement = await fetch(URL + "/" + id)
            .then(res => {
                if(!res.ok) {
                    throw new Error("Arrangement not found");
                }
                return res.json();
            });
            document.getElementById("result").innerText = JSON.stringify(arrangement, null, 3);
        } catch(e) {
            document.getElementById("error").innerText = e.message;
        }
    } else {
        document.getElementById("error").innerText = "Input element not found.";
    }
}