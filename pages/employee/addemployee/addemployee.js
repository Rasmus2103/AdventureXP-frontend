import { API_URL } from "../../../settings.js";
//Add id to this URL to get a single user
import { makeOptionsToken, handleHttpErrors } from "../../../utils.js";

export async function initAddEmployee() {
  document
    .getElementById("employee-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target;
      const username = form.username.value;
      const password = form.password.value;
      const firstName = form.firstName.value;
      const lastName = form.lastName.value;
      const phoneNumber = form.phoneNumber.value;
      const email = form.email.value;
      const address = form.address.value;
      const discriminatorType = form.discriminatorType.value;
      const employee = {
        username,
        password,
        firstName,
        lastName,
        phoneNumber,
        email,
        address,
        discriminatorType,
      };
      const options = makeOptionsToken("POST", employee);
      const res = await fetch(`${API_URL}/employee`, options).then(
        handleHttpErrors
      );
      window.location.href = '#/get-all-employees';
    });
}
