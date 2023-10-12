import { API_URL,FETCH_NO_API_ERROR } from "../../../settings.js"
//Add id to this URL to get a single user
import { makeOptionsToken, handleHttpErrors} from "../../../utils.js"
const URL = `${API_URL}/employee`;

export async function initEditEmployee() {
    document.getElementById("btn-submit-edited-employee").addEventListener("click", editEmployee);
    document.getElementById("btn-fetch-employee").addEventListener("click", findEmployeeToEdit);
    document.getElementById("btn-delete-employee").addEventListener("click", deleteEmployee);
}


async function editEmployee() {  
    const form = document.getElementById("editEmployeeForm");
    const employee = {
        username: form.username.value,
        email: form.Email.value,
        firstName: form.Firstname.value,
        lastName: form.Lastname.value,
        phoneNumber: form.Phonenumber.value,
        address: form.Address.value
    };
  
    const options = makeOptionsToken("PUT", employee);
  
    const updatedEmployee = await fetch(`${URL}/${employee.username}`, options).then(res => res.json());
  
    document.getElementById("edit-message").innerText = `Employee with ID: ${employee.username} has been edited`;
   
    form.reset();
}
  
async function findEmployeeToEdit() {
    try {
        document.getElementById("error").innerText = "";
        document.getElementById("delete-message").innerText = "";
        document.getElementById("edit-message").innerText = "";
        const id = document.getElementById("employee-id-input").value;
        const response = await fetch(`${URL}/${id}`);
        
        if (!response.ok) {
            throw new Error(`Error fetching employee with ID ${id}: ${response.statusText}`);
        }

        const employee = await response.json();
        const form = document.getElementById("editEmployeeForm");
        
        form.username.value = employee.username;
        form.Email.value = employee.email;
        form.Firstname.value = employee.firstName;
        form.Lastname.value = employee.lastName;
        form.Phonenumber.value = employee.phoneNumber;
        form.Address.value = employee.address;

    } catch (error) {
        console.error("Failed to fetch and populate the employee details:", error);
        document.getElementById("error").innerText = "employee with that ID does not exist";
    }
}


async function deleteEmployee() {
    
        const form = document.getElementById("editEmployeeForm");
        const id = form.username.value;
        const options = makeOptionsToken("DELETE");

        const deletedEmployee = await fetch(`${URL}/${id}`, options)
        .then(handleHttpErrors)
        .then(res => res.json())
        .catch(err => document.getElementById("error").innerText = err)
        
        document.getElementById("delete-message").innerText = `Employee with ID: ${id} has been deleted`;

        form.reset();
   
}
