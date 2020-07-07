import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'

// Mui
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

// Icons
import DeleteIcon from '@material-ui/icons/DeleteOutline'

// Redux stuff
import { connect } from 'react-redux'
import { deleteRecord } from '../../redux/actions/dataActions'

export class DeleteRecordButton extends Component {
    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({open: false})
    }

    deleteRecord = () => {
        this.props.deleteRecord(this.props.recordId);
        this.handleClose();
    };

    render() {
        return (
            <Fragment>
                <MyButton 
                    tip="Delete" 
                    onClick={this.handleOpen}
                >
                    <DeleteIcon color="secondary" />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleclose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>
                        Are you sure you want to delete this record?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.deleteRecord} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeleteRecordButton.propTypes = {
    recordId: PropTypes.string.isRequired,
    deleteRecord: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    
})

const mapActionsToProps = {
    deleteRecord
}

export default connect(mapStateToProps, mapActionsToProps)(DeleteRecordButton)
