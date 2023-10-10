import { API_URL, handleHttpErrors, makeOptions } from "../../../settings.js";
//Add id to this URL to get a single user
import { makeOptions, handleHttpErrors } from "../../../utils.js";

export async function initAddActivity() {
  document
    .getElementById("activity-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target;
      const name = form.name.value;
      const price = form.price.value;
      const minAge = form.minAge.value;
      const capacity = form.capacity.value;
      const activity = {
        name,
        price,
        minAge,
        capacity,
      };
      const options = makeOptions("POST", activity);
      const res = await fetch(`${API_URL}/activity`, options).then(
        handleHttpErrors
      );
    });
}
