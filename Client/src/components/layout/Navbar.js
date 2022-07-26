import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';


const Navbar = ({
    auth: {
        isAuthenticated,
        loading
    },
    logout
}) => {
    const authLinks = (
        <ul>
            <li>
                <Link to="/" className="nav-link">Home</Link>
            </li>
            {/* <li>
                <Link to="/create" className="nav-link">Create Chore</Link>
            </li>
            <li>
                <Link to="/map" className="nav-link">Map</Link>
            </li>
            <li>
                <Link to='/profiles' className="nav-link">Profiles</Link>
            </li>
            <li>
                <Link to="/faq" className="nav-link">FAQ</Link>
            </li> */}
            <li>
                <a onClick={logout} href='/' className="nav-link">
                    <i className='fas fa-sign-out-alt'/>{' '}
                    <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to="/" className="nav-link">Home</Link>
            </li>
            <li>
                <Link to='/profiles' className="nav-link">Profiles</Link>
            </li>
            <li>
                <Link to="/faq" className="nav-link">FAQ</Link>
            </li>
            {/* <li>
                <Link to='/login' className="nav-link">Login</Link>
            </li> */}
        </ul>
    );
    return (
        // <Router>
            <div className="container">

                <nav className='navbar bg-dark'>
                    <h1>
                        <Link to='/'>
                        <img id="nav-logo" src="hh-logo.svg" alt="Kiwi standing on oval" /> Helping Hands
                        </Link>
                    </h1>
                    {!loading && (
                        <Fragment>{isAuthenticated
                                ? authLinks
                                : guestLinks}</Fragment>
                    )}
                </nav>
            </div>


    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({auth: state.auth});

export default connect(mapStateToProps, {logout})(Navbar);