import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from '../Admin/AdminNavBar/adminNavBar';
import Footer from '../Shared/Footer/Footer';
import './Home.scss';
class Home extends React.PureComponent {
    render() {
        return (
            <div className="home">
                <NavBar />
                <div className="yourDiv">
                    {this.props.homeState.message}
                    <button> {this.props.homeState.message} </button>
                </div>
                
                <Footer/>
            </div> 
        );
    }
}

Home.propTypes = {
    homeState: PropTypes.shape({
        message: PropTypes.string.isRequired
    })
};

const mapStateToProps = (state) => {
    return {
        homeState: state.homeState
    };
};

export default connect(mapStateToProps)(Home);