import React, { Component } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import axios from 'axios'

// Redux stuff
import { connect } from 'react-redux'
import { getChats } from '../../../redux/actions/dataActions'

class ChatView extends Component {
    constructor() {
        super()
        this.state = {
            chat: {
                messages: [],
                users: []
            }
        }
    }

    componentDidMount() {
        this.props.getChats(this.props.friend);
        /*axios.get(`/chat/refresh/cleaner/${this.props.friend}`) // no realtime update
            .then((res) => {
                this.setState({ chat: res.data })
            })
            .catch((err) => {
                console.log(err)
            })*/
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.chat.messages !== prevState.chat.messages){
            const container = document.getElementById('chatview-container');
            if (container) {
                container.scrollTo(0, container.scrollHeight);
            }

            this.props.getChats(this.props.friend);
            /*axios.get(`/chat/refresh/cleaner/${this.props.friend}`) // no realtime update
                .then((res) => {
                    this.setState({ chat: res.data })
                })
                .catch((err) => {
                    console.log(err)
                })*/
        }
    }

    render() {
        const { classes } = this.props;
        const { credentials: { customerName } } = this.props.user;
        const { chatMessages } = this.props.data;

        if (chatMessages) {
            return (<main className={classes.content}></main>);
        } else {
            return (
                <div>
                    <div className={classes.chatHeader}>
                        Your conversation with {this.props.friend}
                    </div>
                    <main id='chatview-container' className={classes.content}>
                        {
                            chatMessages.map((msg, index) => {
                                return (
                                    <div key={index} className={msg.sender === customerName ? classes.userSent : classes.friendSent}>
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
    getChats: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    data: state.data
})

export default connect(mapStateToProps, { getChats })(withStyles(styles)(ChatView))
