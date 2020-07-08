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

const style = (theme) => ({
    ...theme.spreadThis
})

class ChatDialog extends Component {
    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        const { classes, cleanerName } = this.props;

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip='Chat' tipClassName={classes.commentButton}>
                    <ChatIcon color='primary' />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullScreen>
                    <MyButton tip='Close' onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogContent >
                        <ChatView friend={cleanerName} />
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

ChatDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    cleanerName: PropTypes.string.isRequired,
}

export default withStyles(style)(ChatDialog)