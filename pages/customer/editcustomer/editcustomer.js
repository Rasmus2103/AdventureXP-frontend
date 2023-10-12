import { API_URL,FETCH_NO_API_ERROR } from "../../../settings.js"
//Add id to this URL to get a single user
import { makeOptionsToken, handleHttpErrors} from "../../../utils.js"
const URL = `${API_URL}/customer`;

export async function initEditCustomer() {
    document.getElementById("btn-submit-edited-customer").addEventListener("click", editCustomer);
    document.getElementById("btn-fetch-customer").addEventListener("click", findCustomerToEdit);
    document.getElementById("btn-delete-customer").addEventListener("click", deleteCustomer);

}

async function editCustomer() {  
    const form = document.getElementById("editcustomerForm");
    const customer = {
        username: form.username.value,
        email: form.Email.value,
        firstName: form.Firstname.value,
        lastName: form.Lastname.value,
        phoneNumber: form.Phonenumber.value,
        address: form.Address.value
    };
  
    const options = makeOptionsToken("PUT", customer, true);
  
    const updatedCustomer = await fetch(`${URL}/${customer.username}`, options).then(handleHttpErrors);
  
    document.getElementById("edit-message").innerText = `customer with ID: ${customer.username} has been edited`;
   
    form.reset();
}
  
async function findCustomerToEdit() {
    try {
        document.getElementById("error").innerText = "";
        document.getElementById("delete-message").innerText = "";
        document.getElementById("edit-message").innerText = "";
        const id = document.getElementById("customer-id-input").value;
        const options = makeOptionsToken("GET", null, true);
        const response = await fetch(`${URL}/${id}`, options);
        
        if (!response.ok) {
            throw new Error(`Error fetching customer with ID ${id}: ${response.statusText}`);
        }

        const customer = await response.json();
        const form = document.getElementById("editcustomerForm");
        
        form.username.value = customer.username;
        form.Email.value = customer.email;
        form.Firstname.value = customer.firstName;
        form.Lastname.value = customer.lastName;
        form.Phonenumber.value = customer.phoneNumber;
        form.Address.value = customer.address;

    } catch (error) {
        console.error("Failed to fetch and populate the customer details:", error);
        document.getElementById("error").innerText = "customer with that ID does not exist";
    }
}


async function deleteCustomer() {
    
        const form = document.getElementById("editcustomerForm");
        const id = form.username.value;
        const options = makeOptionsToken("DELETE", null, true);

        const deletedCustomer = await fetch(`${URL}/${id}`, options)
        .then(handleHttpErrors)
        .then(res => res.json())
        .catch(err => document.getElementById("error").innerText = err)
        
        document.getElementById("delete-message").innerText = `Customer with ID: ${id} has been deleted`;

        form.reset();
   
}