import React from 'react';
import Child from './Child';

class Parent extends React.Component {
  state = {
    greet: 'Props and State',
  };

  onUpdate = () => {
    this.setState({
      greet: 'State Updated',
    });
  };

  render() {
    return (
      <div>
        <Child text={this.state.greet} onUpdate={this.onUpdate} />
      </div>
    );
  }
}

export default Parent;
