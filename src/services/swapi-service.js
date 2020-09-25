export default class SwapiService {

  _apiBase = 'https://swapi.dev/api';

  _imagePlaceholder = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
  _imageBase = 'https://starwars-visualguide.com/assets/img/';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }

    return await res.json();
  };

  async checkImage(id, type) {
    return await fetch(`${this._imageBase}${type}/${id}.jpg`, {method: 'HEAD'})
      .then((res) => {
        if (!res.ok) {
          return this._imagePlaceholder;
        } else {
          return res.url;
        }
      }).catch((err) => {
        return this._imagePlaceholder;
      });
  }

  async getAllPeople() {
    const res = await this.getResource(`/people/`);
    return res.results.map(this._transformPerson);
  };

  async getPerson(id) {
    const person = await this.getResource(`/people/${id}/`);
    return this._transformPerson(person);
  };

  async getAllPlanets() {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this._transformPlanet);
  };

  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet)
  };

  async getAllStarships() {
    const res = await this.getResource(`/starships/`);
    return res.results.map(this._transformStarship);
  };

  async getStarship(id) {
    const starship = await this.getResource(`/starships/${id}/`);
    return this._transformStarship(starship);
  };

  _extractId(item) {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  };

  _transformPlanet(planet) {
    const id = this._extractId(planet);

    return this.checkImage(id, "planets")
      .then((imageUrl) => {
        return {
          id,
          imageUrl,
          name: planet.name,
          population: planet.population,
          rotationPeriod: planet.rotation_period,
          diameter: planet.diameter
        };
      });
  };

  _transformPerson(person) {
    const id = this._extractId(person);

    return this.checkImage(id, "characters")
      .then((imageUrl) => {
        return {
          id,
          imageUrl,
          name: person.name,
          gender: person.gender,
          birthYear: person.birth_year,
          eyeColor: person.eye_color
        };
      });
  };

  _transformStarship(starship) {
    const id = this._extractId(starship);

    return this.checkImage(id, "starships")
      .then((imageUrl) => {
        return {
          id,
          imageUrl,
          name: starship.name,
          model: starship.model,
          manufacturer: starship.manufacturer,
          costInCredits: starship.cost_in_credits,
          length: starship.length,
          crew: starship.crew,
          passengers: starship.passengers,
          cargoCapacity: starship.cargo_capacity
        };
      });
  };
}