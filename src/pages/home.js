
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CleanerCard from '../components/cleanerCard/CleanerCard'
import CommentCard from '../components/commentCard/CommentCard'
import CustomerProfile from '../components/profile/CustomerProfile'
import CleanerProfile from '../components/profile/CleanerProfile'
import CleanerSkeleton from '../util/CleanerSkeleton'
import CommentSkeleton from '../util/CommentSkeleton'
import ProfileSkeleton from '../util/ProfileSkeleton'

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
        const { cleaners, loadingData, comments } = this.props.data;
        const { credentials: { type }, loadingUser } = this.props.user;

        let recentCleanersMarkup = (!loadingData && cleaners)
            ? cleaners.map((cleaner) => <CleanerCard key={cleaner.cleanerId} cleaner={cleaner} />)
            : <CleanerSkeleton />;
        let recentCommentsMarkup = (!loadingData && comments)
            ? comments.map((comment) => <CommentCard key={comment.commentId} comment={comment} />)
            : <CommentSkeleton />;
        
        let feed, profile
        if(loadingData) {
            feed = <CleanerSkeleton />
        } else if (type === 'customer') {
            feed = recentCleanersMarkup 
        } else if (type === 'cleaner') {
            feed = recentCommentsMarkup 
        } else {
            feed = <p>User not found, please login.</p>
        }
            
        if(loadingUser) {
            profile = <ProfileSkeleton type={type}/>
        } else if (type === 'customer') {
            profile = <CustomerProfile />
        } else if (type === 'cleaner') {
            profile = <CleanerProfile />
        } else {
            profile = <p>User not found, please login.</p>
        }


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
