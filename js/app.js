// jshint esversion: 6
console.log('howdy');

function personReq(url, id) {
  requestHelper(url, writeToBrowser);

  function writeToBrowser() {
    let person = JSON.parse(this.responseText);
    document.getElementById(id).innerHTML = person.name;
  }
}

function planetsReq(url, element) {
  requestHelper(url, listPlanets);

  function listPlanets() {
    console.log(this.responseText);
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

personReq('http://swapi.co/api/people/4/', 'person4Name');
personReq('http://swapi.co/api/planets/1/', 'person4HomeWorld');
personReq('http://swapi.co/api/people/14/', 'person14Name');
personReq('http://swapi.co/api/species/1/', 'person14Species');
requestHelper('http://swapi.co/api/films/', filmTitleReq);


