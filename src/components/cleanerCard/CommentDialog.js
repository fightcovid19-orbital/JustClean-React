import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';

// MUI stuff
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// Icons
import CloseIcon from '@material-ui/icons/Close'
import ChatIcon from '@material-ui/icons/Chat'

// Redux stuff
import { connect } from 'react-redux'
import { submitComment, clearErrors } from '../../redux/actions/dataActions'

const style = (theme) => ({
    ...theme.spreadThis,

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
        // position: 'absolute',
        // left: '90%'
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

class CommentDialog extends Component {
    state = {
        body: '',
        errors: {},
        open: false
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors })
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) { // maybe dont have loading 
            this.setState({ body: '' })
        }
    }
    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.setState({ open: false });
        this.props.clearErrors();
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitComment(this.props.cleanerName, { body: this.state.body })
    }
    render() {
        const { classes, cleaner: { user: { cleanerName, createdAt, likeCount, unlikeCount, imageUrl, bio, location, hiredCount } },
            UI: { loading }, authenticated
        } = this.props;
        const errors = this.state.errors

        let dialogMarkup = authenticated ? (
            <Fragment>
                <form onSubmit={this.handleSubmit}>
                    <TextField name='body' type='text' label='Leave a comment on this cleaner'
                        error={errors.comment ? true : false} helperText={errors.comment} value={this.state.body}
                        onChange={this.handleChange} fullWidth className={classes.TextField} />
                    <Button variant='contained' type='submit' onClick={this.handleClose} color='primary' className={classes.button}>Submit</Button>
                </form>
            </Fragment>
        ) : null;

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip='Comment this cleaner' tipClassName={classes.commentButton}>
                    <ChatIcon color='primary' />
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

CommentDialog.propTypes = {
    submitComment: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    cleanerName: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    cleaner: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
    cleaner: state.data.cleaner,
    UI: state.UI
})

const mapActionsToProps = {
    submitComment, clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(style)(CommentDialog))