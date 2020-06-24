import React, { Component } from 'react'
import withStyle from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton'
import CleanerDialog from './CleanerDialog'
import LikeButton from './LikeButton'
import UnlikeButton from './UnlikeButton'

// MUI stuff
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

// Icons
import ChatIcon from '@material-ui/icons/Chat'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

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
        margin: 15
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

// show image, name, location, likecount, unlikecount and hiredcount
class CleanerCard extends Component {

    render() {
        const { classes, cleaner: { imageUrl, cleanerName, likeCount, unlikeCount, hiredCount },
            user: { authenticated } } = this.props

        return (
            <Card className={classes.card}>
                <img src={imageUrl} title="Profile Image" className={classes.image} />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/cleaners/${cleanerName}`} color='primary'>
                        {cleanerName}
                    </Typography>
                    <br />
                    <LikeButton cleanerName={cleanerName} />
                    <span>{likeCount} Likes</span>
                    <UnlikeButton cleanerName={cleanerName} />
                    <span>{unlikeCount} Unlikes</span>
                    <MyButton tip="Number of times being hired">
                        <AccountCircleIcon color="primary" />
                    </MyButton>
                    <span>{hiredCount} Hired</span>
                    <MyButton tip='comments'>
                        <ChatIcon color='primary' />
                    </MyButton>
                    <CleanerDialog cleanerName={cleanerName} />
                </CardContent>
            </Card>
        )
    }
}

CleanerCard.propTypes = {
    cleaner: PropTypes.object.isRequired, // Passed from home
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})


export default connect(mapStateToProps)(withStyle(style)(CleanerCard))
