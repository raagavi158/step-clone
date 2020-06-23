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
function genData() {
    fetch('/data').then(response => response.json()).then((comm) => {
    var ul = document.getElementById("dynamic-list");
    comm.forEach((comment) => {
        ul.appendChild(createElement(comment));
        })
    });
}

function createElement(comment) {
  const element = document.createElement('li');
  element.className = 'comment';

  const text = document.createElement('span');
  text.innerText = comment.email + ": " + comment.comm ;

  const deleteButtonElement = document.createElement('button');
  deleteButtonElement.innerText = 'Delete';
  deleteButtonElement.addEventListener('click', () => {
    deleteTask(comment);
    element.remove();
  });

  element.appendChild(text);
  element.appendChild(deleteButtonElement);
  return element;
}

function deleteTask(comment) {
  const params = new URLSearchParams();
  params.append('id', comment.id);
  fetch('/delete-task', {method: 'POST', body: params});
}

function loginCheck() {
    fetch('/login').then(response => response.json()).then((loginStatus) => {
        var body = document.getElementById("main-body");
        if((loginStatus.isLoggedIn).localeCompare("true")) { 
            document.getElementById("comments-form").style.visibility = "visible";
            document.getElementById("dynamic-list").style.visibility = "visible";
            body.innerHTML = "Logout <a href= \"" + loginStatus.link + "\" >here</a>"
        }   
        else {
            document.getElementById("comments-form").style.visibility = "hidden";
            document.getElementById("dynamic-list").style.visibility = "hidden";
            body.innerHTML = "Login <a href= \"" + loginStatus.link + "\" >here</a>"
        }   
    });
}

