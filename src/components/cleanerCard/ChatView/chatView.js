import React, { Component } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import axios from 'axios'

// Redux stuff
import { connect } from 'react-redux'

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
    componentWillMount = () => {
        axios.get(`/chat/refresh/${this.props.friend}`) // no realtime update
            .then((res) => {

                this.setState({ chat: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    componentDidMount = () => {
        const container = document.getElementById('chatview-container');
        if (container)
            container.scrollTo(0, container.scrollHeight);
    }

    componentDidUpdate = () => {
        const container = document.getElementById('chatview-container');
        if (container)
            container.scrollTo(0, container.scrollHeight);
    }

    render() {

        const { classes } = this.props;
        const { credentials: { customerName } } = this.props.user;

        if (this.state.chat === undefined) {
            return (<main className={classes.content}></main>);
        } else if (this.state.chat !== undefined) {
            return (
                <div>
                    <div className={classes.chatHeader}>
                        Your conversation with {this.props.friend}
                    </div>
                    <main id='chatview-container' className={classes.content}>
                        {
                            this.state.chat.messages.map((msg, index) => {
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
        } else {
            return (<div className='chatview-container'>Loading...</div>);
        }
    }
}
ChatView.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    friend: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(ChatView))
