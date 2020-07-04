import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
import Notifications from './Notifications'
import SearchBar from './SearchBar'
import Records from './Records'

// MUI stuff
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

// Icons
import HomeIcon from '@material-ui/icons/Home'

class Navbar extends Component {
    render() {
        const { authenticated, credentials: { type } } = this.props.user;
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            {type === 'customer' ? (<SearchBar />) : null}
                            <Link to='/'>
                                <MyButton tip='Home'>
                                    <HomeIcon />
                                </MyButton>
                            </Link>
                            <Notifications />
                            {type === 'cleaner' ? (<Records />) : null}
                        </Fragment>
                    ) : (
                            <Fragment>
                                <Button color="inherit" component={Link} to='/'> Home</Button>
                                <Button color="inherit" component={Link} to='/login'> Login</Button>
                                <Button color="inherit" component={Link} to='/signup'> Signup</Button>
                            </Fragment>
                        )}
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(Navbar)
