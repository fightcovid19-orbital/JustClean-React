import React, { Component } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types'
import DeleteComment from './DeleteComment';
import EditComment from './EditComment';

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid'

// Redux
import { connect } from 'react-redux'

const styles = {
    card: {
        // position: 'relative',
        // display: 'flex',
        marginBottom: 20
    },
    image: {
        width: 100,
        height: 100,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
        marginLeft: 15,
        marginTop: 15,
        marginBottom: 15
    },
    content: {
        padding: 20,
        objectFit: 'cover'
    },
    gridCenter: {
        textAlign: 'center'
    }

};

class CommentCard extends Component {

    render() {
        dayjs.extend(relativeTime);
        const {
            classes,
            comment: { body, createdAt, userImage, userHandle, commentId, commentOn },
            customerName
        } = this.props;

        const deleteCommentButton = userHandle === customerName ? (
            <DeleteComment commentId={commentId} />
        ) : (
                null
            )

        const editCommentButton = userHandle === customerName ? (
            <EditComment commentId={commentId} cleanerName={commentOn} />
        ) : (
                null
            )
        return (
            <Card className={classes.card}>
                <Grid container justify='flex-start' alignItems='center'>
                    <Grid item xs={12} md={3} lg={2} className={classes.gridCenter}>
                        <img src={userImage} alt="Customer Profile" className={classes.image} />
                    </Grid>
                    <Grid item xs={12} md={9} lg={10}>
                        <CardContent className={classes.content}>
                            <Grid container >
                                <Grid item lg={10} md={9} xs={8}>
                                    <Typography variant="h5" color='primary'>
                                        {userHandle}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {dayjs(createdAt).fromNow()}
                                    </Typography>
                                </Grid>
                                <Grid item lg={2} md={3} xs={4}>
                                    {editCommentButton}
                                    {deleteCommentButton}
                                </Grid>
                            </Grid>
                            <Typography variant="body1">
                                {body}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        )
    }
}

CommentCard.propTypes = {
    classes: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    customerNmae: PropTypes.string
}

const mapStateToProps = state => ({
    customerName: state.user.credentials.customerName
})

export default connect(mapStateToProps)(withStyles(styles)(CommentCard))
