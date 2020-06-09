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
  showForm();
  getData();
}

function showForm() {
  fetch('/login-status').then(response => response.text()).then((loggedIn) => {
    if (loggedIn == 0) {
      document.getElementById('comment-form').innerHTML = "";
      var loginButton = document.createElement('button');
      loginButton.className = 'button';
      loginButton.innerHTML = "Login";
      loginButton.formAction = "/login";
      loginButton.method = "GET";
      document.getElementById('comment-form').appendChild(loginButton);
    } else {
      const form = document.getElementById('comment-form');
      var logoutButton = document.createElement('button');
      logoutButton.className = 'button';
      logoutButton.innerHTML = "Logout";
      logoutButton.formAction = "/login";
      logoutButton.method = "GET";
      document.getElementById('comment-form').appendChild(logoutButton);
    }
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

function initMap() {
  const map = new google.maps.Map(
      document.getElementById('map'),
      {center: {lat: 37.422, lng: -122.084}, zoom: 16});
  setMarkers(map);
}

function setMarkers(map) {

  const catoctinMark = new google.maps.Marker({
    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    position: {lat: 39.6015023, lng: -77.4501050},
    map: map,
    title: 'Cunningham Falls State Park'
    });

  const stoneMountainMark = new google.maps.Marker({
    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    position: {lat: 33.8065112, lng: -84.1448021},
    map: map,
    title: 'Stone Mountain'
    });

  const billyGoatMark = new google.maps.Marker({
    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    position: {lat: 38.9832703, lng: -77.2346588},
    map: map,
    title: 'Billy Goat Trail'
    });

  const scottsRunMark = new google.maps.Marker({
    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    position: {lat: 38.9619118, lng: -77.1967676},
    map: map,
    title: "Scott's Run"
    });

  const patapscoMark = new google.maps.Marker({
    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    position: {lat: 39.2957353, lng: -76.7852953},
    map: map,
    title: 'Patapsco State Park'
    });

  const chattahoocheeMark = new google.maps.Marker({
    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    position: {lat: 34.0141701, lng: -84.3504380},
    map: map,
    title: "Chattahoochee River"
    });
}
