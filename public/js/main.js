mapboxgl.accessToken =
  "pk.eyJ1IjoicGVubmFtZSIsImEiOiJja2EyaW5taXUwMmFyM2VvNmNuempvMThlIn0.0DFa51G5_9CQxGn1okW6hA";

let map;
let markers = [];
var ottawaLat = 45.319212;
var ottawaLng = -75.6691652;

// ************ start of window load *************//

window.addEventListener("load", async (e) => {
  // selecting the login text to show login dialog
  let logIn = document.getElementById("logIn");
  logIn.addEventListener("click", showLoginForm);
  logIn.style.cursor = "pointer";

  // selecting the create text to show create account dialog
  let createHeading = document.getElementById("createHeading");
  createHeading.addEventListener("click", showCreateAccount);
  createHeading.style.cursor = "pointer";
});

// ************ end of window load *************//

function showMsgForm() {
  let msg = document.getElementById("msg");
  msg.style.visibility = "visible";
  msg.style.height = "100%";
}

function showLoginForm() {
  let loginForm = document.getElementById("loginForm");
  if (loginForm.style.visibility === "hidden") {
    loginForm.style.visibility = "visible";
    loginForm.style.height = "100%";
  } else {
    loginForm.style.visibility = "hidden";
    loginForm.style.height = "0";
  }
}

function showCreateAccount() {
  let createForm = document.getElementById("createForm");
  if (createForm.style.visibility === "hidden") {
    createForm.style.visibility = "visible";
    createForm.style.height = "100%";
  } else {
    createForm.style.visibility = "hidden";
    createForm.style.height = "0";
  }
}

// I took the map out of the page load because we don't always want the map on the page.
// I want to be able to call this function when it's needed.

// markers.push(
//   new mapboxgl.Marker().setLngLat([ottawaLng, ottawaLat]).addTo(map)
// );
// $.ajax({
//   url: "http://localhost:9000/getUsers",
//   method: "GET",
//   success: function (response) {
//     // console.log(response[0]);
//     // console.log(response[0].firstName);
//     // console.log(response[0].lastName);
//     console.log(response[0].postCode);
//     // console.log(response[0].address);

//     if (response.length > 0) {
//       for (let index = 0; index < response.length; index++) {
//         var newRow = $("<tr>");
//         var cols = "";
//         var firstname = "";
//         var lastname = "";
//         var postcode = response[index].postCode;
//         $.ajax({
//           url: "/geocoding?postcode=" + response[index].postCode,
//           method: "GET",
//           success: function (response2) {
//             console.log(response2.latt); //undefined
//             console.log(response2.longt); //undefined
//             const marker = new mapboxgl.Marker()
//               .setLngLat([response2.longt, response2.latt])
//               .addTo(map);
//             markers.push(marker);
//           },
//         });
//       }
//     }
//   },
// });

function getBookList() {
  let bookLookUp = document.getElementById("bookLookUp");
  bookLookUp.style.visibility = "visible";
  bookLookUp.style.height = "100%";
}
