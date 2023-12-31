import { API_URL, FETCH_NO_API_ERROR } from "../../settings.js"
import { makeOptions, handleHttpErrors, makeOptionsToken } from "../../utils.js"
const URLCustomer = `${API_URL}/customer/profile`
const URLEmployee = `${API_URL}/employee/profile`
const URLAddcredits = `${API_URL}/customer/addcredit`

export async function initProfile() {

    const options = makeOptionsToken('GET', null, true);
    const roles = localStorage.getItem('roles').split(',');
    document.getElementById('add-credit-btn').addEventListener("click", addCredit)

    if (roles.includes('ADMIN') || roles.includes('EMPLOYEE')) {
        try {
            const responseEmployee = await fetch(URLEmployee, options);
            if (!responseEmployee.ok) throw new Error("Employee Profile fetch failed");
            const employeeData = await responseEmployee.json();
            populateAdminProfile(employeeData);
            populateEmployeeProfile(employeeData);

            if (roles.includes('ADMIN')) {
                displaySection('admin-section');
            } else if (roles.includes('EMPLOYEE')) {
                displaySection('employee-section');
            }

        } catch (error) {
            console.error("Error fetching employee profile:", error);
        }
    }

    if (roles.includes('USER')) {
        try {
            const responseCustomer = await fetch(URLCustomer, options);
            if (!responseCustomer.ok) throw new Error("User Profile fetch failed");
            const customerData = await responseCustomer.json();
            populateUserProfile(customerData);
            displaySection('user-section');
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    }
}

async function addCredit() {
    const username = document.getElementById('user-profile-username').textContent;
    const value = document.getElementById('credit-input').value;

    if (!value) {
        document.getElementById("credit-message").innerText = 'Please enter a value to add as credit.';
        return;
    }

    const options = makeOptionsToken('PATCH', null, true);

    try {
        const response = await fetch(`${URLAddcredits}/${username}/${value}`, options)
        if(!response.ok) throw new Error("Failed to add credit")

        const updatedProfile = await response.json()

        document.getElementById('user-profile-credit').textContent = updatedProfile.credit
        document.getElementById("credit-message").innerText = 'Credits added succesfully';
        console.log("Set credit to: ", document.getElementById('user-profile-credit').textContent);
    } catch (error) {
        console.error("Error adding credit:", error);
        document.getElementById("credit-message").innerText = 'Error adding credit. Please try again.';
    }
}


function populateAdminProfile(data) {
    document.getElementById('admin-profile-username').textContent = data.username;
    document.getElementById('admin-profile-email').textContent = data.email;
    document.getElementById('admin-profile-firstName').textContent = data.firstName;
    document.getElementById('admin-profile-lastName').textContent = data.lastName;
    document.getElementById('admin-profile-phoneNumber').textContent = data.phoneNumber;
    document.getElementById('admin-profile-address').textContent = data.address;
}

function populateUserProfile(data) {
    document.getElementById('user-profile-username').textContent = data.username;
    document.getElementById('user-profile-email').textContent = data.email;
    document.getElementById('user-profile-firstName').textContent = data.firstName;
    document.getElementById('user-profile-lastName').textContent = data.lastName;
    document.getElementById('user-profile-phoneNumber').textContent = data.phoneNumber;
    document.getElementById('user-profile-address').textContent = data.address;
    document.getElementById('user-profile-credit').textContent = data.credit;
}

function populateEmployeeProfile(data) {
    document.getElementById('employee-profile-username').textContent = data.username;
    document.getElementById('employee-profile-email').textContent = data.email;
    document.getElementById('employee-profile-firstName').textContent = data.firstName;
    document.getElementById('employee-profile-lastName').textContent = data.lastName;
    document.getElementById('employee-profile-phoneNumber').textContent = data.phoneNumber;
    document.getElementById('employee-profile-address').textContent = data.address;
}

function displaySection(sectionId) {
    ['admin-section', 'user-section', 'employee-section'].forEach(id => {
        document.getElementById(id).style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}
