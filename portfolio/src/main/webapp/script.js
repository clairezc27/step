// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

function scrollMe() {
  var me = document.getElementById('me');
  me.scrollIntoView(true);
}

function scrollCat() {
  var cat = document.getElementById('cat');
  cat.scrollIntoView(true);
}

function scrollFavs() {
  var favs = document.getElementById('favs');
  favs.scrollIntoView(true);
}

function scrollGallery() {
  var gallery = document.getElementById('gallery');
  gallery.scrollIntoView(true);
}

var picIndex = 0;

function nextPic(n) {
  if (n < 0 && picIndex + n < 0) {
      picIndex = 8;
  } else {
    picIndex += n;
  }
  const imgUrl = 'images/gallery-' + picIndex%9 + '.jpeg';
  const imgElement = document.createElement('img');
  imgElement.src = imgUrl;

  const imageContainer = document.getElementById('gallery-img-container');

  imageContainer.innerHTML = "";
  imageContainer.appendChild(imgElement);
}

function loadPage() {
  renderForm();
  getData();
}

function renderForm() {
  fetch('/login-status').then(response => response.json()).then((status) => {
    
    var loginButton = document.createElement('button');
    loginButton.className = 'button';
    loginButton.innerHTML = "Login";
    loginButton.formAction = "/login";
    loginButton.method = "GET";

    if (status.isUserLoggedIn == "false") {
      document.getElementById('comment-form').innerHTML = "";
      loginButton.innerHTML = "Login";
    } else {
      loginButton.innerHTML = "Logout";
    }

    document.getElementById('comment-form').appendChild(loginButton);
  });
}

function getData() {
  fetch('/data').then(response => response.json()).then((tasks) => {
    const historyEl = document.getElementById('history');
    tasks.forEach((line) => {
      historyEl.appendChild(createListElement(line));
    });
  });
}

function createListElement(str) {
  const liElement = document.createElement('li');
  liElement.className = 'comment-item';
  const dateElement = document.createElement('date');
  dateElement.innerText = str.date;
  const commentElement = document.createElement('comment');
  commentElement.innerText = str.name + ": " + str.text;

  liElement.appendChild(dateElement);
  liElement.appendChild(document.createElement("br"));
  liElement.appendChild(commentElement);
  return liElement;
}

function updateComments() {
  fetch('/data').then(response => response.json()).then((tasks) => {
    let numComments = document.getElementById('num-comments').value;
    const historyEl = document.getElementById('history');
    historyEl.innerHTML = "";
    let displayNum = Math.min(numComments, tasks.length);
    
    for (let i = 0; i < displayNum; i++) {
        historyEl.appendChild(createListElement(tasks[i]));
    }
  });
}

function deleteComments() {
  fetch('/data').then(response => response.json()).then((tasks) => {
    const historyEl = document.getElementById('history');
    historyEl.innerHTML = "";
  
    tasks.forEach((line) => {
      const params = new URLSearchParams();
      params.append('id', line.id);
      fetch('/delete-task', {method: 'POST', body: params});
    });
  });
}

let map;
let editMarker;

function initMap() {
  map = new google.maps.Map(
      document.getElementById('map'),
      {center: {lat: 37.422, lng: -122.084}, zoom: 16});

  map.addListener('click', (event) => {
    createMarkerForEdit(event.latLng.lat(), event.latLng.lng());
  });

  fetchMarkers();
  setMarkers();
}

function fetchMarkers() {
  fetch('/markers').then(response => response.json()).then((markers) => {
    markers.forEach(
        (marker) => {
            createMarkerForDisplay(marker.lat, marker.lng, marker.content)});
  });
}

function createMarkerForDisplay(lat, lng, content) {
  const marker =
      new google.maps.Marker({
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        position: {lat: lat, lng: lng}, map: map});

  const infoWindow = new google.maps.InfoWindow({content: content});
  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });
}

function createMarkerForEdit(lat, lng) {
  if (editMarker) {
    editMarker.setMap(null);
  }

  editMarker =
      new google.maps.Marker({
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        position: {lat: lat, lng: lng}, map: map});

  const infoWindow =
      new google.maps.InfoWindow({content: buildInfoWindowInput(lat, lng)});

  google.maps.event.addListener(infoWindow, 'closeclick', () => {
    editMarker.setMap(null);
  });

  infoWindow.open(map, editMarker);
}

function buildInfoWindowInput(lat, lng) {
  const textBox = document.createElement('textarea');
  const button = document.createElement('button');
  button.appendChild(document.createTextNode('Submit'));

  button.onclick = () => {
    postMarker(lat, lng, textBox.value);
    createMarkerForDisplay(lat, lng, textBox.value);
    editMarker.setMap(null);
  };

  const containerDiv = document.createElement('div');
  containerDiv.appendChild(textBox);
  containerDiv.appendChild(document.createElement('br'));
  containerDiv.appendChild(button);

  return containerDiv;
}

function postMarker(lat, lng, content) {
  const params = new URLSearchParams();
  params.append('lat', lat);
  params.append('lng', lng);
  params.append('content', content);

  fetch('/markers', {method: 'POST', body: params});
}

function setMarkers(map) {
  createMarkerForDisplay(39.6015023,-77.4501050, "Cunningham Falls");
  createMarkerForDisplay(33.8065112, -84.1448021, "Stone Mountain");
  createMarkerForDisplay(38.9832703, -77.2346588, "Billy Goat Trail");
  createMarkerForDisplay(38.9619118, -77.1967676, "Scott's Run");
  createMarkerForDisplay(39.2957353, -76.7852953, "Patapsco State Park");
  createMarkerForDisplay(34.0141701, -84.3504380, "Chattahoochee River");
}
