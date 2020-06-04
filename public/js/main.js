mapboxgl.accessToken =
  "pk.eyJ1IjoicGVubmFtZSIsImEiOiJja2EyaW5taXUwMmFyM2VvNmNuempvMThlIn0.0DFa51G5_9CQxGn1okW6hA";

let map = null;

const user = "dgrey";
const pass = "1234";

const b64login = btoa(`${user}:${pass}`);

window.addEventListener("load", async (e) => {
  let res = await fetch("/headers", {
    headers: { Authorization: "Basic " + b64login },
  });

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

  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/penname/ckav7dgfc3ahh1iqk14lkdzez",
    center: [-75.8, 45.5],
    zoom: 10,
  });
  new mapboxgl.Marker({
    draggable: true,
  })
    .setLngLat([-75.8, 45.5])
    .addTo(map);
});
