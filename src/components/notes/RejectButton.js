import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'

// Icons
import ClearIcon from '@material-ui/icons/Clear'

// Redux stuff
import { connect } from 'react-redux'
import { reject } from '../../redux/actions/dataActions'

export class RejectButton extends Component {
    reject = () => {
        this.props.reject(this.props.customerName);
    };

    render() {
        const rejectButton = (
            <MyButton tip='Reject' onClick={this.reject}>
                <ClearIcon color='primary' />
            </MyButton>
        )
            
        return rejectButton;
    }
}

RejectButton.propTypes = {
    user: PropTypes.object.isRequired,
    customerName: PropTypes.string.isRequired,
    reject: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    reject
}

export default connect(mapStateToProps, mapActionsToProps)(RejectButton)
