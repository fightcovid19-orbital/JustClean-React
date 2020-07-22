import React, { Component, Fragment } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import ChatDialog from '../chat/ChatDialog'

//Mui
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'

//icon
import SmsIcon from '@material-ui/icons/Sms'
import ChatIcon from '@material-ui/icons/Chat'

//Redux
import { connect } from 'react-redux'
import { markChatNotificationsRead } from '../../redux/actions/userActions';

class ChatNotifications extends Component {
    state = {
        anchorEl: null
    }

    handleOpen = (event) => {
        this.setState({ anchorEl: event.target });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    }

    onMenuOpened = () => {
        let unreadChatNotificationsIds = this.props.chatNotifications
            .filter(not => !not.read)
            .map(not => not.chatNotificationId);
        this.props.markChatNotificationsRead(this.props.type, unreadChatNotificationsIds);
    }

    render() {
        const chatNotifications = this.props.chatNotifications;
        const anchorEl = this.state.anchorEl;

        dayjs.extend(relativeTime);

        let chatNotificationsIcon;
        if (chatNotifications && chatNotifications.length > 0) {
            if (chatNotifications.filter(not => not.read === false).length > 0) {
                chatNotificationsIcon = (
                    <Badge
                        badgeContent={chatNotifications.filter(not => not.read === false).length}
                        color="secondary">
                        <SmsIcon />
                    </Badge>
                )
            } else {
                chatNotificationsIcon = <SmsIcon />
            }
        } else {
            chatNotificationsIcon = <SmsIcon />
        }

        let chatNotificationsMarkup = chatNotifications && chatNotifications.length > 0
            ? (
                chatNotifications.map(not => {
                    const time = dayjs(not.createdAt).fromNow();
                    const iconColor = not.read ? 'primary' : 'secondary'

                    return (
                        
                        <MenuItem key={not.createdAt} >
                            <ChatDialog friendName={not.sender} base={true}>
                                <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
                                <Typography
                                    color={iconColor}
                                    variant="body1"
                                >
                                    {not.sender} send a message to you {time}
                                </Typography>
                            </ChatDialog>
                        </MenuItem>

                    )
                })
            ) : (
                <MenuItem onClick={this.handleClose}>
                    You have not receive any message yet
                </MenuItem>
            )

        return (
            <Fragment>
                <Tooltip placement="top" title="Chat Notifications">
                    <IconButton
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleOpen}
                    >
                        {chatNotificationsIcon}
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened}
                >
                    {chatNotificationsMarkup}
                </Menu>
            </Fragment>
        )
    }
}

ChatNotifications.propTypes = {
    markChatNotificationsRead: PropTypes.func.isRequired,
    chatNotifications: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    chatNotifications: state.user.chatNotifications,
    type: state.user.credentials.type
})


export default connect(mapStateToProps, { markChatNotificationsRead })(ChatNotifications)