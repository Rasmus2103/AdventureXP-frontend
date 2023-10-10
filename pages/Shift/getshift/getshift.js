import { API_URL,FETCH_NO_API_ERROR } from "../../../settings.js"
import { makeOptions, handleHttpErrors} from "../../../utils.js"
const URL = `${API_URL}/shift`

export function initGetShift() {
   document.getElementById("btn-find").addEventListener("click", findShift)
}

async function findShift() {
   document.getElementById("result").innerText = "";
    
    const idElem = document.getElementById("shift-id");
    if (idElem && 'value' in idElem) {
        const id = idElem.value;

        try {
            const shift = await fetch(URL + "/" + id)
            .then(res => {
                if(!res.ok) {
                    throw new Error("Shift not found");
                }
                return res.json();
            });
            document.getElementById("result").innerText = JSON.stringify(shift, null, 3);
        } catch(e) {
            document.getElementById("error").innerText = e.message;
        }
    } else {
        document.getElementById("error").innerText = "Input element not found.";
    }
}