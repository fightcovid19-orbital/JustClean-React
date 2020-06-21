
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CleanerCard from '../components/CleanerCard'
import CommentCard from '../components/CommentCard'
import CustomerProfile from '../components/CustomerProfile'
import CleanerProfile from '../components/CleanerProfile'

// MUI stuff
import Grid from '@material-ui/core/Grid'

// Redux 
import { connect } from 'react-redux'
import { getCleaners } from '../redux/actions/dataActions' // import action from cleanerProfile


class home extends Component {
    componentDidMount() {
        this.props.getCleaners();
        // action from cleanerProfile
    }

    render() {
        const { cleaners, loading } = this.props.data;
        const { credentials: { type } } = this.props.user;

        let recentCleanersMarkup = !loading
            ? cleaners.map(cleaner => <CleanerCard key={cleaner.cleanerId} cleaner={cleaner} />)
            : <p>Loading...</p>
        let recentCommentsMarkup = !loading
            ? <p>Comments...</p>
            : <p>Loading...</p>
        let feed = (type === 'cleaner') ? recentCommentsMarkup : recentCleanersMarkup;
        let profile = (type === 'customer') ? <CustomerProfile /> : <CleanerProfile />;

        return (
            <Grid container spacing={2}>
                <Grid item sm={4} xs={12}>
                    {profile}
                </Grid>
                <Grid item sm={8} xs={12}>
                    {feed}
                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
    getCleaners: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data
})

export default connect(mapStateToProps, { getCleaners })(home)
