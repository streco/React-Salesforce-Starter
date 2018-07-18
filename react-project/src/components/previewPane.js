/*eslint max-len: ["error", 300]*/
/*eslint no-underscore-dangle: "error"*/
/*eslint object-shorthand: [2, "consistent-as-needed"]*/
import React, { Component } from 'react';
import LineChart from 'react-linechart';
import '../../node_modules/react-linechart/dist/styles.css';
import '../style/main.css'

export default class PreviewPane extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      data: []
    }
  }
  
  componentWillReceiveProps(newProps){
    const formattedMetrics = [];
    if(newProps.metrics){
      
      const metrics = Object.keys(newProps.metrics).map(function (key) { return newProps.metrics[key]; });

      for(let entry of metrics){
        formattedMetrics.push({ x: entry.Start_Date__c, y: entry.expr0 });
      }

      const data = [{
        color: "steelblue",
        points: formattedMetrics,
      }]

      this.setState({ data });
    }
  }
  
  render() {
    return (
      <article className="slds-card">
        <div className="slds-card__header slds-grid">
          <header className="slds-media slds-media_center slds-has-flexi-truncate">
            <div className="slds-media__body">
              <h2 className="slds-card__header-title">
              </h2>
            </div>
          </header>
        </div>
        <div className="slds-card__body slds-card__body_inner">
        <LineChart 
          width={document.body.offsetWidth-40}
          height={400}
          data={this.state.data}
          yLabel='Time'
          xLabel='Date'
          hideXAxis
        />
        </div>
      </article>
    );
  }
}
