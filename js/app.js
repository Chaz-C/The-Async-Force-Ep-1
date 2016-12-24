// jshint esversion: 6
function personReq(url, id, id2) {
  requestHelper(url, writeToBrowser);

  function writeToBrowser() {
    let person = JSON.parse(this.responseText);
    document.getElementById(id).innerHTML = person.name;

    if ( person.name === 'Darth Vader' ) {
      requestHelper(person.homeworld, writeToBrowser2);
    } else {
      requestHelper(person.species[0], writeToBrowser2);
    }

    function writeToBrowser2() {
      let person2 = JSON.parse(this.responseText);
      document.getElementById(id2).innerHTML = person2.name;
    }
  }
}



function planetsReq(url, element) {
  requestHelper(url, listPlanets);

  function listPlanets() {
    let planetName = JSON.parse(this.responseText).name;
    let liPlanet = document.createElement('li');
    liPlanet.className = 'planet';
    let h4Planet = document.createElement('h4');
    h4Planet.className = 'planetName';
    h4Planet.innerHTML = planetName;
    element.appendChild(liPlanet);
    liPlanet.appendChild(h4Planet);
  }
}

function filmTitleReq() {
  let filmTitles = JSON.parse(this.responseText).results;
  for ( let i = 0; i < filmTitles.length; i ++ ) {
    let createTitle = document.createElement('li');
    createTitle.className = 'film';
    createTitle.innerHTML = `<h2 class='filmTitle'>${filmTitles[i].title}</h2><h3>Planets</h3>`;
    filmList.appendChild(createTitle);
    let ulPlanet = document.createElement('ul');
    ulPlanet.className = 'filmPlanets';
    createTitle.appendChild(ulPlanet);

    for ( let j = 0; j < filmTitles[i].planets.length; j ++ ) {
      planetsReq(filmTitles[i].planets[j], ulPlanet);
    }
  }
}

function requestHelper(link, listener) {
  let newReq = new XMLHttpRequest();
  newReq.addEventListener('load', listener);
  newReq.open('GET', link);
  newReq.send();
}

personReq('http://swapi.co/api/people/4/', 'person4Name', 'person4HomeWorld');
personReq('http://swapi.co/api/people/14/', 'person14Name', 'person14Species');
requestHelper('http://swapi.co/api/films/', filmTitleReq);


