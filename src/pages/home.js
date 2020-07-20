import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CleanerCard from '../components/cleanerCard/CleanerCard'
import CommentCard from '../components/commentCard/CommentCard'
import CustomerProfile from '../components/profile/CustomerProfile'
import CleanerProfile from '../components/profile/CleanerProfile'
import SmallLoginAndSignup from '../components/profile/SmallLoginAndSignup'
import HistoryCard from '../components/notes/HistoryCard'
import ReserveCard from '../components/notes/ReserveCard'
import CardSkeleton from '../util/CardSkeleton'
import ProfileSkeleton from '../util/ProfileSkeleton'
import NoteSkeleton from '../util/NoteSkeleton'

// MUI stuff
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

// Redux 
import { connect } from 'react-redux'


const styles = theme => ({
    ...theme.spreadThis,
    title: {
        textAlign: 'center'
    },
    scrollablePaper: {
        maxHeight: 400,
        overflow: 'auto',
        padding: 20,
    },
})

class home extends Component {

    render() {
        const { cleaners, loadingData, comments, histories, reservations } = this.props.data;
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
            : <p>Have not hired anyone before</p>;
        let recentReservesMarkup = (reservations)// it check the collections instead the particular person 
            ? reservations.map(reserve => <ReserveCard key={reserve.customerName} reserve={reserve} />)
            : <p>No one reserve you yet</p>

        let feed, profile, notes
        if (loadingUser || loadingData) {
            feed = <CardSkeleton />
            profile = <ProfileSkeleton />
            notes = <NoteSkeleton />
        } else if (type === 'customer') {
            feed = recentCleanersMarkup
            profile = <CustomerProfile />
            notes = (
                <Paper className={classes.scrollablePaper} >
                    <Typography variant="h5" color='primary' className={classes.title}>
                        History
                    </Typography>
                    {recentHistoriesMarkup}
                </Paper>
            )
        } else if (type === 'cleaner') {
            feed = recentCommentsMarkup
            profile = <CleanerProfile />
            notes = (
                <Paper className={classes.scrollablePaper} >
                    <Typography variant="h5" color='primary' className={classes.title}>
                        Reservations
                    </Typography>
                    {recentReservesMarkup}
                </Paper>
            )

        } else {
            feed = 'noUser'
            profile = 'noUser'
            notes = 'noUser'
        }

        const home = (profile === 'noUser' || feed === 'noUser' || notes === 'noUser')
            ? (
                <Grid container className={classes.form}>
                    <Grid item sm xs={1} />
                    <Grid item sm xs={10}>
                        <SmallLoginAndSignup />
                    </Grid>
                    <Grid item sm xs={1} />
                </Grid>
            )
            : (
                <Grid container spacing={2} >
                    <Grid item sm={4} xs={12} >
                        {profile}
                        <br />
                        {notes}
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
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data
})

export default connect(mapStateToProps)(withStyles(styles)(home))
