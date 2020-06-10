mapboxgl.accessToken =
  "pk.eyJ1IjoicGVubmFtZSIsImEiOiJja2EyaW5taXUwMmFyM2VvNmNuempvMThlIn0.0DFa51G5_9CQxGn1okW6hA";

let map;
let markers = [];
var ottawaLat = 45.319212;
var ottawaLng = -75.6691652;

// ************ start of window load *************//

window.addEventListener("load", async (e) => {
  // selecting the send message text to show message dialog
  let sendMsg = document.getElementById("sendMsg");
  sendMsg.addEventListener("click", showMsgForm);
  sendMsg.style.cursor = "pointer";

  // selecting the create text to show create account dialog
  let createHeading = document.getElementById("createHeading");
  createHeading.addEventListener("click", showCreateAccount);
  createHeading.style.cursor = "pointer";

  // selecting the update heading to add details to your account
  let updateHeading = document.getElementById("updateHeading");
  updateHeading.addEventListener("click", showUpdateForm);
  updateHeading.style.cursor = "pointer";

  // selecting the login text to show login dialog
  let logIn = document.getElementById("logIn");
  logIn.addEventListener("click", showLoginForm);
  logIn.style.cursor = "pointer";

  // selecting the show map text to show map
  let showMap = document.getElementById("showMap");
  showMap.addEventListener("click", displayMap);
  showMap.style.cursor = "pointer";

  checkCookie();
});

// ************ end of window load *************//

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

  // These three cookie methods work when used as they were online.  But I don't want
  // to get the username of the user.  I want the userId that is
  // created when they are entered into the database.
  // This is not information that the user has access to.

  // note for myself... can I access the userId by an sql statement?
  // select userId where username = ?
  // more work to be done ! :)
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var user = getCookie("username");
  let welcome = document.getElementById("welcome");

  if (user != "") {
    welcome.innerHTML += user;
  } else {
    welcome.style.visibility = "hidden";
    welcome.style.height = "0";
    // user = prompt("Please enter your name:", "");
    // if (user != "" && user != null) {
    // setCookie("username", user, 30);
  }
}

function showMsgForm() {
  let msg = document.getElementById("msg");
  msg.style.visibility = "visible";
  msg.style.height = "100%";
}

function showLoginForm() {
  let loginForm = document.getElementById("loginForm");
  loginForm.style.visibility = "visible";
  loginForm.style.height = "100%";
}

function showCreateAccount() {
  let createForm = document.getElementById("createForm");
  createForm.style.visibility = "visible";
  createForm.style.height = "100%";
}

function showUpdateForm() {
  let updateForm = document.getElementById("updateForm");
  updateForm.style.visibility = "visible";
  updateForm.style.height = "100%";
}

function submitForm() {
  console.log("In here");
  window.location.href = "users.html";

  if (document.loginForm.username.value == "") {
    alert("Please enter your username");
  } else {
    $.ajax({
      url:
        "localhost:9000/registerUser?username=" +
        document.myForm.username.value +
        "&password=" +
        document.myForm.password.value,
      method: "GET",
      success: function (response) {
        // validation checks
        window.location.href = "users.html";
      },
    });
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
