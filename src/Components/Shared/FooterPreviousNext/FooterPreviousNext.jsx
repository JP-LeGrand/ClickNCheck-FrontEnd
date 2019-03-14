import React from 'react';
import './FooterPreviousNext.scss';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import save from '../../../Assets/save.svg';
class FooterPreviousNext extends React.PureComponent{
    render() {
        return (
            <div className="prevNextFooter">
                <div id="buttonFooter">
                    <button id="prev"><FaAngleLeft />BACK</button>
                    <p id="saveText"><img id="saveIcon" src={save}/> <a id="linkText">Save and continue later</a></p>
                    <button id="next">NEXT <FaAngleRight /></button>
                </div>
            </div>
        );
    }
}

export default FooterPreviousNext;