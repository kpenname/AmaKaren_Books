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

// function whichPage() {

//   let mainPage = document.getElementById("main-page");
//   let pageKey = mainPage.innerHTML;
//   let partialPage = document.getElementById("partial-page");

//   switch (pageKey) {
//     case "home":
//       partialPage.innerHtml = "{{> home }}";
//       break;
//     case "account":
//       partialPage.innerHtml = "{{> account }}";
//       break;
//     case "wishlist":
//       partialPage.innerHtml = "{{> wishlist }}";
//       break;
//     case "available":
//       partialPage.innerHtml = "{{> available }}";
//       break;
//     case "review":
//       partialPage.innerHtml = "{{> review }}";
//       break;
//     case "message":
//       partialPage.innerHtml = "{{> message }}";
//       break;
//   }
// }

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

function displayMap() {
  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/penname/ckav7dgfc3ahh1iqk14lkdzez",
    center: [-75.747, 45.455],
    zoom: 12,
  });

  markers.push(
    new mapboxgl.Marker().setLngLat([ottawaLng, ottawaLat]).addTo(map)
  );
  $.ajax({
    url: "http://localhost:9000/getUsers",
    method: "GET",
    success: function (response) {
      // console.log(response[0]);
      // console.log(response[0].firstName);
      // console.log(response[0].lastName);
      console.log(response[0].postCode);
      // console.log(response[0].address);

      if (response.length > 0) {
        for (let index = 0; index < response.length; index++) {
          var newRow = $("<tr>");
          var cols = "";
          var firstname = "";
          var lastname = "";
          var postcode = response[index].postCode;
          $.ajax({
            url:
              "http://localhost:9000/geocoding?postcode=" +
              response[index].postCode,
            method: "GET",
            success: function (response2) {
              console.log(response2.latt); //undefined
              console.log(response2.longt); //undefined
              const marker = new mapboxgl.Marker()
                .setLngLat([response2.longt, response2.latt])
                .addTo(map);
              markers.push(marker);
            },
          });
          cols += "<td> " + response[index].firstName + "</td>";
          cols += "<td> " + response[index].lastName + "</td>";
          cols += "<td> " + response[index].postCode + "</td>";
          newRow.append(cols);
          $("#tableData .tbody").append(newRow);
        }
      }
    },
  });

  let showMap = document.getElementById("map");
  showMap.style.visibility = "visible";
  showMap.style.position = "fixed";
  showMap.style.height = "70vh";

  map.on("load", () => {
    map.resize();
  });
}

function getBookList() {
  let bookLookUp = document.getElementById("bookLookUp");
  bookLookUp.style.visibility = "visible";
  bookLookUp.style.height = "100%";
}
