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
        if (this.props.user.likes && this.props.user.likes.find((like) => like.cleanerName === this.props.cleanerName)) {
            this.props.cancelLikeCleaner(this.props.cleanerName)
        }
        this.props.unlikeCleaner(this.props.cleanerName);
    }
    cancelUnlikeCleaner = () => {
        this.props.cancelUnlikeCleaner(this.props.cleanerName);
    }
    render() {
        const { authenticated } = this.props.user;
        const unlikeButton = !authenticated ? (
            <Link to='/login'>
                <MyButton tip='Unlike'>
                    <DissatisfiedIcon color='primary' />
                </MyButton>
            </Link>
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
        return unlikeButton;
    }
}

UnlikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    cleanerName: PropTypes.string.isRequired,
    unlikeCleaner: PropTypes.func.isRequired,
    cancelUnlikeCleaner: PropTypes.func.isRequired,
    cancelLikeCleaner: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    unlikeCleaner, cancelUnlikeCleaner, cancelLikeCleaner
}

export default connect(mapStateToProps, mapActionsToProps)(UnlikeButton)
