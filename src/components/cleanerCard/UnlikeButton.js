import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'

// Icons
import DissatisfiedIcon from '@material-ui/icons/SentimentDissatisfiedOutlined'
import DissatisfiedTwoTone from '@material-ui/icons/SentimentDissatisfiedTwoTone'

// Redux stuff
import { connect } from 'react-redux'
import { unlikeCleaner, cancelUnlikeCleaner, cancelLikeCleaner } from '../../redux/actions/dataActions'

export class UnlikeButton extends Component {
    unlikedCleaner = () => {
        if (this.props.user.unlikes && this.props.user.unlikes.find((unlike) => unlike.cleanerName === this.props.cleanerName))
            return true;
        else return false;
    };
    unlikeCleaner = () => {
        let isLike = false;
        if (this.props.user.likes && this.props.user.likes.find((like) => like.cleanerName === this.props.cleanerName)) {
            isLike = true;
        }
        this.props.unlikeCleaner(this.props.cleanerName, isLike);
    }
    cancelUnlikeCleaner = () => {
        this.props.cancelUnlikeCleaner(this.props.cleanerName);
    }
    render() {
        const { authenticated, loadingLike } = this.props.user;
        const { loadingDataLike } = this.props;


        let unlikeButton;

        if (!authenticated) {
            unlikeButton = (<Link to='/login'>
                <MyButton tip='Like'>
                    <DissatisfiedIcon color='primary' />
                </MyButton>
            </Link>)
        } else {
            if (this.unlikedCleaner()) {
                unlikeButton = (<MyButton tip='Undo unlike'
                    onClick={this.cancelUnlikeCleaner} disabled={loadingDataLike || loadingLike}>
                    <DissatisfiedTwoTone color='primary' />
                </MyButton>)
            } else {
                unlikeButton = (<MyButton tip='Unlike'
                    onClick={this.unlikeCleaner} disabled={loadingDataLike || loadingLike}>
                    <DissatisfiedIcon color='primary' />
                </MyButton>)
            }
        }

        return unlikeButton;
    }
}

UnlikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    cleanerName: PropTypes.string.isRequired,
    unlikeCleaner: PropTypes.func.isRequired,
    cancelUnlikeCleaner: PropTypes.func.isRequired,
    cancelLikeCleaner: PropTypes.func.isRequired,
    loadingDataLike: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    loadingDataLike: state.data.loadingLike
})

const mapActionsToProps = {
    unlikeCleaner, cancelUnlikeCleaner, cancelLikeCleaner
}

export default connect(mapStateToProps, mapActionsToProps)(UnlikeButton)
