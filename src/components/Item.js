import React, { Component } from 'react';
import './Item.css';

class Item extends Component {
  constructor(props) {
    super(props);
  

    
  }

    
    render() {
      return (
      <div className="card">
        <div className="container" onClick={e => this.props.onClick(e, this.props.id )}>
          <span>{this.props.id}</span>
        </div>
      </div>
      );
    }
  }


  export default Item