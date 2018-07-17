import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CompositeGoogleMap from './CompositeGoogleMap.js'

class Map extends Component {
    	static propTypes = {
    		//locations: PropTypes.array.isRequired
    	}

		state = {
			markers:[],
            center: {}
		}
	 	
	render() {
		let { locations, newCenter, onMarkerClick, onToggleOpen , showInfoIndex , markerIcon, zoom} = this.props

        let onLocationClicked = (event,  markerlocation, indx) => {
            onMarkerClick(event, markerlocation, indx)
        }
        let handleOnToggleOpen = (event, latlng, index) => {
            onToggleOpen(event, latlng, index)
        }
		let locationsHasValue = false
		let markers = []
		if(locations !== undefined && locations !== null && locations.length > 0) locationsHasValue =true
		if(locationsHasValue) {
			let marker = {}
			locations.map((loc) => {
				marker = {	lat: loc.location.lat, 
							lng: loc.location.lng,
							title: loc.name,
							venueId: loc.id
						}
				markers.push(marker) 
			})

		}

		return (
			<div>
				<span id="rg-label" className="hide-label">
		        Google Maps Navigation
		      </span>
				<CompositeGoogleMap markers = {markers} 
                    onMarkerClicked = {onLocationClicked}
                    appCenter = {newCenter}
                    onToggleOpen = {handleOnToggleOpen}
                    showInfoIndex = {showInfoIndex}
                    markerIcon = {markerIcon}
                    zoom = {zoom}
                    />
			</div>
			)
	}
};

export default Map;

