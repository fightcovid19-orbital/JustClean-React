import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'

//Mui
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

//icons
import DeleteOutline from '@material-ui/icons/DeleteOutline'

// Redux
import { connect } from 'react-redux';
import { deleteCleaner } from '../../redux/actions/userActions'

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
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleDelete = () => {
        this.props.deleteCleaner();
    }

    render() {
        const { classes } = this.props

        return (
            <Fragment>
                <Tooltip title="Delete this account" placement='left' >
                    <IconButton onClick={this.handleOpen} className={classes.deleteButton} >
                        <DeleteOutline color="secondary" />
                    </IconButton>
                </Tooltip>
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
                            Cancel
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
    deleteCleaner: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    cleanerName: PropTypes.string.isRequired
}

const mapActionsToProps = { deleteCleaner }

export default connect(null, mapActionsToProps)(withStyles(styles)(DeleteCleaner))
