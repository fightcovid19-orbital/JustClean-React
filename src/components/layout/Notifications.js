import  React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
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
import ChatIcon from '@material-ui/icons/Chat'

//Redux
import { connect } from 'react-redux'
import { markNotificationsRead } from '../../redux/actions/userActions';

class Notifications extends Component {
    state = {
        anchoeE1: null
    }

    handleOpen = (event) => {
        this.setState({ anchorE1: event.target });
    }

    handleClose = (event) => {
        this.setState({ anchorE1: null });
    }

    onMenuOpened = () => {
        let unreadNotificationsIds = this.props.notifications
            .filter(not => !not.read)
            .map(not => not.notificationId)
        this.props.markNotificationsRead(unreadNotificationsIds)
    }

    render() {
        const notifications = this.props.notifications;
        const anchorE1 = this.state.anchoeE1;

        dayjs.extend(relativeTime)
        
        let notificationIcon;
        if(notifications && notifications.length > 0) {
            notifications.filter(not => not.read === false).length > 0
                ? notificationIcon = (
                    <Badge
                        badgeContent = {notifications.filter(not => not.read === false).length}
                        color="secondary">
                            <NotificationsIcon />
                        </Badge>
                ) : (
                    notificationIcon = <NotificationsIcon />
                )
        } else {
            notificationIcon = <NotificationsIcon />
        }

        let notificationsMarkup = notifications && notifications.length > 0
            ? (
                notifications.map(not => {
                    const verb = not.type === 'like' ? 'liked' : 'replied on'
                    const time = dayjs(not.createdAt).fromNow();
                    const iconColor = not.read ? "primary" : "secondary"
                    const icon = not.type === 'like' 
                        ? (<SatisfiedIcon color={iconColor} style={{marginRight: 10}}/>)
                        : (<ChatIcon color={iconColor} style={{marginRight: 10}}/>)

                    return (
                        <MenuItem key={not.createdAt} onClick={this.handleClose}>
                            {icon}
                            <Typography 
                                color="default"
                                varient="body1"
                            >
                                {not.sender} {verb} {time}
                            </Typography>
                        </MenuItem>
                    )
                })
            ) : (
                <MenuItem onClick={this.handleClose}>
                    You have no notifications
                </MenuItem>
            )

        return (
            <Fragment>
                <Tooltip placement="top" title="Notifications">
                    <IconButton 
                        aria-owns={anchorE1 ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleOpen}
                    >
                        {notificationIcon}
                    </IconButton>
                </Tooltip>
                <Menu 
                    anchorE1={anchorE1}
                    open={Boolean(anchorE1)}
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
    notifications: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    notifications: state.user.notifications
})


export default connect(mapStateToProps, { markNotificationsRead })(Notifications)