import React from "react";
import { connect } from "react-redux";
import "./Footer.scss";

class Footer extends React.PureComponent {
	render() {
		return ( 
			<footer>   
				<a id="left" href="#">T's & C's</a>
				<a id="center" href="#">ClicknCheck 2019</a>
				<a id="right" href="#">Contact Us</a>
			</footer>
		);
	}
}

export default connect()(Footer);