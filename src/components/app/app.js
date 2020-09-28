import React, {Component} from 'react';

import SwapiService from "../../services/swapi-service";

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundary from "../error-boundary";

import {SwapiServiceProvider} from '../swapi-service-context';

import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList
} from '../sw-components';

import './app.css';

export default class App extends Component {

  swapiService = new SwapiService();

  render() {

    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.swapiService}>
          <div className="stardb-app container">
            <Header/>
            <RandomPlanet/>

            <PersonDetails itemId={11}/>

            <PlanetDetails itemId={5}/>

            <StarshipDetails itemId={9}/>

            <PersonList/>

            <StarshipList/>

            <PlanetList/>

          </div>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  };
};