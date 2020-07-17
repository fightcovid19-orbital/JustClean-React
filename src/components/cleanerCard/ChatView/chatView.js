import React, { Component } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'

// Redux stuff
import { connect } from 'react-redux'
import { getChatsWithCleaner } from '../../../redux/actions/dataActions'

class ChatView extends Component {
    
    /*shouldComponentUpdate(nextProps) {
        const current = this.props.data.chatMessages.length;
        const next = nextProps.data.chatMessages.length;
        return current !==  next
    }*/
    
    componentDidUpdate(prevProps) {
        if(this.props.data.chatMessages.length === prevProps.data.chatMessages.length + 1){
            this.props.getChatsWithCleaner(this.props.friend);
        }
        const container = document.getElementById('chatview-container');
        if (container) {
            container.scrollTo(0, container.scrollHeight);
        }
    }

    render() {
        const { classes } = this.props;
        const { credentials: { customerName } } = this.props.user;
        const { chatMessages } = this.props.data;

        if (!chatMessages) {
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
    data: PropTypes.object.isRequired,
    getChatsWithCleaner: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    data: state.data
})

export default connect(mapStateToProps, {getChatsWithCleaner})(withStyles(styles)(ChatView))
