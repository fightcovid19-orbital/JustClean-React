import React, { Component } from 'react'
import withStyle from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import LikeButton from '../cleanerCard/LikeButton'
import UnlikeButton from '../cleanerCard/UnlikeButton'
import CommentDialog from '../cleanerCard/CommentDialog'
import dayjs from 'dayjs'

// MUI stuff
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

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
class HistoryCard extends Component {

    render() {
        const {
            classes,
            history: { cleanerImage, cleanerName, createdAt, cleanerLocation },
        } = this.props

        return (
            <Card className={classes.card}>
                <img src={cleanerImage} alt="Profile" className={classes.image} />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/cleaners/${cleanerName}`} color='primary'>
                        {cleanerName}
                    </Typography>
                    <Typography variant="body2" color='textSecondary'>
                        {dayjs(createdAt).format('DD MMMM YYYY')}
                    </Typography>
                    <Typography variant="body2">
                        Location: {cleanerLocation}
                    </Typography>
                    <LikeButton cleanerName={cleanerName} />
                    <UnlikeButton cleanerName={cleanerName} />
                    <CommentDialog cleanerName={cleanerName} />
                </CardContent>
            </Card>
        )
    }
}

HistoryCard.propTypes = {
    history: PropTypes.object.isRequired, // Passed from home
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})


export default connect(mapStateToProps)(withStyle(style)(HistoryCard))
