import React, { Component } from 'react';
import logo from './logo.svg';
import NavArrows from './components/nav-arrows';
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

        <div className={`table-container ${tableLoadingClassName}`}>
          <table>
            <thead>
              <th>product_name</th>
              <th>product_sku</th>
              <th>product_id</th>
              <th>advertiser_id</th>
              <th>advertiser</th>
            </thead>
            <tbody>
              {this.state.products && this.state.products.map( 
                product => {
                  return(
                    <tr key={product.product_id}>
                      <td>{product.product_name}</td>
                      <td>{product.product_sku}</td>
                      <td>{product.product_id}</td>
                      <td>{product.advertiser_id}</td>
                      <td>{product.advertiser}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
  
        <NavArrows
          getProducts={e => this.getProducts(e)}
        />
      </div>
    );
  }
}

export default App;
