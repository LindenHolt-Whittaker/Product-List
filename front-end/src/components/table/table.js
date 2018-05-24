import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './table.css';

export default class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const loadingClassName = 
      (this.props.loading) ? 'table--loading' : '';

    return (
      <table className={`table ${loadingClassName}`}>
        <thead>
          <tr>
            <th>Product name</th>
            <th>Product sku</th>
            <th>Product ID</th>
            <th>Advertiser ID</th>
            <th>Advertiser</th>
          </tr>
        </thead>
        <tbody>
          {this.props.products && this.props.products.map( 
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
    );
  }
}

Table.propTypes = {
  products: PropTypes.object,
  loading: PropTypes.bool
};
