import { API_URL } from "../../../settings.js";
//Add id to this URL to get a single user
import { makeOptions, makeOptionsToken, handleHttpErrors } from "../../../utils.js";

export async function initAddActivity() {
  document
    .getElementById("activity-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target;
      const name = form.name.value;
      const pricePrHour = form.pricePrHour.value;
      const minAge = form.minAge.value;
      const capacity = form.capacity.value;
      const activity = {
        name,
        pricePrHour,
        minAge,
        capacity,
      };
      const options = makeOptions("POST", activity);
      const res = await fetch(`${API_URL}/activity`, options).then(
        handleHttpErrors
      );
      window.location.href = '#/get-all-activity';
    });
}
