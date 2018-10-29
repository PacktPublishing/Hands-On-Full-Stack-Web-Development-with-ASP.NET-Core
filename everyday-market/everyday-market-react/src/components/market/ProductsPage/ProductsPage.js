import React from 'react';
import MarketService from '../../../services/marketService';
import {CategoryMenu, ProductList} from '../';
import {Busy} from '../../common';

class ProductsPage extends React.Component {
  state = {
    categories: [],
    products: [],
    busy: false,
  };

  componentDidMount() {
    // this.setState({busy: true}, this.loadCategoriesWhileBusy);
    this.setState({busy: true});
    this.loadCategoriesWhileBusy();
  }

  async loadCategoriesWhileBusy() {
    try {
      const categories = await MarketService.loadCategories();
      this.setState({
        categories,
        busy: false,
      });
    } catch (e) {
      this.setState({busy: false});
      throw e; // consider implementing actual error handling
    }
  }

  onCategoryChanged = (category) => {
    // this.setState({busy: true}, () => this.loadProductsWhileBusy(category));
    this.setState({busy: true});
    this.loadProductsWhileBusy(category);
  }

  async loadProductsWhileBusy(category) {
    try {
      const products = await MarketService.loadProducts(category.name);
      this.setState({
        products,
        busy: false,
      });
    } catch (e) {
      this.setState({busy: false});
      throw e; // consider implementing actual error handling
    }
  }

  render() {
    return (
      <div>
        <CategoryMenu
          categories={this.state.categories}
          onCategoryChanged={this.onCategoryChanged}
        />
        <ProductList products={this.state.products} />
        {this.state.busy && <Busy />}
      </div>
    );
  }
}

export default ProductsPage;
