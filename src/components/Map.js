import React, {Component} from 'react';
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import PropTypes from 'prop-types'


class Map extends Component {
	static propTypes = {
		locations: PropTypes.array.isRequired
	}

	render() {
		let {locations} = this.props
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
			console.log('Markers')
			console.log(markers)
		}

		const GoogleMapExample = withGoogleMap(props => (
			<GoogleMap 
				defaultCenter = {{ lat: 27.9158175, lng: 34.3299505 }}
				defaultZoom = {15}
			>
				{
					markers.map( (marker, index) => (
						<Marker key={index} position={{lat: marker.lat, lng: marker.lng}} title={marker.title} />
					))
				}
			</GoogleMap>
			));



		return (
			<div>
				<GoogleMapExample
					containerElement = {<div style={{height: '500px', width: '100%'}}/>}
					mapElement = {<div  style={{ height: '100%'}}/>}
				/>
			</div>
			)
	}
};

export default Map;

