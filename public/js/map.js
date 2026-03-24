let mapDiv = document.getElementById("map");
let Location = mapDiv.dataset.location;
let Country = mapDiv.dataset.country;

let place = Location +","+ Country ;

console.log("Location:",place);

fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${place}`)
  .then((res) => res.json())
  .then((data) => {
    if (data.length === 0) {
      console.log("Location not found");
      return;
    }

    let lat = data[0].lat;
    let lon = data[0].lon;

    // 🎯 Better zoom
    var map = L.map('map').setView([lat, lon], 12);

    // 🎨 Better looking tiles (more modern)
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: "© OpenStreetMap contributors"
    }).addTo(map);

    // 🌟 Custom marker icon
    var customIcon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
      iconSize: [35, 35]
    });

    // 📍 Marker with styled popup
    L.marker([lat, lon], { icon: customIcon })
      .addTo(map)
      .bindPopup(`
        <div style="text-align:center;">
          <h3>${place}</h3>
          <p>📍 Beautiful location</p>
        </div>
      `)
      .openPopup();

    // 🧭 User location (extra cool feature)
    navigator.geolocation.getCurrentPosition((pos) => {
      let userLat = pos.coords.latitude;
      let userLon = pos.coords.longitude;

      L.marker([userLat, userLon])
        .addTo(map)
        .bindPopup("You are here 😎");
    });

  })
  .catch((err) => {
    console.log("Error:", err);
  });