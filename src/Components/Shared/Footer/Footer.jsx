import React from 'react';
import { connect } from 'react-redux';
import './Footer.scss';

class Footer extends React.PureComponent {
    render() {
        return ( 
            <div>
                <footer className="footer">   
                    <div className="container">  
                        
                        <div className="d-flex">
                            <div className="ml-auto mr-auto ">
                                <a className="clickncheck" href="#">ClicknCheck 2019</a>
                            </div>
                            <div className=" mr-5">
                                <a className="clickncheck" href="#">T's & C's</a>
                            </div>
                            <div className="">
                                <a className="clickncheck" href="#">Contact Us</a>
                            </div>
                            
                        </div>
                        
                    </div>
                </footer>
            </div>
            
        );
    }
}

export default connect()(Footer);