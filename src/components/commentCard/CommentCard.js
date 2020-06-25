import React, { Component } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types'

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20
    },
    image: {
        width: 100,
        height: 100,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
        margin: 15
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
};

class CommentCard extends Component {
    render() {
        dayjs.extend(relativeTime);
        const { classes, comment: { body, createdAt, userImage, userHandle, replyCount } } = this.props;
        return (
            <Card className={classes.card}>
                <img src={userImage} alt="Customer Profile" className={classes.image} />
                <CardContent className={classes.content}>
                    <Typography variant="h5" color='primary'>
                        {userHandle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}
CommentCard.propTypes = {
    classes: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired
}

export default withStyles(styles)(CommentCard)
