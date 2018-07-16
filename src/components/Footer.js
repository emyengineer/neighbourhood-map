import React, {Component} from 'react';
import PropTypes from 'prop-types'

class Footer extends Component {
	static propTypes = {}
	state = {}

	render() {


		return(
			<footer className="App-footer" >
          		<h2 className= "App-footer-text" tabIndex={0}>
          		 Site Developed by @Eman Zaghloul and integrated with Foursquare API to get data
          		 <a href="https://developer.foursquare.com/" role="link" tabIndex={0} 
          		 	aria-label="Link to four square API developer site"> visit</a> 
          		</h2>
      		</footer>
			)
	}

}

export default Footer