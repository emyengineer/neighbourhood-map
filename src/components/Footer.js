import React, {Component} from 'react';
import PropTypes from 'prop-types'

class Footer extends Component {
	static propTypes = {}
	state = {}

	render() {


		return(
			<footer className="App-footer">
          		<h4 className= "App-footer-text"> Site Developed by @Eman Zaghloul and integrated with Fousquare API to get data</h4>
      		</footer>
			)
	}

}

export default Footer