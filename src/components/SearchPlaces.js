import React, {Component} from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import escapeRegExp from 'escape-string-regexp'
import { Debounce } from 'react-throttle'
import * as MapsDataAPI from '../MapsDataAPI.js'
import Location from './Location.js'
import KeyboardEventHandler from 'react-keyboard-event-handler'

class SearchPlaces extends Component {
	static propTypes = {
		locations: PropTypes.array.isRequired,
		onUserDidSearch: PropTypes.func.isRequired,
		onhandleLocationSelected: PropTypes.func.isRequired
	}

	state = {
		query: '',
		locationsSearchResult: []
	}

	updateQuery = (query) => {
		this.setState({
			query: query
		})
	}

	clearQuery = () => {
		this.state({
			query: ''
		})
	}


	searchLocations = (query) => {
		let filteredLocations
		let locations = this.props.locations
		let locationsHasItems = false 
		let result ={}
		if(locations !== undefined && locations !== null && locations.length > 0) {
			locationsHasItems = true
			locations.sort(sortBy('name'))
		}
		if (query) {
		const match = new RegExp(escapeRegExp(query.trim()), 'i')
		if (locationsHasItems) {
				filteredLocations = locations.filter((location) => match.test((location.name)))
		}	
		} else {
				filteredLocations = locations
		}	

		result = {locationsHasItems: locationsHasItems	, filteredLocations: filteredLocations}
		return result
	}

	handleTextChange = (query, event) => {
		console.log('query is'+ query)
		this.updateQuery(query)
		let result = this.searchLocations(query)
		this.props.onUserDidSearch(result.filteredLocations, query)
		this.setState({locationsSearchResult: result.filteredLocations})
	}


	render() {
		let { locations, onUserDidSearch , onhandleLocationSelected, onItemClick} = this.props
		let{ query, locationsSearchResult } = this.state
		let result = this.searchLocations(query)
		let locationsHasItems = result.locationsHasItems
		let filteredLocations = result.filteredLocations

		let handleKeyPress = (event, location, index) => {
				onhandleLocationSelected(event, location, index)
			}
		let onItemClickHandler = (event, location, index) => {
			onItemClick(event, location, index)
		}

		return  (
			<div>
				<Debounce time="1000" handler="onChange">
					<input	id="search-filter-text" type="text" 
					placeholder="Enter Resort Or Hotel Name"
					onChange = {(event) => this.handleTextChange(event.target.value, event)}/>
				</Debounce>
				<input  id="search-btn"    type="button" value="Search"/>
				<hr/>
				{ (locationsHasItems) && (
					<ul id="locations-list">
						{filteredLocations.map((item, index) => 
							(<Location key = {index} 
								location = {item} 
								index = {index}
								onClick = {onItemClickHandler}
								onKeyPress = {handleKeyPress}>
							</Location>)
						)}
					</ul>
					)				
				}								
			</div>
			)
	}
}

export default SearchPlaces;