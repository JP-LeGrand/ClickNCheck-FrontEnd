import React from 'react';
import './FooterPreviousNext.scss';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import '../Footer/Footer.scss';
import { connect } from 'react-redux';

class FooterPreviousNext extends React.PureComponent{
    constructor(props){
        super(props);
        this.handleBackEvent = this.handleBackEvent.bind(this);
        this.handleNextEvent = this.handleNextEvent.bind(this);
    }

    handleBackEvent(e){
        this.props.prevPage(e);
    }

    handleNextEvent(e){
        this.props.nextPage(e);
    }
    render() {
        return (
            <footer className="prevNextFooter">
                <div id="buttonFooter">
                    <button id="leftButton" onClick={this.handleBackEvent}><FaAngleLeft />BACK</button>
                    <button id="rightButton" onClick={this.handleNextEvent}>NEXT <FaAngleRight /></button>
                </div>
                <div id="footer">
                    <a id="left" href="#">T's & C's</a>
                    <a id="center" href="#">ClicknCheck 2019</a>
                    <a id="right" href="#">Contact Us</a>
                </div>
            </footer>
        );
    }
}

export default connect()(FooterPreviousNext);