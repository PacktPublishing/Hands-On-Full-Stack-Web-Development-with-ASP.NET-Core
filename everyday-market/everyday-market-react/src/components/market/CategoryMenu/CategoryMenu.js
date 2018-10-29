import React from 'react';
import './CategoryMenu.css';
import {CategoryMenuItem} from '../';

class CategoryMenu extends React.Component {
  state = {
    selectedCategoryName: null,
  };

  onCategorySelected = (categoryName) => {
    const cat = this.props.categories.find(c => c.name === categoryName);
    
    this.props.onCategoryChanged(cat);

    this.setState({selectedCategoryName: cat.name});
  };

  render() {
    return (
      <ul id="cat-menu">
        {this.props.categories.map(c => (
          <li key={c.name}>
            <CategoryMenuItem
              categoryName={c.name}
              checked={c.name === this.state.selectedCategoryName}
              onSelected={this.onCategorySelected}
            />
          </li>
        ))}
      </ul>
    );
  }
} 

export default CategoryMenu;
