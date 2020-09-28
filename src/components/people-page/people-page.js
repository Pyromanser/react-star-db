import React, {Component} from "react";

import SwapiService from "../../services/swapi-service";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import Row from '../row';
import ErrorIndicator from "../error-indicator";

import "./people-page.css";

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: null,
    hasError: null
  };

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true
    });
  };

  onPersonSelected = (selectedPerson) => {
    this.setState({
      selectedPerson
    });
  };

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator/>;
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}>
        {(i) => (
          `${i.name} (${i.birthYear})`
        )}
      </ItemList>
    );

    const personDetails = (<PersonDetails personId={this.state.selectedPerson}/>);

    return (
      <Row left={itemList} right={personDetails}/>
    );
  };
};
