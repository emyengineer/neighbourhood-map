import React, {Component} from 'react';
import PropTypes from 'prop-types'

class Header extends Component {
	static propTypes = {}
	state = {}

render() {
	const{onMenuClick} = this.props
	 

return(
		<header className = "App-header">
      	<a id="menu" className="header__menu" onClick ={(event) => onMenuClick(event)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"></path>
          </svg>
    	</a>
      	<h1 className = "App-title"> Sharm El Sheikh City on Red Sea Egypt. A charm and Beauty City</h1>
  		
  		</header>
)
	}

}

export default Header