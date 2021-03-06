import React, { Component } from 'react'
import withStyle from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import AcceptButton from './AcceptButton'
import RejectButton from './RejectButton'
import ChatDialog from '../chat/ChatDialog'

// MUI stuff
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

// Icon
import ChatIcon from '@material-ui/icons/Chat'

// Redux
import { connect } from 'react-redux'

const style = {
    card: {
        display: 'flex',
        marginBottom: 20
    },
    image: {
        width: 100,
        height: 100,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
        marginLeft: 15,
        marginTop: 30
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

// show image, name, location, likecount, unlikecount and hiredcount
class ReserveCard extends Component {

    render() {
        const {
            classes,
            reserve: { customerImage, customerName, createdAt, customerLocation },
        } = this.props

        return (
            <Card className={classes.card}>
                <img src={customerImage} alt="Profile" className={classes.image} />
                <CardContent className={classes.content}>
                    <Typography variant="h5" color='primary'>
                        {customerName}
                    </Typography>
                    <Typography variant="body2" color='textSecondary'>
                        {dayjs(createdAt).format('DD MMMM YYYY')}
                    </Typography>
                    <Typography variant="body2" >
                        location: {customerLocation}
                    </Typography>
                    <AcceptButton customerName={customerName} />
                    <RejectButton customerName={customerName} />
                    <ChatDialog friendName={customerName} >
                        <ChatIcon color='primary' />
                    </ChatDialog>
                </CardContent>
            </Card>
        )
    }
}

ReserveCard.propTypes = {
    reserve: PropTypes.object.isRequired, // Passed from home
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})


export default connect(mapStateToProps)(withStyle(style)(ReserveCard))
