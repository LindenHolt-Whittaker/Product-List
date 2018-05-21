import React, { Component } from 'react';
import logo from './logo.svg';
import NavArrows from './components/nav-arrows';
import './App.css';

const productRangeStart = 0;
const productRangeEnd = 50;

class App extends Component {
  state = {
    products: []
  };

  componentDidMount() {
    this.callApi()
      .then(res => { console.log(res); this.setState({ products: res })})
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch(`/api/products?from=${productRangeStart}&to=${productRangeEnd}`);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {this.state.products && this.state.products.map( 
          product => <div>{product.product_name}</div>
        )}
        <NavArrows />
      </div>
    );
  }
}

export default App;
