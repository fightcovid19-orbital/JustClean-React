import React, { Component } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'

// Redux stuff
import { connect } from 'react-redux'
import { createChat } from '../../../redux/actions/dataActions'

// firebase
const firebase = require('firebase')

class ChatView extends Component {

    state = {
        chatMessages: []
    }

    componentDidMount() {
        const docKey = [this.props.friend, this.props.user.credentials.cleanerName].join(':');
        firebase.firestore()
            .doc(`chats/${docKey}`)
            .onSnapshot(doc => {
                if(doc.exists){
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
        const { credentials: { cleanerName } } = this.props.user;

        if (!this.state.chatMessages) {
            return (
                <div>
                    <div className={classes.chatHeader}>
                        Your conversation with {this.props.friend}
                    </div>
                    <main className={classes.content}></main>
                </div>

            );
        } else {
            return (
                <div>
                    <div className={classes.chatHeader}>
                        Your conversation with {this.props.friend}
                    </div>
                    <main id='chatview-container' className={classes.content}>
                        {
                            this.state.chatMessages.map((msg, index) => {
                                return (
                                    <div key={index} className={msg.sender === cleanerName ? classes.userSent : classes.friendSent}>
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

export default connect(mapStateToProps, { createChat })(withStyles(styles)(ChatView))
