import marker2 from "/marker2.png";
import * as L from "leaflet";
import { MarkersCanvas } from "leaflet-markers-canvas";

const map = L.map("map").setView([51.5, 0], 9);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  preferCanvas: true,
}).addTo(map);

const markersCanvas = new L.MarkersCanvas();

const icon = L.icon({
  iconUrl: marker2,
  iconSize: [40, 62],
  iconAnchor: [10, 0],
});

const markers = [];
markersCanvas.addTo(map);

const html = (i) =>
  `<p>I am ${i}</p><button type="button" id="reset-${i}">Reset</button>`;

[...Array(5).keys()].forEach((i) => {
  const lat = 51 + Math.random();
  const lng = Math.random();
  const marker = L.marker([lat, lng], { icon }).bindPopup(html(i));

  marker.on("click", (e) => {
    document
      .querySelector("button")
      .addEventListener("click", () => deleteMarker(marker));
  });

  markers.push(marker);
});

function deleteMarker(marker) {
  marker.closePopup();
  markersCanvas.removeMarker(marker);
}

markersCanvas.addMarkers(markers);

// draggable only if not into canvas
const m = L.marker([51, 0], { draggable: true });
m.addTo(map);

map.on("click", (e) => {
  const new_marker = L.marker(e.latlng, { icon }).bindPopup(html(10));
  markersCanvas.addMarker(new_marker);
  new_marker.on("click", () => {
    document
      .querySelector("button")
      .addEventListener("click", () => deleteMarker(new_marker));
  });
});
