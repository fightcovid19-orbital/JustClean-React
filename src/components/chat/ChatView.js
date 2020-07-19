import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'

// Redux stuff
import { connect } from 'react-redux'
import { createChat } from '../../redux/actions/dataActions'

// firebase
const firebase = require("firebase");

const styles = (theme) => ({
    ...theme.spreadThis,
})

class ChatView extends Component {
    
    state = {
        chatMessages: []
    };
    
    componentDidMount() {
        let docKey;
        if(this.props.user.credentials.type === "customer") {
            docKey = [this.props.user.credentials.customerName, this.props.friend].join(':'); 
        } else {
            docKey = [this.props.friend, this.props.user.credentials.cleanerName].join(':'); 
        }
        
        firebase.firestore()
            .doc(`chats/${docKey}`)
            .onSnapshot(doc => {
                if(doc.exists) {
                    const chats = doc.data().messages;
                    this.setState({
                        chatMessages: chats
                    });
                } else {
                    this.props.createChat(this.props.friend);
                }
            });
     }
    
    componentDidUpdate() {
        const container = document.getElementById('chatview-container');
        if (container) {
            container.scrollTo(0, container.scrollHeight);
        }
    }

    render() {
        const { classes } = this.props;
        const { credentials } = this.props.user;

        let userHandle;
        if(credentials.type === "customer") {
            userHandle = credentials.customerName; 
        } else {
            userHandle = credentials.cleanerName;
        }

        if (!this.state.chatMessages) {
            return (
                <div>
                    <main></main>
                </div>

            );
        } else {
            return (
                <div>
                    <main id='chatview-container' >
                        {
                            this.state.chatMessages.map((msg, index) => {
                                return (
                                    <div key={index} className={msg.sender === userHandle ? classes.userSent : classes.friendSent}>
                                        {msg.message}
                                    </div>
                                )
                            })
                        }
                    </main>
                </div>
            );
        }
    }
}

ChatView.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    friend: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    createChat: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    data: state.data
})

export default connect(mapStateToProps, {createChat})(withStyles(styles)(ChatView))
