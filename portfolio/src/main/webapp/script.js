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

  imageContainer.innerHTML = '';
  imageContainer.appendChild(imgElement);
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

  const commentElement = document.createElement('comment');
  commentElement.innerText = str.name + ": " + str.text;

//   const deleteButtonElement = document.getElementById('delete-button');
//   deleteButtonElement.addEventListener('click', () => {
//     deleteTask(str);
//     liElement.remove();
//   });

  liElement.appendChild(commentElement);
  //liElement.appendChild(deleteButtonElement); 
  return liElement;
}

function updateComments() {
  fetch('/data').then(response => response.json()).then((tasks) => {
    let numComments = document.getElementById('num-comments').value;
    const historyEl = document.getElementById('history');
    historyEl.innerHTML = "";
    historyEl
    let displayNum = Math.min(numComments, tasks.length);
    for (let i = 0; i < displayNum; i++) {
        historyEl.appendChild(createListElement(tasks[i]));
    }
  });
}

function deleteTask(task) {
  const params = new URLSearchParams();
  params.append('id', task.id);
  fetch('/delete-task', {method: 'POST', body: params});
}
