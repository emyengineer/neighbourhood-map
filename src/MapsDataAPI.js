const api= 'https://api.foursquare.com/v2'
const proxyurl = "https://sheltered-headland-14246.herokuapp.com/"
// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
export const getLocationsAll = () =>
  fetch(`${api}/venues/search?ll=27.9158175,34.3299505&intent=browse&radius=10000&query=resorts&client_id=ETBUYYTEGDY4WCF1IZXYZJVILWVA5NTLHGQ0WHA13OL2QGA2&client_secret=MJRDFQ43T0FSXPBBFA535VVJVKLUFATMY5IHP2DOFTOKZSYP&v=20180708`)
    .then(handleErrors)
    .then(res => res.json())
    .then(data => data.response.venues)
    //.catch(error => {console.log('Error While getting All Locations data from FourSquare API', error)})

export const getVenueDetails = (venueId)=> {
let venueDetailsUrl =[`/venues/${venueId}?`,
					  `client_id=ETBUYYTEGDY4WCF1IZXYZJVILWVA5NTLHGQ0WHA13OL2QGA2`,
					  `&client_secret=MJRDFQ43T0FSXPBBFA535VVJVKLUFATMY5IHP2DOFTOKZSYP&v=20180708`].join("")

return	fetch(`${api}${venueDetailsUrl}`)
		.then(res => res.json())
		.then(data => data.response.venue)
		//.catch(error => {console.log(`Error while Getting Venue Details `, error)})
}

/***********************Google Maps API*****************************************************/

/* Get Place Name using Google Maps API using Location Lat Lng*/
export const getPlaceIdByGeocoding = (latlng) => {
let geoCodeUrl =[`https://maps.googleapis.com/maps/api/geocode/json?`,
						`latlng=${latlng.lat},${latlng.lng}&language=en&`,
						`KEY=AIzaSyBfB8UMdS7E9dAIHPW3HzKTkkjsMHg2i0I`].join("")

 return	fetch(geoCodeUrl)
		.then(res => res.json())
		.then(data => data)
		.catch(error => {
			console.log(error)
		});
}
/*Get Place Details using Google Maps API using place_id*/
export const getPlaceDetails = (place_id) => {

let placeDetailsUrl = [`https://maps.googleapis.com/maps/api/place/details/json?language=en`,
						`&placeid=${place_id}`,
						`&key=AIzaSyBfB8UMdS7E9dAIHPW3HzKTkkjsMHg2i0I`].join("")

return	fetch(proxyurl + placeDetailsUrl)
		.then(res => res.json())
		.then(data => data.result)
		.catch(error => {
			console.log(error)})
	}

/*Get Place Photo using Photo Reference*/
export const getPlacePhoto = (photo_reference) => {
	let photoReferenceUrl = [`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400`,
							`&photoreference=${photo_reference}`,
							`&key=AIzaSyBfB8UMdS7E9dAIHPW3HzKTkkjsMHg2i0I`].join("")
	return fetch(proxyurl+photoReferenceUrl)
			.then(res => res.blob())
			// .then(blobResponse => {
			// 	 blobResponse
			//  	//console.log(data)
			//  })
			.catch(error => {
				console.log('Error while getting Place Photo', error)
			})
}