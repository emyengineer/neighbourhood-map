const api= 'https://api.foursquare.com/v2'

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getLocationsAll = () =>
  fetch(`${api}/venues/search?ll=27.9158175,34.3299505&intent=browse&radius=10000&query=resorts&client_id=ETBUYYTEGDY4WCF1IZXYZJVILWVA5NTLHGQ0WHA13OL2QGA2&client_secret=MJRDFQ43T0FSXPBBFA535VVJVKLUFATMY5IHP2DOFTOKZSYP&v=20180708`)
    .then(res => res.json())
    .then(data => data.response.venues)