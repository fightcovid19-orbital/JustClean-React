import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'

// Icons
import SatisfiedIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined'
import SatisfiedTwoTone from '@material-ui/icons/SentimentSatisfiedAltTwoTone'

// Redux stuff
import { connect } from 'react-redux'
import { likeCleaner, cancelLikeCleaner, cancelUnlikeCleaner } from '../../redux/actions/dataActions'

export class LikeButton extends Component {
    likedCleaner = () => {
        if (this.props.user.likes
            && this.props.user.likes.find((like) => like.cleanerName === this.props.cleanerName)) {
            return true;
        } else {
            return false;
        }
    };
    likeCleaner = () => {
        let isUnlike = false;
        if (this.props.user.unlikes && this.props.user.unlikes.find((unlike) => unlike.cleanerName === this.props.cleanerName)) {
            isUnlike = true
        }
        this.props.likeCleaner(this.props.cleanerName, isUnlike)
    };
    cancelLikeCleaner = () => {
        this.props.cancelLikeCleaner(this.props.cleanerName);
    };
    render() {
        const { authenticated, loadingLike } = this.props.user;
        const { loadingDataLike } = this.props;

        let likeButton;

        if (!authenticated) {
            likeButton = (<Link to='/login'>
                <MyButton tip='Like'>
                    <SatisfiedIcon color='primary' />
                </MyButton>
            </Link>)
        } else {
            if (this.likedCleaner()) {
                likeButton = (<MyButton tip='Undo like'
                    onClick={this.cancelLikeCleaner} disabled={loadingDataLike || loadingLike}>
                    <SatisfiedTwoTone color='primary' />
                </MyButton>)
            } else {
                likeButton = (<MyButton tip='Like'
                    onClick={this.likeCleaner} disabled={loadingDataLike || loadingLike}>
                    <SatisfiedIcon color='primary' />
                </MyButton>)
            }
        }

        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    cleanerName: PropTypes.string.isRequired,
    likeCleaner: PropTypes.func.isRequired,
    cancelLikeCleaner: PropTypes.func.isRequired,
    cancelUnlikeCleaner: PropTypes.func.isRequired,
    loadingDataLike: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
    loadingDataLike: state.data.loadingLike
})

const mapActionsToProps = {
    likeCleaner, cancelLikeCleaner, cancelUnlikeCleaner
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)
