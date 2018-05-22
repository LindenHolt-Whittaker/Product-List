import React, { Component } from 'react';
import './nav-arrows.css';

class NavArrows extends Component {
  onClick(backOrForward) {
    this.props.getProducts(backOrForward);
  }

  render() {
    return (
      <footer className="nav--wrapper">
        <span
          className="nav__arrow"
          onClick={e => this.onClick('left')}
        >
          {'<'}
        </span>
        <span
          className="nav__arrow"
          onClick={e => this.onClick('right')}        
        >
          {'>'}
        </span>
      </footer>
    );
  }
}

export default NavArrows;
