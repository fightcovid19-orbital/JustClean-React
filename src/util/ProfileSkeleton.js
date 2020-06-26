import React from 'react';
import noImg from '../images/noImg.png';
import PropTypes from 'prop-types';

// Mui
import Paper from '@material-ui/core/Paper';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    ...theme.spreadThis,
    handle: {
        height: 20,
        backgroundColor: theme.palette.primary.main,
        width: 60,
        margin: '0 auto 7px auto'
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
    },
    halfLine: {
        height: 20,
        backgroundColor: 'rgba(0,0,0,0.4)',
        width: '40%',
        margin: '0 auto 7px auto'
    }
})

const ProfileSkeleton = props => {
    const { classes } = props
    const profileDetail = (
            <div className="profile-details">
                <div className={classes.handle} />
                <hr />
                <div className={classes.fullLine} />
                <div className={classes.fullLine} />
                <hr />
                <div className={classes.halfLine} />
                <hr />
                <div className={classes.halfLine} />
            </div>
        )

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className={"image-wrapper"}>
                    <img src={noImg} alt="profile" className="profile-image" />
                </div>
                <hr />
                {profileDetail}
            </div>
        </Paper>
    )
}

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
}

export default withStyles(styles)(ProfileSkeleton)
