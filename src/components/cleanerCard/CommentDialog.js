import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';

// MUI stuff
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import AddCommentIcon from '@material-ui/icons/AddComment'

// Redux stuff
import { connect } from 'react-redux'
import { submitComment, clearErrors } from '../../redux/actions/dataActions'

const style = (theme) => ({
    ...theme.spreadThis,
    progressSpinner: {
        position: 'absolute'
    },
    submitButton: {
        position: 'relative'
    }
})

class CommentDialog extends Component {
    state = {
        body: '',
        errors: {},
        open: false,
        first: true
    }

    static getDerivedStateFromProps(props, state) {
        if (props.UI.errors) {
            return {
                errors: props.UI.errors
            }
        }
        if(!props.UI.errors && state.first) {
            return {
                errors: {}
            }
        } else if (!props.UI.errors && !props.UI.loadingUI) {
            return {
                body: '',
                errors: {},
                open: false,
                first: true
            }
        } 
        return null;
    }

    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.setState({ open: false, body: '' });
        this.props.clearErrors();
        this.setState({ errors: {} })
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitComment(this.props.cleanerName, { body: this.state.body });
        this.setState({ body: '', first: false })
    }
    render() {
        const { 
            classes, 
            authenticated,
            UI: { loadingUI }
        } = this.props;
        const errors = this.state.errors

        let dialogMarkup = authenticated ? (
            <Fragment>
                <form>
                    <TextField name='body' type='text' label='Leave a comment on this cleaner'
                        error={errors.body ? true : false} helperText={errors.body} value={this.state.body}
                        onChange={this.handleChange} fullWidth className={classes.textField} />
                </form>
            </Fragment>
        ) : null;

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip='Comment this cleaner' tipClassName={classes.commentButton}>
                    <AddCommentIcon color='primary' />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <DialogTitle>Comment</DialogTitle>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                    <DialogActions>
                        <Button type='button' onClick={this.handleClose} color='primary'>
                            Cancel
                        </Button>
                        <Button type='submit' onClick={this.handleSubmit} color='primary' disabled={loadingUI}
                            className={classes.submitButton}>
                            Submit
                            {
                                loadingUI && (
                                    <CircularProgress size={30} className={classes.progressSpinner}/>
                                )
                            }
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

CommentDialog.propTypes = {
    submitComment: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    cleanerName: PropTypes.string,
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