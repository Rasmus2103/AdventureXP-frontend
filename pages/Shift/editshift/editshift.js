
import { API_URL, FETCH_NO_API_ERROR } from "../../../settings.js";
import { makeOptions, makeOptionsToken, handleHttpErrors } from "../../../utils.js";
const URL = `${API_URL}/shift`;

export function initEditShift() {
    document.getElementById("btn-submit-edited-shift").addEventListener("click", editShift);
    document.getElementById("btn-fetch-shift").addEventListener("click", findShiftToEdit);
    document.getElementById("btn-delete-shift").addEventListener("click", deleteShift);
}

async function editShift() {  
    const form = document.getElementById("editShiftForm");
    const shift = {
        id: form.id.value,
        employeeUsername: form.employeeUsername.value,
        activityId: parseInt(form['activity-id'].value),
        shiftStart: form['shift-start'].value,
        shiftEnd: form['shift-end'].value
    };
  
    const options = makeOptions("PUT", shift);
  
    const updatedShift = await fetch(`${URL}/${shift.id}`, options).then(res => res.json());
  
    document.getElementById("edit-message").innerText = `Shift with ID: ${shift.id} has been edited`;
    document.getElementById("new-editResponse").innerText = JSON.stringify(updatedShift, null, 3);
}
  
async function findShiftToEdit() {
    try {
        const id = document.getElementById("shift-id-input").value;
        const response = await fetch(`${URL}/${id}`);
        
        if (!response.ok) {
            throw new Error(`Error fetching shift with ID ${id}: ${response.statusText}`);
        }

        const shift = await response.json();
        const form = document.getElementById("editShiftForm");
        
        form.id.value = shift.id;
        form.employeeUsername.value = shift.employeeResponse.username;
        form['activity-id'].value = shift.activityResponse.id;
        form['shift-start'].value = shift.shiftStart;
        form['shift-end'].value = shift.shiftEnd;

        console.log(document.getElementById("shift-start").value);
        console.log(document.getElementById("shift-end").value);

    } catch (error) {
        console.error("Failed to fetch and populate the shift details:", error);
        document.getElementById("error").innerText = "Shift with that ID does not exist";
    }
}

async function deleteShift() {
    try {
        const form = document.getElementById("editShiftForm");
        const id = form.id.value;
        const options = makeOptions("DELETE");

        const deletedShift = await fetch(`${URL}/${id}`, options).then(res => res.json());
        
        document.getElementById("delete-message").innerText = `Shift with ID: ${id} has been deleted`;
        document.getElementById("new-deleteResponse").innerText = JSON.stringify(deletedShift);

    } catch(error) {
        console.error("Error with deleting the shift", error);
        document.getElementById("error").innerText = "Failed to delete the shift";
    }
}
