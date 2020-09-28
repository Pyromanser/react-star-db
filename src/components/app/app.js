import React, {Component} from 'react';

import SwapiService from "../../services/swapi-service";
import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from "../people-page";
import ErrorButton from "../error-button";
import ErrorIndicator from "../error-indicator";

import './app.css';

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false,
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      };
    });
  };

  componentDidCatch(error, errorInfo) {
    this.setState({hasError: true});
  };

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator/>;
    }

    const randomPlanet = this.state.showRandomPlanet ? <RandomPlanet/> : null;

    return (
      <div className="stardb-app container">
        <Header/>
        {randomPlanet}

        <div className="row mb2 button-row">
          <button
            className="toggle-planet btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}>
            Toggle Random Planet
          </button>
          <ErrorButton/>
        </div>

        <PeoplePage/>

      </div>
    );
  };
};