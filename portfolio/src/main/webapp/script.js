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
function genAlbums() {
    var past = new Set();
    
    const albumNames = ['2014 Forest Hill Drive - J.Cole', 'ASTROWORLD - Travis Scott', 'Blonde - Frank Ocean', 'Currents - Tame Impala', 'Dont Forget About Me - Dominic Fike', 'GINGER - BROCKHAMPTON', 'Lyrics To Go Vol.1 - Kota the Friend', 
    'Mind the Moon - Milky Chance', 'Oasis - Bad Bunny', 'Section.80 - Kendrick Lamar', 'The Divine Feminine - Mac Miller', 'The Click - AJR', 'YHLQMDLG - Bad Bunny', 'Ego Death - The Internet', 'The Getaway - Red Hot Chilli Peppers', 'Ved-Ritviz'];
    const albumArt = ['2014FHD.png', 'ASTROWORLD.png', 'Blonde.png', 'Currents.png', 'DFAM.png', 'GINGER.png', 'LTG1.png', 'MTM.png', 'Oasis.png', 'Section80.png', 'TDF.png', 'TheClick.png', 'YHLQMDLG.png', 'ED.png', 'TG.png', 'Ved.png']
    var ul = document.getElementById("dynamic-list");
    ul.innerHTML = "";
    for(var i = 1; i < 5; i++) {
        var imageIndex; 
        do {
            imageIndex = Math.floor(Math.random() * albumArt.length);
        }
        while(past.has(imageIndex));
        past.add(imageIndex);
        const imgUrl = '/images/' + albumArt[imageIndex];
        const imgElement = document.createElement('img');
        imgElement.src = imgUrl;
        var imageContainer = document.getElementById('random-image-container-' + i);
        imageContainer.innerHTML = '';
        imageContainer.appendChild(imgElement);
        var listItem = document.createElement('li');
        listItem.textContent = albumNames[imageIndex];
        ul.appendChild(listItem);
    }
}

