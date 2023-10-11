import {API_URL} from "../../settings.js"

const URL = API_URL + "/activity"

export async function initHomePage() {

    const activitySelect = document.getElementById("activity-select");
    activitySelect.innerHTML = "";

    const activities = await fetch(URL).then(res => res.json());

    activities.forEach((activity) => {
        const option = document.createElement("option");
        option.value = activity.id;
        option.textContent = activity.name;

        activitySelect.appendChild(option);
    });
}

