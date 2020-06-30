import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'

// Icons
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined'
import CheckBoxIcon from '@material-ui/icons/CheckBox'

// Redux stuff
import { connect } from 'react-redux'
import { reserve, cancelReserve } from '../../redux/actions/dataActions'

export class ReserveButton extends Component {
    reserved = () => {
        if (this.props.user.reserve && this.props.user.reserve.cleanerName === this.props.cleanerName)
            // if doens't find one, condition is false(need to change)
            return true;
        else return false;
    };
    reserve = () => {
        this.props.reserve(this.props.cleanerName);
    };
    cancelReserve = () => {
        this.props.cancelReserve(this.props.user.credentials.customerName);
    };
    render() {
        const reserveButton = this.reserved() ? (
            <MyButton tip='Cancle reserve' onClick={this.cancelReserve}>
                <CheckBoxIcon color='primary' />
            </MyButton>
        ) : (
                <MyButton tip='Reserve' onClick={this.reserve}>
                    <CheckBoxOutlinedIcon color='primary' />
                </MyButton>
            )
            
        return reserveButton;
    }
}

ReserveButton.propTypes = {
    user: PropTypes.object.isRequired,
    cleanerName: PropTypes.string.isRequired,
    reserve: PropTypes.func.isRequired,
    cancelReserve: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    reserve, cancelReserve
}

export default connect(mapStateToProps, mapActionsToProps)(ReserveButton)
