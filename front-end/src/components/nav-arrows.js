import React, { Component } from 'react';
import './nav-arrows.css';

class NavArrows extends Component {
  render() {
    return (
      <footer className="nav--wrapper">
        <span className="nav__left-arrow">
          {'<'}
        </span>
        <span className="nav__right-arrow">
          {'>'}
        </span>
      </footer>
    );
  }
}

export default NavArrows;
