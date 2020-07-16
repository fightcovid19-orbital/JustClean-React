import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import ChatView from './chatView/ChatView'
import ChatTextbox from './chatTextbox/ChatTextbox';

// MUI stuff
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

// Icons
import CloseIcon from '@material-ui/icons/Close'
import ChatIcon from '@material-ui/icons/Chat'

// Redux 
import { connect } from 'react-redux'
import { getChatsWithCleaner, clearChats } from '../../redux/actions/dataActions'

const style = (theme) => ({
    ...theme.spreadThis,
    closeButton: {
        color: 'white',
        position: 'absolute',
        left: '95%',
        top: '1%'
    }
})

class ChatDialog extends Component {
    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({ open: true })
        this.props.getChatsWithCleaner(this.props.cleanerName)
    }

    handleClose = () => {
        this.setState({ open: false });
        this.props.clearChats()
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
                        <ChatTextbox friend={cleanerName} />
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

ChatDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    cleanerName: PropTypes.string.isRequired,
    getChatsWithCleaner: PropTypes.func.isRequired,
    clearChats: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data
})

export default connect(mapStateToProps, { getChatsWithCleaner, clearChats })(withStyles(style)(ChatDialog))