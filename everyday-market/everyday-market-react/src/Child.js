import React from 'react';

class Child extends React.Component {
  static defaultProps = {
    greet: 'Default text',
    onUpdate: () => {}, // do nothing
  };

  render() {
    return (
      <div>
        <span>Hello {this.props.greet}</span>
        <button onClick={this.props.onUpdate}></button>
      </div>
    );
  }
}

export default Child;
