export default class SwapiService {

  _apiBase = 'https://swapi.dev/api';

  _imagePlaceholder = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
  _imageBase = 'https://starwars-visualguide.com/assets/img/';

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }

    return await res.json();
  };

  checkImage = async (id, itemType) => {
    return await fetch(`${this._imageBase}${itemType}/${id}.jpg`, {method: 'HEAD'})
      .then((res) => {
        if (!res.ok) {
          return this._imagePlaceholder;
        } else {
          return res.url;
        }
      }).catch((err) => {
        return this._imagePlaceholder;
      });
  };

  getAllPeople = async () => {
    const res = await this.getResource(`/people/`);
    return await Promise.all(res.results.map(this._transformPerson));
  };

  getPerson = async (id) => {
    const person = await this.getResource(`/people/${id}/`);
    return await this._transformPerson(person);
  };

  getAllPlanets = async () => {
    const res = await this.getResource(`/planets/`);
    return await Promise.all(res.results.map(this._transformPlanet));
  };

  getPlanet = async (id) => {
    const planet = await this.getResource(`/planets/${id}/`);
    return await this._transformPlanet(planet);
  };

  getAllStarships = async () => {
    const res = await this.getResource(`/starships/`);
    return await Promise.all(res.results.map(this._transformStarship));
  };

  getStarship = async (id) => {
    const starship = await this.getResource(`/starships/${id}/`);
    return await this._transformStarship(starship);
  };

  _extractId = (item) => {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  };

  _transformPlanet = async (planet) => {
    const id = this._extractId(planet);

    return await this.checkImage(id, "planets")
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

  _transformPerson = async (person) => {
    const id = this._extractId(person);

    return await this.checkImage(id, "characters")
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

  _transformStarship = async (starship) => {
    const id = this._extractId(starship);

    return await this.checkImage(id, "starships")
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
};