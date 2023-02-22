//my'accessToken'=‘0_all'
mapboxgl.accessToken =
  "pk.eyJ1IjoiMjYyOTEzM3oiLCJhIjoiY2xjcTcwMXVvMDMwNDNwcGR5bmg1eWVsMiJ9.9rq3Ge3Mswca0Tlv1H_yKA";
//my'accessToken'=‘1_theatre'
mapboxgl.accessToken =
"pk.eyJ1IjoiMjYyOTEzM3oiLCJhIjoiY2xjcTcwMXVvMDMwNDNwcGR5bmg1eWVsMiJ9.9rq3Ge3Mswca0Tlv1H_yKA";
//my'accessToken'=‘8_music'
mapboxgl.accessToken =
"pk.eyJ1IjoiMjYyOTEzM3oiLCJhIjoiY2xjcTcwMXVvMDMwNDNwcGR5bmg1eWVsMiJ9.9rq3Ge3Mswca0Tlv1H_yKA";
//my'accessToken'=‘11_musuem'
mapboxgl.accessToken =
"pk.eyJ1IjoiMjYyOTEzM3oiLCJhIjoiY2xjcTcwMXVvMDMwNDNwcGR5bmg1eWVsMiJ9.9rq3Ge3Mswca0Tlv1H_yKA";
//myaccessToken'=‘13_library'
mapboxgl.accessToken =
"pk.eyJ1IjoiMjYyOTEzM3oiLCJhIjoiY2xjcTcwMXVvMDMwNDNwcGR5bmg1eWVsMiJ9.9rq3Ge3Mswca0Tlv1H_yKA";
//my'style_URL'='0_all'
const style_all = "mapbox://styles/2629133z/cle7nsn7o000301qs1ql38dmv";
//my'style_URL'='1_theatre'
const style_theatre = "mapbox://styles/2629133z/cleekiy2u005z01pcg1myodqy";
//my'style_URL'='8_music'
const style_music = "mapbox://styles/2629133z/clefzo3fp001z01qgskfnwyew";
//my'style_URL'='11_museum'
const style_museum = "mapbox://styles/2629133z/cleg0kt4z000f01qf230qvo26";
//my'style_URL'='13_library'
const style_library = "mapbox://styles/2629133z/cleg8srr5000p01qfmrxcqgmb";
//initial display
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: style_all,
  center: [-0.1276, 51.5072],
  zoom: 9
});




//popup part
//add click
map.on("click", (event) => {
  const features = map.queryRenderedFeatures(event.point, {
    layers: ["0-all"] 
  });
  if (!features.length) {
    return;
  }
  const feature = features[0];
//Create a popup
  const popup = new mapboxgl.Popup({ offset: [0, -15], className: "my-popup" })  .setLngLat(feature.geometry.coordinates)
    .setHTML(
//popup information
   `<h3>Location: ${feature.properties.name}</h3>
    <p>Address: ${feature.properties.address}</p>
    <p>borough: ${feature.properties.borough_name}</p>
    <p>borough_code: ${feature.properties.borough_code}</p>
    <p>website: ${feature.properties.website}</p>
    <p>label: ${feature.properties.belongs}</p>`
    )
    .addTo(map);
});





//hover part
//add a mousemove
map.on("mousemove", (event) => {
  const dzone = map.queryRenderedFeatures(event.point, {
    layers: ["0-all"]
  });
  document.getElementById("pd").innerHTML = dzone.length
    ? `<h2>Location: ${dzone[0].properties.name}</h2>
 <p1>Number of cultural venues in the region: <strong>${dzone[0].properties.borough_name}</strong> 
 </p1>`
 : `<p1>hover</p1>`;
});





//control part
//search control
const geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: false, // Do not use the default marker style
  placeholder: "Search for places in London", // Placeholder text for the search bar
});
map.addControl(geocoder, "top-right");

//large and small control
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
  }),
  "bottom-right"
);
map.addControl(new mapboxgl.NavigationControl(), "bottom-right");



//button part
const layerList = document.getElementById("frame");
const inputs = layerList.getElementsByTagName("input");

//On click the radio button, toggle the style of the map.
for (const input of inputs) {
  input.onclick = (layer) => {
    if (layer.target.id == "style_all") {
     map.setStyle(style_all);
    }    
    if (layer.target.id == "style_theatre") {
 map.setStyle(style_theatre);
    }
    if (layer.target.id == "style_music") {
  map.setStyle(style_music);
    }
    if (layer.target.id == "style_museum") {
  map.setStyle(style_museum);
    }
    if (layer.target.id == "style_library") {
  map.setStyle(style_library);
    }
  };
}