import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as MapsDataAPI from '../MapsDataAPI.js';

class  ImageViewer extends Component {
	render () {
		const{imageSrc, detailsData} = this.props

		return (
			<div>
			<img id="img" tabIndex= "0" className="site-image" src={imageSrc} />
			<div> {detailsData}</div>
			</div>
			)
	}



}
export default ImageViewer