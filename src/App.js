import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/Map.js';
import SearchPlaces from './components/SearchPlaces.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js'
import * as MapsDataAPI from './MapsDataAPI.js';

class App extends Component {
  state = {
    locations: [],
    originalLocations: [],
    selectedLocation:{},
    newCenter: {lat: 27.915817, lng: 34.3299505},
    isOpen: false,
    defaultCenter : {lat: 27.915817, lng: 34.3299505},
    showInfoIndex: '0'
    //showInfo: '0'
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
      //console.log('[app.js] Enter Key Pressed ', location)
      
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
      //console.log('App.js selectedLocation ', location)
      this.setNewCenter(location)

  }
   handleShowInfo = (indx) => {
    this.setState({
      isOpen : !this.state.isOpen,
      showInfoIndex: indx
    })
  }

  handleMarkerClicked = (event, latlng, indx) => {
    //console.log('latlang ', latlng)
    //console.log('setting index', indx.index)
    this.setState({
      isOpen : !this.state.isOpen,
      showInfoIndex: indx.index,
      newCenter : latlng
    })
    //this.handleShowInfo(indx)
  }

  resetCenter = () => {
    // console.log('resetting center to ' , this.state.defaultCenter)
      this.setState({
        newCenter: this.state.defaultCenter
      })
  }

  handleToggleOpen = (event, latlng) => {
    this.setState({
      isOpen: !this.state.isOpen
    })
    this.resetCenter();
  }
 handleNavMenuToggle = (event) => {
  //Get PlaceList Nav Menu Bar
  let placesNavMenu = document.querySelector("#places-list")
  placesNavMenu.classList.toggle('open')
  event.stopPropagation();
 }
  render() {
    return (
      <div className="main">
      <Header onMenuClick = {this.handleNavMenuToggle}/>
      <div id="main-container">   
         <div id="places-list" className="nav">
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
                onToggleOpen = {this.handleToggleOpen}
                //onShowInfo = {this.handleShowInfo}
                showInfoIndex = {this.state.showInfoIndex}
           />
        </div>   
      </div>
       <Footer />   
      </div>
      
    );
  }
}

export default App;
