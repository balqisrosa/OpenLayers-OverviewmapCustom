import Map from 'https://cdn.skypack.dev/ol/Map.js';
import OSM from 'https://cdn.skypack.dev/ol/source/OSM.js';
import TileLayer from 'https://cdn.skypack.dev/ol/layer/Tile.js';
import View from 'https://cdn.skypack.dev/ol/View.js';
import {
  DragRotateAndZoom,
  defaults as defaultInteractions,
} from 'https://cdn.skypack.dev/ol/interaction.js';
import { OverviewMap, defaults as defaultControls } from 'https://cdn.skypack.dev/ol/control.js';

// Ambil elemen checkbox untuk mengatur rotasi OverviewMap
const rotateWithView = document.getElementById('rotateWithView');

// Konfigurasi OverviewMap
const overviewMapControl = new OverviewMap({
  className: 'ol-overviewmap ol-custom-overviewmap',
  layers: [
    new TileLayer({
      source: new OSM(), // Menggunakan layer default OpenStreetMap
    }),
  ],
  collapseLabel: '\u00BB', // Label untuk menutup
  label: '\u00AB',         // Label untuk membuka
  collapsed: false,        // Tetap terbuka
  rotateWithView: false,   // Awalnya tidak mengikuti rotasi
});

// Tambahkan event listener untuk checkbox rotasi
rotateWithView.addEventListener('change', function () {
  overviewMapControl.setRotateWithView(this.checked);
});

// Konfigurasi peta utama
const map = new Map({
  controls: defaultControls().extend([overviewMapControl]), // Tambahkan OverviewMap ke kontrol
  interactions: defaultInteractions().extend([new DragRotateAndZoom()]), // Tambahkan interaksi rotasi
  layers: [
    new TileLayer({
      source: new OSM(), // Sumber peta utama
    }),
  ],
  target: 'map', // ID elemen target
  view: new View({
    center: [0, 0], // Koordinat pusat (EPSG:3857)
    zoom: 4,        // Level zoom awal
  }),
});
