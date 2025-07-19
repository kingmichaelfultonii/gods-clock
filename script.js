function updateTime() {
  const now = new Date();
  const manTime = now.toLocaleTimeString();

  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Convert time to a decimal between 0 and 24
  const decimalTime = hours + minutes / 60;

  // Divine time logic (simplified phases)
  let phase = '';
  if (decimalTime >= 5 && decimalTime < 9) {
    phase = 'Sunrise (New Beginning)';
  } else if (decimalTime >= 9 && decimalTime < 15) {
    phase = 'Midday (Peak)';
  } else if (decimalTime >= 15 && decimalTime < 19) {
    phase = 'Sunset (Descent)';
  } else {
    phase = 'Midnight (Reset)';
  }

  // Format divine time as % of 24h cycle
  const godTime = ((decimalTime / 24) * 100).toFixed(2) + '% of cycle';

  document.getElementById('man-time').textContent = manTime;
  document.getElementById('god-time').textContent = godTime;
  document.getElementById('phase-label').textContent = `Phase: ${phase}`;

  // Move the sun across the screen based on time
  const sunPercent = (decimalTime / 24) * 100;
  document.getElementById('sun-indicator').style.left = `calc(${sunPercent}% - 5px)`;
}

function setLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      document.getElementById('location').textContent = `Your Coordinates: ${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
    });
  } else {
    document.getElementById('location').textContent = 'Location not supported';
  }
}

setLocation();
setInterval(updateTime, 1000);
updateTime();
