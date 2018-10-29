import React from 'react';
import './CategoryMenuItem.css';

function getItemClassNames(checked) {
  return 'menu-item-container' + (checked ? ' menu-item-selected' : '');
}

const CategoryMenuItem = (props) => (
  <div
    onClick={() => props.onSelected(props.categoryName)}
    className={getItemClassNames(props.checked)}
  >
    <span>{props.categoryName}</span>
  </div>
);

export default CategoryMenuItem;
