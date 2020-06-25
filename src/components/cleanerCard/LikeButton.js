import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'

// Icons
import SatisfiedIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined'
import SatisfiedTwoTone from '@material-ui/icons/SentimentSatisfiedAltTwoTone'

// Redux stuff
import { connect } from 'react-redux'
import { likeCleaner, cancelLikeCleaner } from '../../redux/actions/dataActions'

export class LikeButton extends Component {
    likedCleaner = () => {
        if (this.props.user.likes && this.props.user.likes.find((like) => like.cleanerName === this.props.cleanerName))
            // if doens't find one, condition is false
            return true;
        else return false;
    };
    likeCleaner = () => {
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
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    likeCleaner, cancelLikeCleaner
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)
