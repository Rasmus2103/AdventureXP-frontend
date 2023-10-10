//import "https://unpkg.com/navigo"  //Will create the global Navigo object used below
import "./navigo_EditedByLars.js"  //Will create the global Navigo, with a few changes, object used below
//import "./navigo.min.js"  //Will create the global Navigo object used below

import {setActiveLink, loadHtml, renderHtml} from "./utils.js"

import { initLogin, logout, toggleLoginStatus } from "./pages/login/login.js"
import { initSignup } from "./pages/signup/signup.js"
import { initProfile } from "./pages/profile/profile.js"

import { initCustomers } from "./pages/customer/getallcustomers/getallcustomers.js" 
import { initDeleteCustomer } from "./pages/customer/deletecustomer/deletecustomer.js"
import { initEditCustomer } from "./pages/customer/editcustomer/editcustomer.js"
import { initGetCustomer } from "./pages/customer/getcustomer/getcustomer.js"

import { initAddEmployee } from "./pages/employee/addemployee/addemployee.js"
import { initDeleteEmployee } from "./pages/employee/deleteemployee/deleteemployee.js"
import { initEditEmployee } from "./pages/employee/editemployee/editemployee.js"
import { initGetEmployee } from "./pages/employee/getemployee/getemployee.js"
import { initGetAllEmployees } from "./pages/employee/getallemployees/getallemployees.js"

import { initAddActivity } from "./pages/activity/addactivity/addactivity.js"
import { initEditActivity } from "./pages/activity/editactivity/editactivity.js"
import { initGetActivity } from "./pages/activity/getactivity/getactivity.js"
import { initGetAllActivity } from "./pages/activity/getallactivity/getallactivity.js"

import { initAddArrangement } from "./pages/arrangement/addarrangement/addarrangement.js"
import { initEditArrangement } from "./pages/arrangement/editarrangement/editarrangement.js"
import { initGetArrangement } from "./pages/arrangement/getarrangement/getarrangement.js"
import { initGetAllArrangements } from "./pages/arrangement/getallarrangements/getallarrangements.js"

import { initAddReservation } from "./pages/reservation/addreservation/addreservation.js"
import { initEditReservation } from "./pages/reservation/editreservation/editreservation.js"
import { initGetReservation } from "./pages/reservation/getreservation/getreservation.js"
import { initGetAllReservations } from "./pages/reservation/getallreservations/getallreservations.js"

import { initAddShift } from "./pages/Shift/addshift/addshift.js"
import { initEditShift } from "./pages/Shift/editshift/editshift.js"
import { initGetShift } from "./pages/Shift/getshift/getshift.js"
import { initGetAllShifts } from "./pages/Shift/getallshifts/getallshifts.js"

