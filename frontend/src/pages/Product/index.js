import React from 'react';
import T from 'i18n-react';

const Product = (props) => {
    return (
        <div className="container-fluid product" id="product">
          <h3 className="page-title"><T.span text="product.product" /></h3>
          <div className="product-container">
            <h1>Product page</h1>
          </div>
        </div>
    )
};

export default Product;