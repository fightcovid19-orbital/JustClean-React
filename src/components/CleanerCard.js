import React, { Component } from 'react'
import withStyle from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton'

// MUI stuff
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

// Icons
import ChatIcon from '@material-ui/icons/Chat'
import SatisfiedIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined'
import SatisfiedTwoTone from '@material-ui/icons/SentimentSatisfiedAltTwoTone'
import DissatisfiedIcon from '@material-ui/icons/SentimentDissatisfiedOutlined'
import DissatisfiedTwoTone from '@material-ui/icons/SentimentDissatisfiedTwoTone'

// Redux
import { connect } from 'react-redux'
import { likeCleaner, cancelLikeCleaner, unlikeCleaner, cancelUnlikeCleaner } from '../redux/actions/dataActions'

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
    likedCleaner = () => {
        if (this.props.user.likes && this.props.user.likes.find((like) => like.cleanerName === this.props.cleaner.cleanerName))
            // if doens't find one, condition is false
            return true;
        else return false;
    };
    likeCleaner = () => {
        this.props.likeCleaner(this.props.cleaner.cleanerName);
    }
    cancelLikeCleaner = () => {
        this.props.cancelLikeCleaner(this.props.cleaner.cleanerName);
    }

    unlikedCleaner = () => {
        if (this.props.user.unlikes && this.props.user.unlikes.find((unlike) => unlike.cleanerName === this.props.cleaner.cleanerName))
            // if doens't find one, condition is false
            return true;
        else return false;
    };
    unlikeCleaner = () => {
        this.props.unlikeCleaner(this.props.cleaner.cleanerName);
    }
    cancelUnlikeCleaner = () => {
        this.props.cancelUnlikeCleaner(this.props.cleaner.cleanerName);
    }

    render() {
        const { classes, cleaner: { imageUrl, cleanerName, likeCount, unlikeCount, hiredCount },
            user: { authenticated } } = this.props
        const likeButton = !authenticated ? (
            <MyButton tip='Like'>
                <Link to='/login'>
                    <SatisfiedIcon color='primary' />
                </Link>
            </MyButton>
        ) : (
            this.likedCleaner() ? (
                <MyButton tip='Undo like' onClick={this.cancelLikeCleaner}>
                    <SatisfiedTwoTone color='primary' />
                </MyButton>
            ) : (
                    <MyButton tip='Like' onClick={this.likeCleaner}>
                        <SatisfiedIcon color='primary' />
                    </MyButton>
                )
            )
        
        const unlikeButton = !authenticated ? (
                <MyButton tip='Unlike'>
                    <Link to='/login'>
                        <DissatisfiedIcon color='primary' />
                    </Link>
                </MyButton>
            ) : (
                this.unlikedCleaner() ? (
                    <MyButton tip='Undo unlike' onClick={this.cancelUnlikeCleaner}>
                        <DissatisfiedTwoTone color='primary' />
                    </MyButton>
                ) : (
                        <MyButton tip='Unlike' onClick={this.unlikeCleaner}>
                            <DissatisfiedIcon color='primary' />
                        </MyButton>
                    )
            )
        
        return (
            <Card className={classes.card}>
                <img src={imageUrl} title="Profile Image" className={classes.image} />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/cleaners/${cleanerName}`} color='primary'>
                        {cleanerName}
                    </Typography>
                    <br />
                    {likeButton}
                    <span>{likeCount} Likes</span>
                    {unlikeButton}
                    <span>{unlikeCount} Unlikes</span>
                    <MyButton tip='comments'>
                        <ChatIcon color='primary' />
                    </MyButton>
                </CardContent>
            </Card>
        )
    }
}

CleanerCard.propTypes = {
    user: PropTypes.object.isRequired,
    likeCleaner: PropTypes.func.isRequired,
    cancelLikeCleaner: PropTypes.func.isRequired,
    unlikeCleaner: PropTypes.func.isRequired,
    cancelUnlikeCleaner: PropTypes.func.isRequired,
    cleaner: PropTypes.object.isRequired, // Passed from home, which is the initial cleaner state
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    likeCleaner, cancelLikeCleaner, unlikeCleaner, cancelUnlikeCleaner
}
export default connect(mapStateToProps, mapActionsToProps)(withStyle(style)(CleanerCard))
