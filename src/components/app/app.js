import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundary from "../error-boundary";
import {StarshipDetails} from "../sw-components";
import {
  PeoplePage,
  PlanetsPage,
  StarshipsPage,
  SecretPage,
  LoginPage
} from "../pages";

import {SwapiServiceProvider} from '../swapi-service-context';

import './app.css';

export default class App extends Component {

  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    });
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
    const {isLoggedIn} = this.state;

    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app container">
              <Header onServiceChange={this.onServiceChange}/>

              <RandomPlanet/>

              <Route path="/"
                     exact
                     render={() => <h2>Welcome to StarDB</h2>}/>


              <Route path="/people"
                     exact
                     render={() => <h2>People</h2>}/>
              <Route path="/people/:id?"
                     component={PeoplePage}/>
              <Route path="/planets" component={PlanetsPage}/>
              <Route path="/starships" exact component={StarshipsPage}/>
              <Route path="/starships/:id"
                     render={({match}) => {
                       const {id} = match.params;
                       return <StarshipDetails itemId={id}/>;
                     }}/>
              <Route path="/login"
                     render={() => (
                       <LoginPage
                         isLoggedIn={isLoggedIn}
                         onLogin={this.onLogin}/>
                     )}/>
              <Route path="/secret"
                     render={() => (
                       <SecretPage isLoggedIn={isLoggedIn}/>
                     )}/>

            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  };
};