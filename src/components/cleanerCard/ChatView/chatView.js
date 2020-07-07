import React, { Component } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

class ChatView extends Component {

    componentDidUpdate = () => {
        const container = document.getElementById('chatview-container');
        if (container)
            container.scrollTo(0, container.scrollHeight);
    }

    render() {

        const { classes } = this.props;

        if (this.props.chat === undefined) {
            return (<main className={classes.content}></main>);
        } else if (this.props.chat !== undefined) {
            console.log(this.props.chat)
            return (
                <div>
                    <div className={classes.chatHeader}>
                        Your conversation with {this.props.chat.users.filter(usr => usr != this.props.user)}
                    </div>
                    <main className={classes.content}>
                        {
                            this.props.chat.messages.map((msg, index) => {
                                return (
                                    <div key={index} className={msg.sender === this.props.user ? classes.userSent : classes.friendSent}>
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

export default withStyles(styles)(ChatView);