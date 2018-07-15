import React, {Component} from 'react';
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import escapeRegExp from 'escape-string-regexp'
import { Debounce } from 'react-throttle'
import * as MapsDataAPI from '../MapsDataAPI.js'

class Location extends Component {
	static propTypes = {
		location: PropTypes.object.isRequired,
		onClick: PropTypes.func.isRequired,
		onKeyPress: PropTypes.func.isRequired
	}

	state = {
		location: {},
	}

	onItemClick = (event, location, index) => {
		this.props.onClick(event, location, index)
		console.log('[Location.js  location Clicked Item]', location)
	}

	 
	handleKeyPress = (event, location, index) =>{
		this.props.onKeyPress(event, location, index)
		console.log('Location.js location >> ', location )
	}
	render() {
		const{index, location, onClick, onKeyPress} = this.props

		return (
			<li tabIndex= {0} onClick={(event) => this.onItemClick(event, location, {index})}
				onKeyPress={(event) => this.handleKeyPress(event, location, {index})}>
				{location.name}
			</li>
			)
	}
}

export default Location;
