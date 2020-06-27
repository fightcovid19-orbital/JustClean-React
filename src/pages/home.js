
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
import HistoryCard from '../components/HistoryCard'

// MUI stuff
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

// Redux 
import { connect } from 'react-redux'
import { getComments } from '../redux/actions/dataActions'
import axios from 'axios'

const styles = theme => ({
    ...theme.spreadThis
})

class home extends Component {
    saveComments = () => {
        if (this.props.user.credentials.cleanerName && this.props.user.credentials.type === 'cleaner') {
            this.props.getComments(this.props.user.credentials.cleanerName);
        }
    }
    componentDidMount() {
        this.saveComments();
    }

    render() {
        const { cleaners, loadingData, comments, histories } = this.props.data;
        const { credentials: { type }, loadingUser } = this.props.user;
        const { classes } = this.props;

        let recentCleanersMarkup = (cleaners)
            ? cleaners.map((cleaner) => <CleanerCard key={cleaner.cleanerId} cleaner={cleaner} />)
            : <p>No cleaner yet</p>;
        let recentCommentsMarkup = (comments)
            ? comments.map((comment) => <CommentCard key={comment.commentId} comment={comment} />)
            : <p>No comment on you yet</p>;
        let recentHistoriesMarkup = (histories)
            ? histories.map(history => <HistoryCard key={history.historyId} history={history} />)
            : <p>Have not hired anyone before</p>

        let feed, profile, notes
        if (loadingUser) {
            feed = <CardSkeleton />
            profile = <ProfileSkeleton />
            notes = <p>Skeleton</p>
        } else if (type === 'customer') {
            feed = recentCleanersMarkup
            profile = <CustomerProfile />
            notes = recentHistoriesMarkup
        } else if (type === 'cleaner') {
            feed = recentCommentsMarkup
            profile = <CleanerProfile />
            notes = <p>Reservation</p>
        } else {
            feed = 'noUser'
            profile = 'noUser'
            notes = 'noUser'
        }

        const home = (profile === 'noUser' || feed === 'noUser' || notes === 'noUser')
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
                        <br />
                        <Paper className={classes.paper} styles={{maxHeight:200, overflow:'auto'}}>
                            {notes}
                        </Paper>
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
    getComments: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data
})

export default connect(mapStateToProps, { getComments })(withStyles(styles)(home))
