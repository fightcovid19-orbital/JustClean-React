import React from 'react';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'

// Redux
import { connect } from 'react-redux'
import { sendMessageToCleaner, sendMessageToCustomer } from '../../redux/actions/dataActions'

const styles = (theme) => ({
    ...theme.spreadThis,
})

class ChatTextbox extends React.Component {

    state = {
        chatText: ''
    };

    userTyping = (e) => e.keyCode === 13 ? this.submitMessage() : this.setState({ chatText: e.target.value });

    messageValid = (txt) => txt && txt.replace(/\s/g, '').length;

    userClickedInput = () => this.props.userClickedInputFn(); // messageRead

    submitMessage = () => {
        if (this.messageValid(this.state.chatText)) {
            if(this.props.userCredentials.type === "customer") {
                const chatText = {
                    txt: { message: this.state.chatText },
                    sender: this.props.userCredentials.customerName,
                    timestamp: new Date().toISOString
                }
                this.props.sendMessageToCleaner(this.props.friend, chatText)
            } else {
                const chatText = {
                    txt: { message: this.state.chatText },
                    sender: this.props.userCredentials.cleanerName,
                    timestamp: new Date().toISOString
                }
                this.props.sendMessageToCustomer(this.props.friend, chatText)
            }
            

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
    userCredentials: PropTypes.object.isRequired,
    sendMessageToCleaner: PropTypes.func,
    sendMessageToCustomer: PropTypes.func
}

const mapStateToProps = state => ({
    userCredentials: state.user.credentials
})

export default connect(mapStateToProps, { sendMessageToCleaner, sendMessageToCustomer })(withStyles(styles)(ChatTextbox));