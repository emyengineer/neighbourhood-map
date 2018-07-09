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

	onItemClick = (event, location) => {
		this.props.onClick(event)
		console.log(location)
	}

	 
	handleKeyPress = (event, location) =>{
		this.props.onKeyPress(event, location)
	}
	render() {
		const{location, onClick, onKeyPress} = this.props

		return (
			<li tabIndex= {0} onClick={(event) => this.onItemClick(event, location)}
				onKeyPress={(event) => this.handleKeyPress(event, location)}>
				{location.name}
			</li>
			)
	}
}

export default Location;
