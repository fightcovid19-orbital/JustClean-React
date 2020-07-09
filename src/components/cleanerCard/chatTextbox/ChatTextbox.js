import React from 'react';
import axios from 'axios';
import styles from './styles';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import { withStyles } from '@material-ui/core/styles';

class ChatTextbox extends React.Component {

    constructor() {
        super();
        this.state = {
            chatText: ''
        };
    }
    userTyping = (e) => e.keyCode === 13 ? this.submitMessage() : this.setState({ chatText: e.target.value });

    messageValid = (txt) => txt && txt.replace(/\s/g, '').length;

    userClickedInput = () => this.props.userClickedInputFn(); // messageRead

    submitMessage = () => {
        if (this.messageValid(this.state.chatText)) {

            axios.post(`/chat/cleaner/${this.props.friend}`, { message: this.state.chatText })
                .then(res => console.log(res)) // refresh chatView?? 
                .catch(err => console.log(err));

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

export default withStyles(styles)(ChatTextbox);