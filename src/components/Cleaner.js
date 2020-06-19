import React, { Component } from 'react'
import withStyle from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton'
// import dayjs from 'dayjs'
// import relativeTime from 'dayjs/plugin/relativeTime'

// MUI stuff
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
// Icons
import ChatIcon from '@material-ui/icons/Chat'
import FavouriteIcon from '@material-ui/icons/Favorite'
import FavouriteBorder from '@material-ui/icons/FavoriteBorder'
// Redux
import { connect } from 'react-redux'
import { likeCleaner, cancelLikeCleaner } from '../redux/actions/dataActions'

const style = {
    card: {
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}
// show image, name, location, likecount, unlikecount and hiredcount
class Cleaner extends Component {
    likedCleaner = () => {
        if (this.props.user.likes && this.props.user.likes.find((like) => like.cleanerName === this.props.cleaner.cleanerName))
            // if doens't find one, condition is false
            return true;
        else return false;
    };
    likeCleaner = () => {
        this.props.likeCleaner(this.props.cleaner.cleanerId);
    }
    cancelLikeCleaner = () => {
        this.props.cancelLikeCleaner(this.props.cleaner.cleanerId);
    }

    render() {
        const { classes, cleaner: { imageUrl, cleanerName, likeCount, unlikeCount, hiredCount },
            user: { authenticated } } = this.props
        const likeButton = !authenticated ? (
            <MyButton tip='Like'>
                <Link to='/login'>
                    <FavouriteBorder color='primary' />
                </Link>
            </MyButton>
        ) : (
                this.likedCleaner() ? (
                    <MyButton tip='Undo like' onClick={this.cancelLikeCleaner}>
                        <FavouriteIcon color='primary' />
                    </MyButton>
                ) : (
                        <MyButton tip='Like' onClick={this.likeCleaner}>
                            <FavouriteBorder color='primary' />
                        </MyButton>
                    )
            )
        return (
            <Card className={classes.card}>
                <CardMedia image={imageUrl} title="Profile Image" className={classes.image} />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/cleaners/${cleanerName}`} color='primary'>
                        {cleanerName}
                    </Typography>
                    {likeButton}
                    <span>{likeCount} Likes</span>
                    <MyButton tip='comments'>
                        <ChatIcon color='primary' />
                    </MyButton>
                </CardContent>
            </Card>
        )
    }
}

Cleaner.propTypes = {
    user: PropTypes.object.isRequired,
    likeCleaner: PropTypes.func.isRequired,
    cancelLikeCleaner: PropTypes.func.isRequired,
    cleaner: PropTypes.object.isRequired, // Passed from home, which is the initial cleaner state
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    likeCleaner, cancelLikeCleaner
}
export default connect(mapStateToProps, mapActionsToProps)(withStyle(style)(Cleaner))
