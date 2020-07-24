import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import dayjs from 'dayjs'
import ChatDialog from '../chat/ChatDialog'
import CommentDialog from '../cleanerCard/CommentDialog'

// MUI stuff
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

// Icons
import LocationOn from '@material-ui/icons/LocationOn'
import CalendarToday from '@material-ui/icons/CalendarToday'
import SatisfiedIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined'
import DissatisfiedIcon from '@material-ui/icons/SentimentDissatisfiedOutlined'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ChatIcon from '@material-ui/icons/Chat'

const styles = theme => ({
    ...theme.spreadThis,
});

// not saving this profile to state
const StaticCleanerProfile = (props) => {
    const { classes,
        profile: { cleanerName, imageUrl, createdAt, bio, location, likeCount, unlikeCount, hiredCount }
    } = props;

    return (
        <Paper className={classes.paper}>
            <Grid container>
                <Grid item xs></Grid>
                <Grid item xs={4}>
                <ChatDialog friendName={cleanerName} >
                        <ChatIcon color='primary' />
                    </ChatDialog>
                    <CommentDialog cleanerName={cleanerName}/>
                </Grid>
            
            </Grid>
                    
                
            
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <hr />
                    <img src={imageUrl} alt="profile" className='profile-image' />

                </div>
                <hr />
                <div className="profile-details">
                    <Typography variant="h5">
                        {cleanerName}
                    </Typography>
                    <hr />
                    {bio && <Typography variant="body2"> {bio}</Typography>}
                    <hr />

                    <Fragment>
                        <LocationOn color="primary" />
                        <span>{location}</span>
                        <hr />
                    </Fragment>

                    <Fragment>
                        <CalendarToday color="primary" />
                        {' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                        <hr />
                    </Fragment>

                    <SatisfiedIcon color="primary" /><span>{" " + likeCount + " likes"}</span>
                    <hr />

                    <DissatisfiedIcon color="primary" /><span>{" " + unlikeCount + " unlikes"}</span>
                    <hr />

                    <AccountCircleIcon color="primary" /><span>{" " + hiredCount + " hired"}</span>

                </div>

            </div>
        </Paper>
    )
}

StaticCleanerProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(StaticCleanerProfile)