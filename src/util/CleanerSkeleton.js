import React, { Fragment } from 'react';
import noImg from '../images/noImg.png';
import PropTypes from 'prop-types';

// Mui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    card: {
        display: 'flex',
        marginBottom: 20
    },
    cardContent: {
        width: '100%',
        flexDirection: 'column',
        padding: 25
    },
    cover: {
        width: 100,
        height: 100,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
        margin: 15
    },
    handle: {
        width: 100,
        height: 20,
        backgroundColor: theme.palette.primary.main,
        marginBottom: 25,
        marginTop: 15
    },
    fullLine: {
        height: 15,
        width: 500,
        marginBottom: 10,
        backgroundColor: 'rgba(0,0,0,0.6)'
    }

})

const CleanerSkeleton = props => {
    const { classes } = props
    
    const content = Array.from({ length: 5 }).map((item, index) => (
        <Card className={classes.card} key={index}>
            <img src={noImg} alt="profile picture" className={classes.cover} />
            <CardContent classesName={classes.cardContent}>
                <div className={classes.handle} />
                <div className={classes.fullLine} />
            </CardContent>
        </Card>
    ))

    return <Fragment>{content}</Fragment>
}

CleanerSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CleanerSkeleton);