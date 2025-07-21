async function updateLocation() {
  const zip = document.getElementById("zipInput").value;
  if (!zip) return;

  try {
    const res = await fetch(`https://api.zippopotam.us/us/${zip}`);
    const data = await res.json();
    const place = data.places[0];
    const lat = parseFloat(place.latitude);
    const lng = parseFloat(place.longitude);
    const city = place["place name"];
    const state = place["state abbreviation"];

    document.getElementById("location").innerText = `${city}, ${state}`;
    updateSunInfo(lat, lng);
  } catch (err) {
    document.getElementById("location").innerText = "Invalid ZIP";
    document.getElementById("divinePercent").innerText = "--%";
    document.getElementById("sunSlider").value = 0;
  }
}

function updateSunInfo(lat, lng) {
  const now = new Date();
  const times = SunCalc.getTimes(now, lat, lng);
  const sunrise = times.sunrise;
  const sunset = times.sunset;

  if (now < sunrise || now > sunset) {
    document.getElementById("divinePercent").innerText = "0%";
    document.getElementById("sunSlider").value = 0;
    return;
  }

  const totalDaylight = sunset - sunrise;
  const elapsed = now - sunrise;
  const percent = Math.floor((elapsed / totalDaylight) * 100);

  document.getElementById("divinePercent").innerText = `${percent}%`;
  document.getElementById("sunSlider").value = percent;
}

// Default on page load: Atlanta ZIP
window.onload = () => {
  document.getElementById("zipInput").value = "30303";
  updateLocation();
};
