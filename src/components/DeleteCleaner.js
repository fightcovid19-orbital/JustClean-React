import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton'

//Mui
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'

//icons
import DeleteOutline from '@material-ui/icons/DeleteOutline'

import { connect } from 'react-redux';
import { logoutUser, deleteCleaner } from '../redux/actions/userActions'

const styles = {
    deleteButton: {
        left: "85%"
    }
}

class DeleteCleaner extends Component {
    state = {
        open: false
    };
    
    handleOpen = () => {
        this.setState({open: true});
    }

    handleClose = () => {
        this.setState({open: false});
    }

    handleDelete = () => {
        this.props.deleteCleaner();
    }

    render() {
        const { classes } = this.props

        return (
            <Fragment>
                <MyButton 
                    tip="DeleteAccount" 
                    onClick={this.handleOpen}
                    btnClassName ={classes.deleteButton}
                >
                    <DeleteOutline color = "secondary" />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"

                >
                    <DialogTitle>
                        Are you sure you want to DELETE your Account?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancle
                        </Button>
                        <Button onClick={this.handleDelete} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeleteCleaner.propTypes = {
    deleteCleaner : PropTypes.func.isRequired,
    logoutUser : PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    cleanerName: PropTypes.string.isRequired
}

const mapActionsToProps = { logoutUser, deleteCleaner }

export default connect(null, mapActionsToProps)(withStyles(styles)(DeleteCleaner))
