
import React, { Component } from 'react'
import axios from 'axios'
import Cleaner from '../components/Cleaner'
import Profile from '../components/Profile'
import PropTypes from 'prop-types'
// MUI stuff
import Grid from '@material-ui/core/Grid'
// Redux 
import { connect } from 'react-redux'
import { getCleaners } from '../redux/actions/dataActions'

class home extends Component {
    componentDidMount() {
        this.props.getCleaners();
    }
    render() {
        const { cleaners, loading } = this.props.data;
        let recentCleanersMarkup = !loading
            ? cleaners.map(cleaner => <Cleaner key={cleaner.cleanerId} cleaner={cleaner} />)
            : <p>Loading...</p>
        return (
            <Grid container spacing={2}>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
                <Grid item sm={8} xs={12}>
                    {recentCleanersMarkup}
                </Grid>

            </Grid>
        )
    }
}

home.propTypes = {
    getCleaners: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

export default connect(mapStateToProps, { getCleaners })(home)
