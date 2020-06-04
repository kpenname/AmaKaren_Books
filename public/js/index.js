mapboxgl.accessToken =
  "pk.eyJ1IjoicGVubmFtZSIsImEiOiJja2EyaW5taXUwMmFyM2VvNmNuempvMThlIn0.0DFa51G5_9CQxGn1okW6hA";

let map = null;
let position = {};

/****** LOADING THE WINDOW  *****/

window.addEventListener("load", () => {
  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/penname/ckav7dgfc3ahh1iqk14lkdzez",
    center: [-75.3640719, 46.556399],
    zoom: 5.5,
  });
}); // ************* END OF WINDOW LOAD **********

/*SETTING INITIAL LOCATION TAG*/

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      setPosition(
        pos.coords.latitude,
        pos.coords.longitude,
        pos.coords.accuracy
      );
    },
    (err) => {
      console.log(err);
      backupGeoLocate();
    }
  );
} else {
  backupGeoLocate();
}

let backupGeoLocate = async () => {
  let res = await fetch("http://127.0.0.1:9000/geo");
  let data = await res.json();
  setPosition(data.latitude, data.longitude, 100);
};

/* SETTING THE INITIAL MARKER FOR MY LOCATION */

let setPosition = (lat, lng) => {
  position = { lat: lat, lng: lng };
  new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
};
