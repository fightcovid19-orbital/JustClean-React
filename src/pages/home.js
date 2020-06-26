
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CleanerCard from '../components/cleanerCard/CleanerCard'
import CommentCard from '../components/commentCard/CommentCard'
import CustomerProfile from '../components/profile/CustomerProfile'
import CleanerProfile from '../components/profile/CleanerProfile'
import CardSkeleton from '../util/CardSkeleton'
import ProfileSkeleton from '../util/ProfileSkeleton'
import SmallLoginAndSignup from '../components/profile/SmallLoginAndSignup'
import withStyles from '@material-ui/core/styles/withStyles'

// MUI stuff
import Grid from '@material-ui/core/Grid'

// Redux 
import { connect } from 'react-redux'
import { getCleaners, getComments } from '../redux/actions/dataActions'

const styles = theme => ({
    ...theme.spreadThis
})

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
        const { classes } = this.props;

        let recentCleanersMarkup = (cleaners)
            ? cleaners.map((cleaner) => <CleanerCard key={cleaner.cleanerId} cleaner={cleaner} />)
            : <p>No cleaner yet</p>;
        let recentCommentsMarkup = (comments)
            ? comments.map((comment) => <CommentCard key={comment.commentId} comment={comment} />)
            : <p>No comment on you yet</p>;
        
        let feed, profile
        if(loadingUser) {
            feed = <CardSkeleton />
        } else if (type === 'customer') {
            feed = recentCleanersMarkup 
        } else if (type === 'cleaner') {
            feed = recentCommentsMarkup 
        } else {
            feed = 'noUser'
        }
            
        if(loadingUser) {
            profile = <ProfileSkeleton/>
        } else if (type === 'customer') {
            profile = <CustomerProfile />
        } else if (type === 'cleaner') {
            profile = <CleanerProfile />
        } else {
            profile = 'noUser'
        }

        const home = (profile === 'noUser' || feed === 'noUser')
            ? (
                <Grid container className={classes.form}>
                    <Grid item sm />
                    <SmallLoginAndSignup />
                    <Grid item sm />
                </Grid>
            )
            : (
                <Grid container spacing={2}>
                    <Grid item sm={4} xs={12}>
                        {profile}
                    </Grid>
                    <Grid item sm={8} xs={12}>
                        {feed}
                    </Grid>
                 </Grid>

            )


        return home;
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

export default connect(mapStateToProps, { getCleaners, getComments })(withStyles(styles)(home))
