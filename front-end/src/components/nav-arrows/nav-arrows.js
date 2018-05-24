import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './nav-arrows.css';

export default class NavArrows extends Component {
  constructor(props) {
    super(props);
  }

  onClick(backOrForward) {
    this.props.getProducts(backOrForward);
  }

  render() {
    return (
      <div className="nav--wrapper">
        <span
          className="nav__arrow left"
          onClick={e => this.onClick('left')}
        >
          {'<'}
        </span>
        <span
          className="nav__arrow right"
          onClick={e => this.onClick('right')}        
        >
          {'>'}
        </span>
      </div>
    );
  }
}

NavArrows.propTypes = {
  getProducts: PropTypes.func
};
