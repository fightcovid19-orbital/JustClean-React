import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import ChatView from './ChatView'
import ChatTextbox from './ChatTextbox'

// MUI stuff
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

// Icons
import CloseIcon from '@material-ui/icons/Close'
import ChatIcon from '@material-ui/icons/Chat'

const style = (theme) => ({
    ...theme.spreadThis,
    closeButton: {
        color: '#ff3d00',
        position: 'absolute',
        left: '95%'
    }
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
        const { classes, friendName } = this.props;

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip='Chat' tipClassName={this.props.chatButtonClassName}>
                    <ChatIcon color='primary' />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} maxWidth='md' fullWidth={true}>
                    <MyButton tip='Close' onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    
                    <div className={classes.chatHeader}>
                        Your conversation with {this.props.friendName}
                    </div>

                    <DialogContent style={{overflow: "hidden"}}>
                        <ChatView friend={friendName} />
                    </DialogContent>
                    
                    <DialogContent style={{overflow: "hidden"}}>
                        <ChatTextbox friend={friendName} />
                    </DialogContent>

                </Dialog>
            </Fragment>
        )
    }
}

ChatDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    friendName: PropTypes.string.isRequired,
}

export default withStyles(style)(ChatDialog)
