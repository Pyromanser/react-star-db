import React, {Component} from 'react';

import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import ErrorButton from "../error-button";
import ErrorBoundary from "../error-boundary";

import './item-details.css';

export default class ItemDetails extends Component {

  state = {
    item: null,
    loading: true,
    error: false
  };

  componentDidMount() {
    this.updateItem();
  };

  onItemLoaded = (item) => {
    this.setState({
      item,
      loading: false,
      error: false
    });
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  };

  updateItem() {

    const {itemId, getData} = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId)
      .then(this.onItemLoaded)
      .catch(this.onError);
  };


  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.itemId !== prevProps.itemId) {

      this.setState({
        item: {},
        loading: true
      });

      this.updateItem();
    }
  };

  render() {

    const {item, loading, error} = this.state;

    if (!item) {
      return (
        <div className="item-details card">
          <span>Select a item from a list</span>
        </div>
      );
    }

    const hasData = !(loading || error);
    const errorMessage = error ? <ErrorIndicator/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = hasData ? (<ItemView item={item}>
      {this.props.children}
    </ItemView>) : null;

    return (
      <div className="item-details card">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  };
};

const ItemView = ({item, children}) => {
  const {imageUrl, name} = item;

  return (
    <ErrorBoundary>
      <img className="item-image"
           src={imageUrl}
           alt={name}/>

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {
            React.Children.map(children, (child) => {
              return React.cloneElement(child, {item});
            })
          }
        </ul>
        <ErrorButton/>
      </div>
    </ErrorBoundary>
  );
};
