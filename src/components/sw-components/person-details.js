import React from 'react';

import ItemDetails, {Record} from '../item-details';
import {withSwapiService} from "../hoc-helpers";

const PersonDetails = ({itemId, swapiService}) => {
  return (
    <ItemDetails
      itemId={itemId}
      getData={swapiService.getPerson}>

      <Record field="gender" label="Gender"/>
      <Record field="eyeColor" label="Eye Color"/>
    </ItemDetails>
  );
};

export default withSwapiService(PersonDetails);
