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
  iconSize: [20, 32],
  iconAnchor: [10, 0],
});

const markers = [];
markersCanvas.addTo(map);

const html = (i) =>
  `<p>I am ${i}</p><button type="button" id="reset-${i}">Reset</button>`;

[...Array(10).keys()].forEach((i) => {
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
