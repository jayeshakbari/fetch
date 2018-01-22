import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import SuperSelectField from 'material-ui-superselectfield';

const displayState = (state) =>
  state && state.length ? [...state].map(({ value, label }) => label || value).join(', ') : 'empty state'

export default class Pod extends Component{
    constructor(){
      super();
      this.state = {
        isFetchingSymbol: true,
        symbolNodes: [],
        selectedSymbol: [],
      };

    }
      

      componentDidMount = () => {
        this.fetchData();
        this.setState({ isFetchingSymbol: true })
        
        // Ideally should be externalized in a HoC,
        // with stateNodes && countyNodes in props
        window.setTimeout(() => {
          this.setState({isFetchingSymbol: false })
          console.log('States updated') // eslint-disable-line no-console
        }, 3000) // simulates a 5secs fetch delay
      }
      fetchData(){
       const url='https://gurudevinformatics.com/fetch/smList.php';
      fetch(url)
      .then(res => res.json())
      .then(da => {
        let results = da.map((r) => {
          return(
            <div key={r.code} value={r.name}>
            {r.name}
            </div>
          )
        })
        this.setState({symbolNodes:results});
      })
      .catch((error) => {
      console.error(error);
      })
    };

      handleSelection = (values, name) => this.setState({ [name]: values })

    
      selectionsRenderer = (values, hintText, name) => {
        const { isFetchingSymbol} = this.state
    
        switch (name) {
          case 'states':
            if (isFetchingSymbol) {
              return (
                <div>
                  <CircularProgress size={20} style={{ marginRight: 10 }} />
                  {hintText}
                </div>
              )
            }
            break
          default:
        }
    
        if (!values) return hintText
        const { value, label } = values
        if (Array.isArray(values)) {
          return values.length ? values.map(({ value, label }) => label || value).join(', ') : hintText
        } else if (label || value) return label || value
        else return hintText
      }
    
      render () {
        const { selectedSymbol, symbolNodes} = this.state
    
        return (
          <section style={{ margin: 40 }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <fieldset style={{ marginBottom: 40 }}>
                <legend>Selected values</legend>
                <div>State 24: {displayState(selectedSymbol)}</div>
            </fieldset>
            <div style={{ display: 'flex' }}>
                <SuperSelectField
                name='selectedSymbol'
                multiple
                checkPosition='left'
                hintText='Multiple Symbol'
                selectionsRenderer={(values, hintText) => this.selectionsRenderer(values, hintText, 'states')}
                onSelect={this.handleSelection}
                value={selectedSymbol}
                style={{  width: 300, marginRight: 60  }}
                >
                {symbolNodes}
                </SuperSelectField>
            </div>

            </div>
          </section>
        )
      }
    };