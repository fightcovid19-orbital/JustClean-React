import React, { Fragment } from 'react';
import noImg from '../images/noImg.png';
import PropTypes from 'prop-types';

// Mui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    ...theme.spreadThis
})

const CardSkeleton = props => {
    const { classes } = props

    let cardContent = (
        <CardContent className={classes.cardContent}>
            <div className={classes.handle} />
            <div className={classes.date} />
            <div className={classes.fullLine} />
        </CardContent>
    )

    const content = Array.from({ length: 4 }).map((item, index) => (
        <Card className={classes.card} key={index}>
            <img src={noImg} alt="profile" className={classes.cover} />
            {cardContent}
        </Card>
    ))

    return <Fragment>{content}</Fragment>
}

CardSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CardSkeleton);