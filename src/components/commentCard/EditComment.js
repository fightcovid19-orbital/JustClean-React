import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../../util/MyButton';

// Redux
import { connect } from 'react-redux'
import { editComment } from '../../redux/actions/dataActions'

// MUI stuff
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Icons
import EditIcon from '@material-ui/icons/Edit'

const styles = (theme) => ({
    ...theme.spreadThis,
    button: {
        position: "absolute",
        left: "83%",
        top: "15%"
    }
})

class EditComment extends Component {
    state = {
        body: '',
        open: false
    }

    handleOpen = () => {
        this.setState({ open: true })
        const comments = this.props.comments.filter((comment) => comment.commentId == this.props.commentId)
        this.setState({
            body: comments[0].body
        })
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        const comment = {
            body: this.state.body
        }

        this.props.editComment(this.props.commentId, comment, this.props.cleanerName)
        this.handleClose();
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <MyButton tip='Edit Comment' onClick={this.handleOpen} btnClassName={classes.button}>
                    <EditIcon color='primary' />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <DialogTitle>Edit your Comment</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField name='body' type='text' label='Edit Comment'
                                value={this.state.body} onChange={this.handleChange} fullWidth 
                                className={classes.textField} />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='primary'>
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color='primary'>
                            Edit
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditComment.propTypes = {
    classes: PropTypes.object.isRequired,
    commentId: PropTypes.string.isRequired,
    editComment: PropTypes.func.isRequired,
    comments: PropTypes.array.isRequired,
    cleanerName: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    comments: state.data.comments,
})

export default connect(mapStateToProps, { editComment })(withStyles(styles)(EditComment));
