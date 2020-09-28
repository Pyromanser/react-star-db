import React, {Component} from "react";

import SwapiService from "../../services/swapi-service";
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import Row from '../row';

import "./people-page.css";


const Record = ({item, field, label}) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: null,
  };

  onPersonSelected = (selectedPerson) => {
    this.setState({
      selectedPerson
    });
  };

  render() {

    const {getAllPeople, getPerson} = this.swapiService;

    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={getAllPeople}>
        {(i) => (
          `${i.name} (${i.birthYear})`
        )}
      </ItemList>
    );

    const personDetails = (
      <ItemDetails
        itemId={this.state.selectedPerson}
        getData={getPerson}>
        <Record field="gender" label="Gender"/>
        <Record field="birthYear" label="Birth Year"/>
        <Record field="eyeColor" label="Eye Color"/>
      </ItemDetails>
    );

    return (
      <Row left={itemList} right={personDetails}/>
    );
  };
};
