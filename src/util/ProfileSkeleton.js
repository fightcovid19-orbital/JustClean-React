import React from 'react';
import noImg from '../images/noImg.png';
import PropTypes from 'prop-types';

// Mui
import Paper from '@material-ui/core/Paper';

//Icon
import LocationOn from '@material-ui/icons/LocationOn'
import CalendarToday from '@material-ui/icons/CalendarToday'
import SatisfiedIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined'
import DissatisfiedIcon from '@material-ui/icons/SentimentDissatisfiedOutlined'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    ...theme.spreadThis,
    handle: {
        height: 20,
        backgroundColor: theme.palette.primary.main,
        width: 60,
        margin:  '0 auto 7px auto'
    },
    fullLine: {
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '100%',
        marginBottom: 10
    },
    number: {
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '10%',
    }
})

const ProfileSkeleton = props => {
    const { classes, type } = props
    let profileDetail = (type == 'cleaner') 
        ? 
        (
            <div className="profile-details">
                <div className={classes.handle}/>
                <hr/>
                <div className={classes.fullLine}/> 
                <div className={classes.fullLine}/> 
                <LocationOn color="primary" /><span>Location</span>
                <hr/>
                <CalendarToday color="primary"/><span>Joined Date</span>
                <hr/>
                <SatisfiedIcon color="primary" /><span> 0 likes</span>
                <hr/>              
                <DissatisfiedIcon color="primary" /><span> 0 unlikes</span>
                <hr/>
                <AccountCircleIcon color="primary" /><span> 0 hired</span>
            </div>
        )
        : 
        (
            <div className="profile-details">
                <div className={classes.handle}/>
                <hr/>
                <div className={classes.fullLine}/> 
                <div className={classes.fullLine}/> 
                <LocationOn color="primary" /><span>Location</span>
                <hr/>
                <CalendarToday color="primary"/><span>Joined Date</span>
            </div>
        )

    return (
        <Paper className = {classes.paper}>
            <div className={classes.profile}>
                <div className={"image-wrapper"}>
                    <img src={noImg} alt="profile" className="profile-image" />
                </div>
                <hr/>
                {profileDetail}
            </div>
        </Paper>
    )
}

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileSkeleton)
