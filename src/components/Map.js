import React, {Component} from 'react'
import PropTypes from 'prop-types'
import GoogleMapExample from './GoogleMapExample.js'

class Map extends Component {
    	static propTypes = {
    		locations: PropTypes.array.isRequired
    	}

		state = {
			markers:[],
            center: {}
		}
	 	
	render() {
		let { locations, newCenter, onMarkerClick, onToggleOpen , showInfoIndex } = this.props
        //console.log('[Map locations ]', locations)
        //console.log('[Map] new Center value', newCenter)
        //console.log('Map showInfoIndex ' ,showInfoIndex)
        let onLocationClicked = (event,  markerlocation, indx) => {
            onMarkerClick(event, markerlocation, indx)
        }
        let handleOnToggleOpen = (event, latlng) => {
            onToggleOpen(event, latlng)
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
							title: loc.name,
							venueId: loc.id
						}
				markers.push(marker) 
			})
			//console.log('[Map.js]  Markers ', markers)

		}

		return (
			<div>
				<GoogleMapExample markers = {markers} 
                    onMarkerClicked = {onLocationClicked}
                    appCenter = {newCenter}
                    onToggleOpen = {handleOnToggleOpen}
                    //onShowInfo = {onShowInfo}
                    showInfoIndex = {showInfoIndex}
                    />
			</div>
			)
	}
};

export default Map;

