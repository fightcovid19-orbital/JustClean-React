import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import axios from 'axios';
import ChatView from './chatView/ChatView'

// MUI stuff
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

// Icons
import CloseIcon from '@material-ui/icons/Close'
import ChatIcon from '@material-ui/icons/Chat'

import { connect } from 'react-redux'

const style = (theme) => ({
    ...theme.spreadThis
})

class ChatDialog extends Component {
    state = {
        chat: [],
        errors: {},
        open: false
    }

    componentWillMount = () => {
        axios.get(`/custChat/refresh/${this.props.cleanerName}`)
            .then((res) => {
                console.log(res.data)
                this.setState({ chat: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        const { classes, customerName } = this.props;

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip='Chat' tipClassName={classes.commentButton}>
                    <ChatIcon color='primary' />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <MyButton tip='Close' onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        <ChatView user={customerName} chat={this.state.chat} />
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

ChatDialog.propTypes = {
    customerName: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    cleanerName: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
    customerName: state.user.credentials.customerName
})

export default connect(mapStateToProps)(withStyles(style)(ChatDialog))