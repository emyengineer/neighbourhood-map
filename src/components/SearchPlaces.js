import React, {Component} from 'react';
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import escapeRegExp from 'escape-string-regexp'
import { Debounce } from 'react-throttle'

class SearchPlaces extends Component {
	static propTypes = {
		locations: PropTypes.array.isRequired
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
		if(locations !== undefined && locations !== null && locations.length > 0) {
			locationsHasItems = true
		}
		if(query) {
		const match = new RegExp(escapeRegExp(query.trim()), 'i')
		if(locationsHasItems) {
			filteredLocations = locations.filter((location) => match.test((location.name)) )
		}

	} else {
		filteredLocations = locations
	}
		this.setState({locationsSearchResult: filteredLocations})
	}
	handleTextChange = (query, event) => {
		console.log('query is'+ query)
		this.updateQuery(query)
		this.searchLocations(query)
	}



	render() {
		let { locations } = this.props
		let{ query, locationsSearchResult } = this.state
		let locationsHasItems = false 

		

		if(locations !== undefined && locations !== null && locations.length > 0) {
			locationsHasItems = true
			locations.sort(sortBy('name'))
		}
		
		let filteredLocations
	if(query) {
		if(locationsSearchResult !== undefined && locations !== null && locations.length > 0) {
			console.log('locationsSearchResult '+ locationsSearchResult.length)
			locations = locationsSearchResult
		}
		const match = new RegExp(escapeRegExp(query.trim()), 'i')
		if(locationsHasItems) {
			filteredLocations = locations.filter((location) => (location.name))
		}

	} else {
		filteredLocations = locations
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
					<ol id="locations-list">
						{filteredLocations.map((item, index) => (<li key={index}> {item.name} </li>))}
					</ol>
					)
					
				}	
							
			</div>
			)
	}
}

export default SearchPlaces;