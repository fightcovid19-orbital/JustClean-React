import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';

// MUI stuff
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

// Icons
import CloseIcon from '@material-ui/icons/Close'
import AddCommentIcon from '@material-ui/icons/AddComment'

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
        if (!nextProps.UI.errors && !nextProps.UI.loadingUI) { // maybe dont have loadingUI
            this.setState({ body: '' })
            this.setState({ errors: {} })
        }
    }
    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.setState({ open: false });
        this.props.clearErrors();
        this.setState({ errors: {} })
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitComment(this.props.cleanerName, { body: this.state.body });
        if (this.props.UI.errors) {
            this.handleClose();
        }
    }
    render() {
        const { classes, authenticated
        } = this.props;
        const errors = this.state.errors

        let dialogMarkup = authenticated ? (
            <Fragment>
                <form onSubmit={this.handleSubmit}>
                    <TextField name='body' type='text' label='Leave a comment on this cleaner'
                        error={errors.body ? true : false} helperText={errors.body} value={this.state.body}
                        onChange={this.handleChange} fullWidth className={classes.textField} />
                    <Button variant='contained' type='submit' color='primary' className={classes.button}>Submit</Button>
                </form>
            </Fragment>
        ) : null;

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip='Comment this cleaner' tipClassName={classes.commentButton}>
                    <AddCommentIcon color='primary' />
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
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
    UI: state.UI
})

const mapActionsToProps = {
    submitComment, clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(style)(CommentDialog))