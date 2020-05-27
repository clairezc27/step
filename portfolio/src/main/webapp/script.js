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

function displayPic() {
  const imgUrl = 'images/gallery-' + picIndex%10 + '.jpg';
  const imgElement = document.createElement('img');
  imgElement.src = imgUrl;

  const imageContainer = document.getElementById('gallery-img-container');
  // Remove the previous image.
  imageContainer.innerHTML = '';
  imageContainer.appendChild(imgElement);
  picIndex++;
}
