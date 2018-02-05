import React, { Component } from 'react';
import Card from 'material-ui/Card';
import Pagination from './Pagination';
import RowApi from './RowApi';
import PropTypes from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Toggle from 'material-ui/Toggle';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


const styles = {
container: {
  },
};

export default class History extends Component{
  constructor(props, context) {
    super(props, context);
    injectTapEventPlugin();
    this.state = {
      rows:[],
      rowsPerPage: [5,10,15],
      numberOfRows: 5,
      page: 1,
      total: undefined,
      s:'true',
    };
    this.updateRows = this.updateRows.bind(this);
    
  }
  componentDidMount() {
    RowApi.getRows(this.state)
    .then((updatedState) => {
      this.setState(updatedState);
    });
  }
  handleToggle = (idx,target_r) => () => {
    let p=[{'id':idx,'ta':target_r}];
    console.log(p)
    let ta= JSON.stringify(p);
    fetch('http://localhost:81/fetch/tA.php', {
      method: 'POST',
      headers: { "Content-type": "application/x-www-form-urlencoded"},
      body: ta
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log("Fetch error: " + err));
  console.log(idx);
  }
  updateRows(state){
    RowApi.getRows(state)
    .then((updatedState) => {
      this.setState(updatedState);
    });
  }
  render() {
    let tr;
    return (
      <div style={styles.container}>
        <Card style={{margin: 12}}>
          <Table
            height='auto'
            fixedHeader='true'
            fixedFooter='true'
          >
            <TableHeader>
              <TableRow>
                <TableHeaderColumn colSpan="8" tooltip="History POD data" style={{textAlign: 'center'}}>
                  <h1>History of POD</h1>
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
                <TableHeaderColumn tooltip="Target 1">Target 1</TableHeaderColumn>
                <TableHeaderColumn tooltip="Target 2">Target 2</TableHeaderColumn>
                <TableHeaderColumn tooltip="Buy/Sell -">Buy/Sell</TableHeaderColumn>
                <TableHeaderColumn tooltip="Stop Loss -">SL</TableHeaderColumn>
                <TableHeaderColumn tooltip="Link">Link</TableHeaderColumn>
                <TableHeaderColumn tooltip="Date & Time">Date & Time</TableHeaderColumn>
                <TableHeaderColumn tooltip="Target Achived">TA</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              showRowHover='true'
              stripedRows='true'
            >
              {this.state.rows.map( (row, index) => (
                <TableRow key={index}>
                  <TableRowColumn>{row.sy_name}</TableRowColumn>
                  <TableRowColumn>{row.t1}</TableRowColumn>
                  <TableRowColumn>{row.t2}</TableRowColumn>
                  {(row.buy)?<TableRowColumn>Buy@{row.buy}</TableRowColumn>:<TableRowColumn>Sell@{row.sell}</TableRowColumn>}  
                  <TableRowColumn>{row.SL}</TableRowColumn>
                  <TableRowColumn>{row.Time}</TableRowColumn>
                  <TableRowColumn>{(row.link=='')?`Empty`:row.link}</TableRowColumn>
                  {
                  (row.target_r =='0')?
                    <TableRowColumn>
                      <Toggle 
                        name="Target Achieved"
                        onToggle={this.handleToggle(row.id,row.target_r)}
                        defaultToggled={false} />
                    </TableRowColumn> 
                    :
                    <TableRowColumn>
                      <Toggle 
                        name="Target Achieved"
                        onToggle={this.handleToggle(row.id,row.target_r)}
                        defaultToggled={true} />
                    </TableRowColumn>
                  }
                  
                </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <Pagination
                    total={this.state.total}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    numberOfRows={this.state.numberOfRows}
                    updateRows={this.updateRows}
                  />
            </TableFooter>
          </Table>
        </Card>
      </div>
    );
  }
}