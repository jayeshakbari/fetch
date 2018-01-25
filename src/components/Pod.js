import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import SuperSelectField from 'material-ui-superselectfield';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';

 

  

export default class Pod extends Component{
    constructor(){
      super();
      this.state = {
        isFetchingSymbol: true,
        symbolNodes: [],
        selectedSymbol: [],
        pod:[],
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
    
    handleSelection = (values, name) =>{
      
      this.nameChange(values);
      this.setState({ 
        [name]: values
        });
    } 
    handleRemovePod = (idx) => () => {
      this.setState({ pod: this.state.pod.filter((s, sidx) => idx !== sidx),selectedSymbol:this.state.selectedSymbol.filter((s,sidx)=>idx!==sidx) });
    }
    nameChange = (values)=>{
      let l = values.length -1;
      if(l>=0)
      {
        const n = values[l].value;

        if(this.state.pod.map(p => p.name).includes(n))
        { 
          this.setState({ pod: this.state.pod.filter((s, sidx) => l !== sidx)})
        }
        else{
          this.setState({
            pod: this.state.pod.concat([{name:values[l].value,buy:'',sl:'',t1:'',t2:''}])
          })
        }
      }
      else{
        this.setState({ pod:[]})
      }
      
    }
    buyChange = (idx) => (evt) => {
      const newpod = this.state.pod.map((p, sidx) => {
        if (idx !== sidx) return p;
        return { ...p, buy: evt.target.value };
      });
      this.setState({ pod: newpod });
    }

    slChange = (idx) => (evt) => {
      const newpod = this.state.pod.map((p, sidx) => {
        if (idx !== sidx) return p;
        return { ...p, sl: evt.target.value };
      });
      this.setState({ pod: newpod });
    }

    t1Change = (idx) => (evt) => {
      const newpod = this.state.pod.map((p, sidx) => {
        if (idx !== sidx) return p;
        return { ...p, t1: evt.target.value };
      });
      this.setState({ pod: newpod });
    }

    t2Change = (idx) => (evt) => {
      const newpod = this.state.pod.map((p, sidx) => {
        if (idx !== sidx) return p;
        return { ...p, t2: evt.target.value };
      });
      this.setState({ pod: newpod });
    }
  
    handleSubmit = (evt) => {
      const {pod} = this.state;
      console.log(pod.map(p=>p))
      alert(`${pod.length}`);
    }
  
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
        return values.length ? values.map(({ value, label }) => label || value).join(', ') : "Select Symbol"
      } else if (label || value) return label || value
      else return hintText
    }
    
      render () {
        const { selectedSymbol, symbolNodes} = this.state;
        const date = new Date(+new Date() + 86400000);
       
        return (
          <section style={{ margin: 40 }}>
            <div style={{ display: 'flex',justifyContent: 'center'}}>
              <SuperSelectField
              name='selectedSymbol'
              multiple
              checkPosition='left'
              hintText='Loading...'
              selectionsRenderer={(values, hintText) => this.selectionsRenderer(values, hintText, 'states')}
              onSelect={this.handleSelection}
              value={selectedSymbol}
              style={{  width: 300, marginRight: 60  }}
              >
              {symbolNodes}
              </SuperSelectField>
            </div>
            <div style={{  justifyContent: 'center',marginTop:40 }}>
            <div>
              <h1 style={{  justifyContent: 'center',margin:40 }}>
                Submit POD for Date : {date.getDate()}-{date.getMonth()+1}-{date.getFullYear()}  
              </h1>
            </div>
            <div>
              <form  style={{ marginBottom: 40 }} onSubmit={this.handleSubmit}>   
                  
                  {
                    this.state.pod.map((p,idx)=>(
                      <div  style={{ justifyContent: 'left'}}>
                        <TextField style={{marginRight:10}} disabled={true} hintText={p.name} defaultValue={p.name} />
                        <TextField style={{width:50,marginRight:10}} type="text" name={`Buy-${idx + 1}`} floatingLabelText="Buy" floatingLabelFixed="true" hintText={p.buy} defaultValue={p.buy} onChange={this.buyChange(idx)} />
                        <TextField style={{width:50,marginRight:10}} type="text" name={`Sl-${idx + 1}`} floatingLabelText="SL" floatingLabelFixed="true" hintText={p.sl} defaultValue={p.sl} onChange={this.slChange(idx)} />
                        <TextField style={{width:50,marginRight:10}} type="text" name={`Target1-${idx + 1}`} floatingLabelText="Target 1" floatingLabelFixed="true" hintText={p.t1} defaultValue={p.t1} onChange={this.t1Change(idx)} />
                        <TextField style={{width:50,marginRight:10}} type="text" name={`Target2-${idx + 1}`} floatingLabelText="Target 2" floatingLabelFixed="true" hintText={p.t2} defaultValue={p.t2} onChange={this.t2Change(idx)} />
                        <button type="button" onClick={this.handleRemovePod(idx)} className="small">-</button>
                      </div>
                    ))
                  }
                  <RaisedButton label="Submit" type="submit" />
              </form>
            </div>
            </div>
          </section>
        )
      }
    };