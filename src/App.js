import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Pod from './components/Pod'; 
import History from './components/History';
//import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
//import getMuiTheme from 'material-ui/styles/getMuiTheme';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }
  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };
 
  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
         
          <Paper>
          <Tabs
              onChange={this.handleChange}
              value={this.state.slideIndex}
              >
                <Tab label="Select sybmol and send" value={0} />
                <Tab label="History Pod" value={1} />
              </Tabs>
              <SwipeableViews
                index={this.state.slideIndex}
                onChangeIndex={this.handleChange}
              >
               <Pod />
               <History />
              </SwipeableViews>
            </Paper>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
