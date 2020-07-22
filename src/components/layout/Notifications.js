import React, { Component, Fragment } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'

//Mui
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'

//icon
import NotificationsIcon from '@material-ui/icons/Notifications'
import SatisfiedIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import AddCommentIcon from '@material-ui/icons/AddComment'

//Redux
import { connect } from 'react-redux'
import { markNotificationsRead } from '../../redux/actions/userActions';

class Notifications extends Component {
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
        let unreadNotificationsIds = this.props.notifications
            .filter(not => !not.read)
            .map(not => not.notificationId);
        this.props.markNotificationsRead(this.props.type, unreadNotificationsIds);
    }

    render() {
        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl;

        dayjs.extend(relativeTime);

        let notificationsIcon;
        if (notifications && notifications.length > 0) {
            if (notifications.filter(not => not.read === false).length > 0) {
                notificationsIcon = (
                    <Badge
                        badgeContent={notifications.filter(not => not.read === false).length}
                        color="secondary">
                        <NotificationsIcon />
                    </Badge>
                )
            } else {
                notificationsIcon = <NotificationsIcon />
            }
        } else {
            notificationsIcon = <NotificationsIcon />
        }

        let notificationsMarkup = notifications && notifications.length > 0
            ? (
                notifications.map(not => {
                    const time = dayjs(not.createdAt).fromNow();
                    const iconColor = not.read ? 'primary' : 'secondary'
                    let verb, icon
                    if (not.type === 'like') {
                        verb = 'liked'
                        icon = (<SatisfiedIcon color={iconColor} style={{ marginRight: 10 }} />)
                    } else if (not.type === 'comment') {
                        verb = 'commented on'
                        icon = (<AddCommentIcon color={iconColor} style={{ marginRight: 10 }} />)
                    } else if (not.type ==='reply') {
                        verb = 'replied on'
                        icon = (<AddCommentIcon color={iconColor} style={{ marginRight: 10 }} />)
                    } else if (not.type === 'history'){
                        verb = 'accept(reservation)'
                        icon = (<AccountCircleIcon color={iconColor} style={{ marginRight: 10 }} />)
                    } else {
                        verb = 'reserve'
                        icon = (<AccountCircleIcon color={iconColor} style={{ marginRight: 10 }} />)
                    }

                    return (
                        <MenuItem key={not.createdAt} onClick={this.handleClose}>
                            {icon}
                            <Typography
                                color="default"
                                variant="body1"
                            >
                                {not.sender} {verb} you {time}
                            </Typography>
                        </MenuItem>
                    )
                })
            ) : (
                <MenuItem onClick={this.handleClose}>
                    You have no notifications yet
                </MenuItem>
            )

        return (
            <Fragment>
                <Tooltip placement="top" title="Notifications">
                    <IconButton
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleOpen}
                    >
                        {notificationsIcon}
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened}
                >
                    {notificationsMarkup}
                </Menu>
            </Fragment>
        )
    }
}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    notifications: state.user.notifications,
    type: state.user.credentials.type
})


export default connect(mapStateToProps, { markNotificationsRead })(Notifications)