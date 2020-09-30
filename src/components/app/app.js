import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundary from "../error-boundary";
import {PeoplePage, PlanetsPage, StarshipsPage} from "../pages"

import {SwapiServiceProvider} from '../swapi-service-context';

import './app.css';

export default class App extends Component {

  state = {
    swapiService: new SwapiService()
  };

  onServiceChange = () => {
    this.setState(({swapiService}) => {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      return {
        swapiService: new Service()
      };
    });
  };

  render() {

    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app container">
              <Header onServiceChange={this.onServiceChange}/>

              <RandomPlanet/>

              <Route path="/"
                     exact
                     component={() => <h2>Welcome to StarDB</h2>}/>


              <Route path="/people"
                     exact
                     component={() => <h2>People</h2>}/>
              <Route path="/people" component={PeoplePage}/>
              <Route path="/planets" component={PlanetsPage}/>
              <Route path="/starships" component={StarshipsPage}/>

            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  };
};