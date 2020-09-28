import React from 'react';

import ItemDetails, {Record} from '../item-details';

import {SwapiServiceConsumer} from '../swapi-service-context';

const PersonDetails = ({itemId}) => {
  return (
    <SwapiServiceConsumer>
      {
        ({getPerson}) => {
          return (
            <ItemDetails
              itemId={itemId}
              getData={getPerson}>

              <Record field="gender" label="Gender"/>
              <Record field="eyeColor" label="Eye Color"/>
            </ItemDetails>
          );
        }
      }
    </SwapiServiceConsumer>
  );
};

const PlanetDetails = ({itemId}) => {
  return (

    <SwapiServiceConsumer>
      {
        ({getPlanet}) => {
          return (
            <ItemDetails
              itemId={itemId}
              getData={getPlanet}>

              <Record field="population" label="Population"/>
              <Record field="rotationPeriod" label="Rotation Period"/>
              <Record field="diameter" label="Diameter"/>
            </ItemDetails>
          );
        }
      }
    </SwapiServiceConsumer>
  );
};

const StarshipDetails = ({itemId}) => {
  return (

    <SwapiServiceConsumer>
      {
        ({getStarship}) => {
          return (
            <ItemDetails
              itemId={itemId}
              getData={getStarship}>

              <Record field="model" label="Model"/>
              <Record field="length" label="Length"/>
              <Record field="costInCredits" label="Cost"/>
            </ItemDetails>
          );
        }
      }
    </SwapiServiceConsumer>
  );
};

export {
  PersonDetails,
  PlanetDetails,
  StarshipDetails
};
