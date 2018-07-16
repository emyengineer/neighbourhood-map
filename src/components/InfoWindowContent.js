import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as MapsDataAPI from '../MapsDataAPI.js';
import ImageViewer from './ImageViewer.js'

class InfoWindowContent extends Component {
	static propTypes = {
	}
	state = {
		imageSrc: {},	
		venueDetails: {},
		detailsString: ''
	}
	componentWillMount() {
		let img
		let constructString
		MapsDataAPI.getVenueDetails(this.props.venueId).then(data => {
		console.log('Venue Details ', data)
		if(data !== undefined && data !== null) {
		const bestPhoto =  data.bestPhoto
		if(bestPhoto !== undefined && bestPhoto !== null) {
			img =`${bestPhoto.prefix}${bestPhoto.width}x${bestPhoto.height}${bestPhoto.suffix}`
		} else {
			img = process.env.PUBLIC_URL+'/no-photo-available.jpg'
		}
		//console.log('img  ', img)
		let isOpen = ((data.hours !== undefined && data.hours.isopen))? 'Working Hours: '+ data.hours.isopen : 'Un available working hours'
		let address = ((data.Location !== undefined && data.location.address )? 'Location : '+ data.location.address : '')
		let phone = ((data.contact !== undefined && data.contact.phone) ? 'Phone: '+ data.contact.phone : '' )
		let likes =  ((data.likes !== undefined && data.likes.count) ? 'Likes :' + data.likes.count : '')
		let rating =  (data.rating !== undefined ? 'Rating :'+data.rating : '' )
		constructString =`${phone}   ${address} 
						  ${likes}  
						  ${rating} ${isOpen} Time Zone: ${data.timeZone}`

		}
			//let imageSrc = URL.createObjectURL(img)
		this.setState({
			venueDetails : data,
			imageSrc: img,
			detailsString: constructString
		})		
		})
	}
	componentDidMount() {
		 
	} 
	
	setImageSrc =(placeData) => {
		/* this code should be uncommented and put inside componentWillMount() Event
			or componentDidMount if we are getting data from Google Places API
			this.setState({
			picsArray : []
		})
		console.log('[componentWillMount InfoWindowContent ] latlng ', this.props.latlng)
		const latlng = this.props.latlng
		MapsDataAPI.getPlaceIdByGeocoding(latlng).then((placeData) => {
			console.log(`[Place Data for latlng => ${latlng} ]`, placeData)
			this.setImageSrc(placeData)
					
		})
	
		*/
		//this.state.images = placeData
		let imageSrc = {}
		let pictures =[]
		if(	placeData !==null &&
		 	placeData !==undefined &&
		 	placeData.results !== undefined && placeData.results.length > 0) {
			placeData.results.map(result => {

				MapsDataAPI.getPlaceDetails(result.place_id).then((data) => {
				console.log('[render getPlaceDetails ] ',  data)
						if( data.photos !== undefined &&
							data.photos !== null && data.photos.length > 0) {
							data.photos.map(photoRef => {
								MapsDataAPI.getPlacePhoto(photoRef.photo_reference).
								then((data) => {
									//console.log('[Photos Data] ',data)
									imageSrc = URL.createObjectURL(data) 
									//this.state.picsArray.push(imageSrc)
									 //console.log('Image Source ', imageSrc)
									 pictures.push(imageSrc)
									 this.setState({	picsArray: pictures})
								})
							})							
					}
				}).catch(error => {
					console.log('Error while getting Place Details', error)
				})	
			})
			console.log(pictures)
			
			
		}
	}

	render() {
		const {title, latlng, venueId} = this.props

		return (
			<div className="picture-Style" tabIndex = {0} aria-label="Info window">
				<div tabIndex = {0}> ' '+{title }	</div>	
				{ 
					(this.state.imageSrc !== undefined && this.state.imageSrc !== null) && (
					<ul id="images-list" tabIndex = {0}>					
							<ImageViewer  imageSrc = {this.state.imageSrc} 
							 detailsData = {this.state.detailsString} >
							</ImageViewer>
						
					</ul>
					)				
				}
			</div>
			)
	}
}

export default InfoWindowContent