/*eslint max-len: ["error", 300]*/
/*eslint no-underscore-dangle: "error"*/
/*eslint object-shorthand: [2, "consistent-as-needed"]*/
import React, { Component } from 'react';


export default class TableRow extends Component {
  constructor(props) {
    super(props);
    const dataCells = props.dataCells.map((item, index) =>
      <th key={index} scope="row">
        <div className="slds-truncate" title={item.label}>{item.label}</div>
      </th>
    )

    this.state = {
      dataCells
    }

  }
  
  render() {
    return (
      <tr onClick={() => this.props.selectTrip(this.props.dataCells)}>
        {this.state.dataCells}
      </tr>
    );
  }
}
