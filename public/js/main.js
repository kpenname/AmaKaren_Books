mapboxgl.accessToken =
  "pk.eyJ1IjoicGVubmFtZSIsImEiOiJja2EyaW5taXUwMmFyM2VvNmNuempvMThlIn0.0DFa51G5_9CQxGn1okW6hA";

// Right now, I have coded one person's username and password
// I did this to make sure we had a connection to the db
// It is working becasue you will see a Yes on the page

const user = "bhall";
const pass = "1234";

const b64login = btoa(`${user}:${pass}`);

window.addEventListener("load", async (e) => {
  let res = await fetch("/headers", {
    headers: { Authorization: "Basic " + b64login },
  });

  // for the login, checking if the username and password match in the db
  // yes or no is returned to the page.
  // we won't keep this - but it might be helpful for testing

  let data = await res.json();
  if (data.user != null) {
    let yes = document.getElementById("app");
    yes.style.color = "blue";
    yes.style.textAlign = "center";
    yes.innerHTML = "<h2><b>Yes</b></h2>";
  } else {
    let no = document.getElementById("app");
    no.style.textAlign = "center";
    no.style.color = "red";
    no.innerHTML = "<h2><b>NO</b></h2>";
  }

  // this is the map and a marker in the center
  // we won't keep this marker here, but when
  // we have a user's location, we can set the marker

  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/penname/ckav7dgfc3ahh1iqk14lkdzez",
    center: [-75.77, 45.42],
    zoom: 10.5,
  });

  var marker = new mapboxgl.Marker({
    draggable: true,
  })
    .setLngLat([-75.77, 45.42])
    .addTo(map);

  // this function is useful for dragging the marker on the map and seeing on the webpage
  // the coordinates of where it is.  We don't need to keep it.

  var coordinates = document.getElementById("coordinates");

  function onDragEnd() {
    var lngLat = marker.getLngLat();
    coordinates.style.display = "block";
    coordinates.innerHTML =
      "Longitude: " + lngLat.lng + "<br />Latitude: " + lngLat.lat;
  }
  marker.on("dragend", onDragEnd);
}); // this is the end of the page load. Some code goes in here, some does not.
// It is always trial and error for me which is which.