window.addEventListener("load", async () => {

  //const templateCars = await loadHtml("./pages/cars/cars.html")
  const templateSignup = await loadHtml("./pages/signup/signup.html")
  const templateLogin = await loadHtml("./pages/login/login.html")
  const templateNotFound = await loadHtml("./pages/notFound/notFound.html")
  const templateProfile = await loadHtml("./pages/profile/profile.html")

  const templateGetAllCustomer = await loadHtml("./pages/customer/getallcustomers/getallcustomers.html")
  const templateDeleteCustomer = await loadHtml("./pages/customer/deletecustomer/deletecustomer.html")
  const templateEditCustomer = await loadHtml("./pages/customer/editcustomer/editcustomer.html")
  const templateGetCustomer = await loadHtml("./pages/customer/getcustomer/getcustomer.html")

  const templateAddEmployee = await loadHtml("./pages/employee/addemployee/addemployee.html")
  const templateDeleteEmployee = await loadHtml("./pages/employee/deleteemployee/deleteemployee.html")
  const templateEditEmployee = await loadHtml("./pages/employee/editemployee/editemployee.html")
  const templateGetEmployee = await loadHtml("./pages/employee/getemployee/getemployee.html")
  const templateGetAllEmployees = await loadHtml("./pages/employee/getallemployees/getallemployees.html")

  const templateAddReservation = await loadHtml("./pages/reservation/addreservation/addreservation.html")
  const templateEditReservation = await loadHtml("./pages/reservation/editreservation/editreservation.html")
  const templateGetReservation = await loadHtml("./pages/reservation/getreservation/getreservation.html")
  const templateGetAllReservations = await loadHtml("./pages/reservation/getallreservations/getallreservations.html")

  const templateAddShift = await loadHtml("./pages/Shift/addshift/addshift.html")
  const templateEditShift = await loadHtml("./pages/Shift/editshift/editshift.html")
  const templateGetShift = await loadHtml("./pages/Shift/getshift/getshift.html")
  const templateGetAllShifts = await loadHtml("./pages/Shift/getallshifts/getallshifts.html")

  const templateAddActivity = await loadHtml("./pages/activity/addactivity/addactivity.html")
  const templateEditActivity = await loadHtml("./pages/activity/editactivity/editactivity.html")
  const templateGetActivity = await loadHtml("./pages/activity/getactivity/getactivity.html")
  const templateGetAllActivity = await loadHtml("./pages/activity/getallactivity/getallactivity.html")

  const templateAddArrangement = await loadHtml("./pages/arrangement/addarrangement/addarrangement.html")
  const templateEditArrangement = await loadHtml("./pages/arrangement/editarrangement/editarrangement.html")
  const templateGetArrangement = await loadHtml("./pages/arrangement/getarrangement/getarrangement.html")
  const templateGetAllArrangements = await loadHtml("./pages/arrangement/getallarrangements/getallarrangements.html")

  //If token existed, for example after a refresh, set UI accordingly
  const token = localStorage.getItem("token")
  toggleLoginStatus(token)

 const router = new Navigo("/", { hash: true });
  //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
  window.router = router

  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url)
        done()
      }
    })
    .on({
      //For very simple "templates", you can just insert your HTML directly like below
      "/": () => document.getElementById("content").innerHTML = `
        <h2>Home</h2>
        <img style="width:50%;max-width:600px;margin-top:1em;" src="./images/cars.png">
        <p style='margin-top:1em;font-size: 1.5em;color:darkgray;'>
          Car's 'R' Us - Created, as a help to make GREAT fullstack developers <span style='font-size:2em;'>&#128516;</span>
        </p>
     `,
     //Customer
     "/all-customers": () => {
        renderHtml(templateGetAllCustomer, "content")
        initCustomers()
      },
      "/delete-customer": () => {
        renderHtml(templateDeleteCustomer, "content")
        initDeleteCustomer()
      },
      "/edit-customer": () => {
        renderHtml(templateEditCustomer, "content")
        initEditCustomer()
      },
      "/get-customer": () => {
        renderHtml(templateGetCustomer, "content")
        initGetCustomer()
      },
      //Activity
      "/add-activity": () => {
        renderHtml(templateAddActivity, "content")
        initAddActivity()
      },
      "/edit-activity": () => {
        renderHtml(templateEditActivity, "content")
        initEditActivity()
      },
      "/get-activity": () => {
        renderHtml(templateGetActivity, "content")
        initGetActivity()
      },
      "/get-all-activity": () => {
        renderHtml(templateGetAllActivity, "content")
        initGetAllActivity()
      },
      //Arrangement
      "/add-arrangement": () => {
        renderHtml( templateAddArrangement, "content")
        initAddArrangement()
      },
      "/edit-arrangement": () => {
        renderHtml(templateEditArrangement, "content")
        initEditArrangement()
      },
      "/get-arrangement": () => {
        renderHtml(templateGetArrangement, "content")
        initGetArrangement()
      },
      "/get-all-arrangements": () => {
        renderHtml(templateGetAllArrangements, "content")
        initGetAllArrangements()
      },
      //Employee
      "/add-employee": () => {
        renderHtml(templateAddEmployee, "content")
        initAddEmployee()
      },
      "/delete-employee": () => {
        renderHtml(templateDeleteEmployee, "content")
        initDeleteEmployee()
      },
      "/edit-employee": () => {
        renderHtml(templateEditEmployee, "content")
        initEditEmployee()
      },
      "/get-employee": () => {
        renderHtml(templateGetEmployee, "content")
        initGetEmployee()
      },
      "/get-all-employees": () => {
        renderHtml(templateGetAllEmployees, "content")
        initGetAllEmployees()
      },
      //Reservation
      "/add-reservation": () => {
        renderHtml(templateAddReservation, "content")
        initAddReservation()
      },
      "/edit-reservation": () => {
        renderHtml(templateEditReservation, "content")
        initEditReservation()
      },
      "/get-reservation": () => {
        renderHtml(templateGetReservation, "content")
        initGetReservation()
      },
      "/get-all-reservations": () => {
        renderHtml(templateGetAllReservations, "content")
        initGetAllReservations()
      },  
      //Shift
      "/add-shift": () => {
        renderHtml(templateAddShift, "content")
        initAddShift()
      },
      "edit-shift": () => {
        renderHtml(templateEditShift, "content")
        initEditShift()
      },
      "/get-shift": () => {
        renderHtml(templateGetShift, "content")
        initGetShift()
      },
      "/get-all-shifts": () => {
        renderHtml(templateGetAllShifts, "content")
        initGetAllShifts()
      },
      //Login/Logout and signup
      "/signup": () => {
        renderHtml(templateSignup, "content")
        initSignup()
      },
      "/login": () => {
        renderHtml(templateLogin, "content")
        initLogin()
      },"/logout": () => {
        renderHtml(templateLogin, "content")
        logout()
      },
      //Profile
      "/profile": () => {
        renderHtml(templateProfile, "content")
        initProfile()
      }
    })
    .notFound(() => {
      renderHtml(templateNotFound, "content")
    })
    .resolve()
});


window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
    + ' Column: ' + column + ' StackTrace: ' + errorObj);
}