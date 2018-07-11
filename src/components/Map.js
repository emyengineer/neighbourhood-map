import React, {Component} from 'react'
/*global google*/
import { compose, withProps, withState, lifecycle, withStateHandlers, withHandlers} from "recompose"
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-fetch'
const FaAnchor = require("react-icons/lib/fa/anchor")

const GoogleMapExample = compose(
    withProps({ 	
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBfB8UMdS7E9dAIHPW3HzKTkkjsMHg2i0I",
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div style={{height: '500px', width: '100%'}} />,
        mapElement: <div style={{ height: '100%' }} />,
    }),
    withState('center', 'onCenterChange', {lat: 27.9158175, lng: 34.3299505}),
    withState('zoom', 'onZoomChange', 15),
    withHandlers(() => {
            const refs = {
              map: undefined,
            }
            return {
              onMapMounted: () => ref => {
                refs.map = ref
              },
              onZoomChanged: ({ onZoomChange }) => () => {
                onZoomChange(refs.map.getZoom())
                alert('Zoom Changed')
              },
              onCenterChanged : ({onCenterChange}) => () => {
                onCenterChange(refs.map.getCenter())
                alert('Center Changed')
              } 
            }
  }),
    lifecycle({
        componentDidMount() {
          console.log('props Markers', this.props.markers)
        },
    }),
    withStateHandlers(() => ({
	 	isOpen: false,
	 	showInfo: '0',
        zoom: 12,
        center: { lat: 27.915817, lng: 34.3299505 }
	  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      	isOpen: !isOpen,
      }),
    showInfo: ({showInfo, isOpen}) => (a) => ({
    	isOpen: !isOpen,
    	showInfoIndex: a
   	 }),
    changeCenter:({center}) => (newCenter) => ({
        center: newCenter
     }),
    resetCenter: ({center}) => (defaultCenter) => ({
        center: defaultCenter
     })
  	}),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap 
    	//ref ={props.zoomToMarkers}
       // defaultCenter = {{ lat: 27.9158175, lng: 34.3299505 }}
    	zoom = {props.zoom} 
    	center = {props.center}
        mapTypeId = 'hybrid'//terrain 'satellite' roadmap hybrid
        ref = {props.onMapMounted}
        onZoomChanged = {props.onZoomChanged}
        onCenterChanged = {props.onCenterChanged}
    >
        {  
            props.markers.map((marker, index) => (

			<Marker key={index}   position = {{lat: marker.lat, lng: marker.lng}} 
			                      title = {marker.title} 
                                  onClick = {() => {props.showInfo(index) 
                                            props.changeCenter({lat: marker.lat, lng: marker.lng} )}  
                                        }
                                  animation = {google.maps.Animation.DROP } //CUSTOM_FADE BOUNCE
            >
				{ ( props.isOpen && props.showInfoIndex == index) && 
                    <InfoWindow  onCloseClick = {() => {    props.onToggleOpen 
                                                            props.resetCenter({ lat: 27.915817, lng: 34.3299505 })
                                                        } 
                                                }
                    >
					   <div> tt {marker.title } </div>
				    </InfoWindow>}
			</Marker>
		))}
    </GoogleMap>

);




class Map extends Component {
	static propTypes = {
		locations: PropTypes.array.isRequired
	}
		state = {
			markers:[],
            center: {}
		}
	 	
        updateCenter = (latlng) => {
            this.setState({
                center: latlng
            })
        }
    // /*
    // componentDidMount() {
    // 	// might be used to fetch data from foursqaure and set markers
    // }*/

	render() {
		let { locations, selectedLocation } = this.props
        console.log('selectedLocation', selectedLocation)
        let newCenter
        if(selectedLocation !== undefined && selectedLocation.location !== undefined) {
             newCenter = {lat: selectedLocation.location.lat, lng: selectedLocation.location.lng}
    		//this.updateCenter(newCenter)
            
        }
        //let { } TO DO Read values from this.State
		let locationsHasValue = false
		let markers = []
		if(locations !== undefined && locations !== null && locations.length > 0) locationsHasValue =true
		if(locationsHasValue) {
			let marker = {}
			locations.map((loc) => {
				marker = {	lat: loc.location.lat, 
							lng: loc.location.lng,
							title: loc.name
						}
				markers.push(marker) 
			})
			console.log('[Map.js]  Markers ', markers)

		}

		return (
			<div>
				<GoogleMapExample markers= {markers}  center={newCenter}/>
			</div>
			)
	}
};

export default Map;

