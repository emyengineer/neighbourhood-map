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
    selectedLocation:{},
    newCenter: {lat: 27.915817, lng: 34.3299505}
  }


  componentDidMount() {
    MapsDataAPI.getLocationsAll().then((locations) => {
      // console.log('Locations Array',locations);
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
      console.log('[app.js] Enter Key Pressed ', location)
      
      // this.setState({
      //   selectedLocation: location
      // })
      this.setNewCenter(location)
    }
  }
  setNewCenter = (location) => {
    let newCenter = { lat: 27.9158175, lng: 34.3299505 }
    if(location !== undefined && location.location !== undefined) {
         newCenter = {lat: location.location.lat, lng: location.location.lng}            
    }
   this.setState({
      newCenter: newCenter
   })
  }
  handleLocationItemClick = (event, location) => {
      console.log('App.js selectedLocation ', location)
      this.setNewCenter(location)

  }
  handleMarkerClicked = (event, latlng) => {
    console.log('latlang ', latlng)
    this.setState({
      newCenter : latlng
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
                newCenter = {this.state.newCenter}
                onMarkerClick = {this.handleMarkerClicked}
           />
        </div>      
      </div>
      </div>
      
    );
  }
}

export default App;
