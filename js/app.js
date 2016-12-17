// jshint esversion: 6
console.log('howdy');

function darthNameReq() {
  let darthVader = JSON.parse(this.responseText);
  document.getElementById('person4Name').innerHTML = darthVader.name;
}

function darthHomeworldReq() {
  let darthVaderPlanet = JSON.parse(this.responseText);
  document.getElementById('person4HomeWorld').innerHTML = darthVaderPlanet.name;
}

function hanNameReq() {
  let hanName = JSON.parse(this.responseText);
  document.getElementById('person14Name').innerHTML = hanName.name;
}

function hanSpeciesReq() {
  let hanSpecies = JSON.parse(this.responseText);
  document.getElementById('person14Species').innerHTML = hanSpecies.name;
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

requestHelper('http://swapi.co/api/people/4/', darthNameReq);
requestHelper('http://swapi.co/api/planets/1/', darthHomeworldReq);
requestHelper('http://swapi.co/api/people/14/', hanNameReq);
requestHelper('http://swapi.co/api/species/1/', hanSpeciesReq);
requestHelper('http://swapi.co/api/films/', filmTitleReq);


