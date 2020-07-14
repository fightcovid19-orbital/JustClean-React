import React from 'react';
import axios from 'axios';
import styles from './styles';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { sendMessage } from '../../../redux/actions/dataActions'

class ChatTextbox extends React.Component {

    state = {
        chatText: ''
    };

    userTyping = (e) => e.keyCode === 13 ? this.submitMessage() : this.setState({ chatText: e.target.value });

    messageValid = (txt) => txt && txt.replace(/\s/g, '').length;

    userClickedInput = () => this.props.userClickedInputFn(); // messageRead

    submitMessage = () => {
        if (this.messageValid(this.state.chatText)) {
            const chatText = {
                txt: {message: this.state.chatText},
                sender: this.props.customerName,
                timestamp: new Date().toISOString
            }
            this.props.sendMessage(this.props.friend, chatText)

            document.getElementById('chattextbox').value = '';
        }
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.chatTextBoxContainer}>
                <TextField
                    placeholder='Type your message..'
                    onKeyUp={(e) => this.userTyping(e)}
                    id='chattextbox'
                    className={classes.chatTextBox}
                    onFocus={null}>
                </TextField>
                <Send onClick={this.submitMessage} className={classes.sendBtn}></Send>
            </div>
        );
    }

}

ChatTextbox.propTypes = {
    friend: PropTypes.string.isRequired,
    customerName: PropTypes.string.isRequired,
    sendMessage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    customerName: state.user.credentials.customerName
})

export default  connect(mapStateToProps, { sendMessage })(withStyles(styles)(ChatTextbox));