import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'

// Mui
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

// Icons
import ClearIcon from '@material-ui/icons/Clear'

// Redux stuff
import { connect } from 'react-redux'
import { reject } from '../../redux/actions/dataActions'

export class RejectButton extends Component {
    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({open: false})
    }

    reject = () => {
        this.props.reject(this.props.customerName);
        this.handleClose();
    };

    render() {
            
        return (
            <Fragment>
                <MyButton 
                    tip="Reject" 
                    onClick={this.handleOpen}
                >
                    <ClearIcon color="secondary" />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleclose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>
                        Are you sure you want to reject this job?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.reject} color="secondary">
                            Reject
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

RejectButton.propTypes = {
    user: PropTypes.object.isRequired,
    customerName: PropTypes.string.isRequired,
    reject: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    reject
}

export default connect(mapStateToProps, mapActionsToProps)(RejectButton)
