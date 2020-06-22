
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
import { getCleaners, getComments } from '../redux/actions/dataActions'


class home extends Component {
    saveCleaners = () => {
        if (this.props.user.credentials.type === 'customer') {
            this.props.getCleaners();
        }
    }
    saveComments = () => {
        if (this.props.user.credentials.cleanerName && this.props.user.credentials.type === 'cleaner') {
            this.props.getComments(this.props.user.credentials.cleanerName);
        }
    }
    componentDidMount() {
        this.saveCleaners();
        this.saveComments();
    }

    render() {
        const { cleaners, loading, comments } = this.props.data;
        const { credentials: { type } } = this.props.user;

        let recentCleanersMarkup = (!loading && cleaners)
            ? cleaners.map((cleaner) => <CleanerCard key={cleaner.cleanerId} cleaner={cleaner} />)
            : <p>Loading...</p>;
        let recentCommentsMarkup = (!loading && comments)
            ? comments.map((comment) => <CommentCard key={comment.commentId} comment={comment} />)
            : <p>Loading...</p>;
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
    getComments: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data
})

export default connect(mapStateToProps, { getCleaners, getComments })(home)
