import React, { Component } from 'react';
import Table from './components/table/table';
import NavArrows from './components/nav-arrows/nav-arrows';

import './App.css';

let productRangeStart = 0;
const productRange = 30;

class App extends Component {
  state = {
    products: [],
    loading: true
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts(backOrForward = null) {
    switch(backOrForward) {
    case 'left':
      if(productRangeStart - productRange >= 0) {
        productRangeStart -= productRange;
        break;
      } else {
        return;
      }
    case 'right':
      productRangeStart += productRange;
      break;
    default:
      break;
    }

    this.setState({ loading: true });

    this.getProductsAPI()
      .then(res => {this.setState({
        products: res,
        loading: false
      })})
      .catch(err => console.log(err));
  }

  getProductsAPI = async () => {
    const response = await fetch(`/api/products?from=${productRangeStart}&to=${productRangeStart + productRange}`);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };
  
  render() {
    const tableLoadingClassName =
      (this.state.loading) ? 'table-container--loading' : '';

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Browse products</h1>
        </header>

        <div className="table-container">
          <Table
            products={this.state.products}
            loading={this.state.loading}
          />
        </div>
  
        <NavArrows
          getProducts={e => this.getProducts(e)}
        />
      </div>
    );
  }
}

export default App;
