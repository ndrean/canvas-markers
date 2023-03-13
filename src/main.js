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

[...Array(10).keys()].forEach((i) => {
  const lat = 51 + Math.random();
  const lng = Math.random();
  const marker = L.marker([lat, lng], { icon })
    .bindPopup("I Am " + i)
    .on({
      mouseover(e) {
        this.openPopup();
      },
      mouseout(e) {
        this.closePopup();
      },
    });

  markers.push(marker);
});

markersCanvas.addMarkers(markers);

L.marker([52, 0], { icon }).addTo(map);
