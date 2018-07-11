import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/Map.js';
import SearchPlaces from './components/SearchPlaces.js';
import * as MapsDataAPI from './MapsDataAPI.js';

class App extends Component {
  state = {
    locations: [],
    originalLocations: [],
    selectedLocation: {}
  }


  componentDidMount() {
    MapsDataAPI.getLocationsAll().then((locations) => {
      console.log('Locations Array',locations);
      this.setState({locations})
      this.setState({originalLocations: locations})
    })
  }

  updateLocations = (searchResultArr, query) => {
    if(query) {
      this.setState((state) => ({
        locations: searchResultArr
      }))
    }else {
      this.setState({locations: this.state.originalLocations})
    }
  }

  handleLocationSelected = (event, location) => {
    if(event.key === 'Enter'){
      console.log('[app.js] Enter Key Pressed')
      console.log(location)
      this.setState({
        selectedLocation: location
      })
    }
  }
  handleLocationItemClick = (event, location) => {
    let origColor = event.currentTarget.style.backgroundColor
    if(origColor !== '#ccc') {
      console.log(event.currentTarget)
        event.currentTarget.style.backgroundColor = '#ccc'
      } else {
        event.currentTarget.style.backgroundColor = origColor
      }
      console.log('App.js selectedLocation ', location)
      this.setState({
        selectedLocation: location 
      })
  }

  render() {
    return (
      <div className="main">
      <header className="App-header">
          
      </header>
      <div id="main-container">   
         <div id="places-list">
          <SearchPlaces locations= {this.state.locations} 
            onUserDidSearch= {this.updateLocations}
            onhandleLocationSelected = {this.handleLocationSelected}
            onItemClick = {this.handleLocationItemClick}
          />
        </div>
        <div id="map-container">
          <Map  locations= {this.state.locations} 
                selectedLocation = {this.state.selectedLocation}
           />
        </div>      
      </div>
      </div>
      
    );
  }
}

export default App;
