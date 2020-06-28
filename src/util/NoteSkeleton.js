import React from 'react';
import noImg from '../images/noImg.png';
import PropTypes from 'prop-types';

// Mui
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    ...theme.spreadThis,
    handle: {
        height: 20,
        backgroundColor: theme.palette.primary.main,
        width: 80,
        marginBottom: 10
    },
    fullLine: {
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: 150,
        marginBottom: 10
    },
    date: {
        height: 14,
        width: 70,
        backgroundColor: 'rgba(0,0,0,0.3)',
        marginBottom: 10
    },
    halfLine: {
        height: 20,
        backgroundColor: theme.palette.primary.main,
        width: '40%',
        margin: '0 auto 7px auto'
    }
})

const NoteSkeleton = props => {
    const { classes } = props
    const noteContent = Array.from({ length: 4 }).map((item, index) => (
        <Card className={classes.card} key={index}>
            <img src={noImg} alt="profile picture" className={classes.cover} />
            <CardContent classesName={classes.cardContent}>
                <div className={classes.handle} />
                <div className={classes.date} />
                <div className={classes.fullLine} />
            </CardContent>
        </Card>
    ))

    return (
        <Paper className={classes.paper}>
            <div className={classes.halfLine}/>
            {noteContent}
        </Paper>
    )
}

NoteSkeleton.propTypes = {
    classes: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
}

export default withStyles(styles)(NoteSkeleton)
