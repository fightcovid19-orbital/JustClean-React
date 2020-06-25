import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs'
import LikeButton from './LikeButton';
import UnlikeButton from './UnlikeButton';
import CommentDialog from './CommentDialog'

// MUI stuff
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// Icons
import CloseIcon from '@material-ui/icons/Close'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import ChatIcon from '@material-ui/icons/Chat'

// Redux stuff
import { connect } from 'react-redux'
import { getCleaner } from '../../redux/actions/dataActions'

const style = (theme) => ({
    ...theme.spreadThis,
    invisibleSeparator: {
        border: 'none',
        margin: 1
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20,
        textAlign: 'center'
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '85%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
})

class CleanerDialog extends Component {
    state = {
        open: false
    }
    handleOpen = () => {
        this.setState({ open: true })
        this.props.getCleaner(this.props.cleanerName);
    }
    handleClose = () => {
        this.setState({ open: false })
    }
    render() {
        const { classes, cleaner: { user: { cleanerName, createdAt, likeCount, unlikeCount, imageUrl, bio, location, hiredCount } },
            UI: { loading }
        } = this.props;

        let dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2} />
            </div>
        )
            : (
                <Grid container spacing={12}>
                    <Grid item sm={5}>
                        <img src={imageUrl} alt='Profile Image' className={classes.profileImage} />
                    </Grid>
                    <Grid item sm={7}>
                        <Typography component={Link} to={`/cleaner/${cleanerName}`} color='primary' variant='h5' >
                            @{cleanerName}
                        </Typography>
                        <hr className={classes.invisibleSeparator} />
                        <Typography variant='body2' color='textSecondary'>
                            {dayjs(createdAt).format('MMMM DD YYYY')}
                        </Typography>
                        <hr className={classes.invisibleSeparator} />
                        <Typography variant='h5' color='primary'>
                            Bio: {bio}
                        </Typography>
                        <hr className={classes.invisibleSeparator} />
                        <Typography variant='h5' color='primary'>
                            Location: {location}
                        </Typography>
                        <hr className={classes.invisibleSeparator} />
                        <Typography variant='h5' color='textSecondary'>
                            {hiredCount} hired
                        </Typography>

                        <LikeButton cleanerName={cleanerName} />
                        <span>{likeCount} likes</span>
                        <UnlikeButton cleanerName={cleanerName} />
                        <span>{unlikeCount} unlikes</span>
                        <CommentDialog cleanerName={cleanerName} />
                    </Grid>
                </Grid>
            )

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip='Expand cleaner' tipClassName={classes.expandButton}>
                    <UnfoldMore color='primary' />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <MyButton tip='Close' onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

CleanerDialog.propTypes = {
    getCleaner: PropTypes.func.isRequired,
    cleanerName: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    cleaner: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    cleaner: state.data.cleaner,
    UI: state.UI
})

const mapActionsToProps = {
    getCleaner
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(style)(CleanerDialog))