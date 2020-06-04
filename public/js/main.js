const user = "bhall";
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
});
