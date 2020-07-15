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
        if (this.props.user.likes && this.props.user.likes.find((like) => like.cleanerName === this.props.cleanerName))
            return true;
        else return false;
    };
    likeCleaner = () => {
        if (this.props.user.unlikes && this.props.user.unlikes.find((unlike) => unlike.cleanerName === this.props.cleanerName)) {
            this.props.cancelUnlikeCleaner(this.props.cleanerName)
        }
        this.props.likeCleaner(this.props.cleanerName);
    };
    cancelLikeCleaner = () => {
        this.props.cancelLikeCleaner(this.props.cleanerName);
    };
    render() {
        const { authenticated } = this.props.user;
        const likeButton = !authenticated ? (
            <Link to='/login'>
                <MyButton tip='Like'>
                    <SatisfiedIcon color='primary' />
                </MyButton>
            </Link>
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
        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    cleanerName: PropTypes.string.isRequired,
    likeCleaner: PropTypes.func.isRequired,
    cancelLikeCleaner: PropTypes.func.isRequired,
    cancelUnlikeCleaner: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    likeCleaner, cancelLikeCleaner, cancelUnlikeCleaner
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)
