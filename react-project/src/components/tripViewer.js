/*eslint max-len: ["error", 300]*/
/*eslint no-underscore-dangle: "error"*/
/*eslint object-shorthand: [2, "consistent-as-needed"]*/
import React, { Component } from 'react';
import Axios from 'axios';
import _ from 'lodash';
import TableRow from './tableRow';
import PreviewPane from './previewPane';
import '../style/main.css'


export default class TripViewer extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      columnHeaders: [],
      columns:[],
      tableRows: [],
      formattedColumns: [],
      showPreview: false
    }

    this._selectTrip = this._selectTrip.bind(this);
  }

  componentDidMount() {
    this._initialize();
  }

  _initialize(){
    const that = this;
    Visualforce.remoting.Manager.invokeAction('EmbarcaderoTripController.getConfig', function (result, event) {
      if (event.status) {
        console.log(event.result);
        that._findReport(event.result.baseUrl, event.result.sessionId)
      } else if (event.type === 'exception') {
        console.log(event);
      }
      else {
        console.log(event);
      }
    });
  }

  _findReport(baseUrl, sessionId){
    const that = this;
    Axios.get(baseUrl + '/services/data/v43.0/analytics/reports', {
      headers: {
        authorization: `Bearer ${sessionId}`,
        'accept-language': 'en_US'
      },
    })
    .then(response => {
      console.log(response);
      for(let report of response.data){
        if(report.name === 'Trip View'){
          that._getReportData(baseUrl, sessionId, report.url);
        }
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  _getReportData(baseUrl, sessionId, reportUrl){
    const that = this;
    Axios.get(baseUrl + reportUrl, {
      headers: {
        authorization: `Bearer ${sessionId}`,
        'accept-language': 'en_US'
      },
    })
    .then(response => {
      console.log(response);
      that._renderHeaders(response.data.reportExtendedMetadata.detailColumnInfo);
      that._renderRows(response.data.factMap[Object.keys(response.data.factMap)[0]].rows);
      this.setState({
        baseUrl,
        sessionId,
        reportUrl
      })
    })
    .catch(error => {
      console.log(error);
    });
  }

  _renderHeaders(columns){
    const formattedColumns = Object.keys(columns).map(function (key) { return columns[key]; });
    const columnHeaders = formattedColumns.map((item, index) =>
      <th key={index} scope="col">
        <div className="slds-truncate" title={item.label}>{item.label}</div>
      </th>
    );
    this.setState({ columnHeaders, formattedColumns});
  }

  _renderRows(rows){
    const formattedRows = Object.keys(rows).map(function (key) { return rows[key]; });
    const tableRows = formattedRows.map((item, index) =>
      <TableRow key={index} rows={this.props.rows} dataCells={item.dataCells} selectTrip={this._selectTrip} />
    );
    this.setState({ tableRows });
  }

  _selectTrip(data){
    this.setState({ showPreview: true });
    const that = this;
    console.log(data);
    console.log(this.state.formattedColumns);

    const index = _.findIndex(this.state.formattedColumns, function(o) { return o.label == 'Bike ID'; });

    Visualforce.remoting.Manager.invokeAction('EmbarcaderoTripController.getAggregatedBikeMetrics', data[index].value, function (result, event) {
      if (event.status) {
        console.log(event.result);
        that.setState({ selectedBike: data[index].value, metrics: event.result })
      } else if (event.type === 'exception') {
        console.log(event);
      }
      else {
        console.log(event);
      }
    });

  }

  _closePreview(){
    this.setState({ showPreview: false });
  }


  render() {
    return (
      <div >
        {this.state.showPreview &&
          <PreviewPane bikeId={this.state.selectedBike} metrics={this.state.metrics} />
        }
        <div className="slds-text-body_regular">Showing {this.state.tableRows.length} Records</div>
        <table style={{ marginTop: 10 }} className="slds-table slds-table_bordered slds-table_cell-buffer">
          <thead>
            <tr onClick={() => this._closePreview()} >
              {this.state.columnHeaders}
            </tr>
          </thead>
          <tbody>
            {this.state.tableRows}
          </tbody>
        </table>
      </div>
    );
  }
}
