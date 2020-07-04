import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'

// Icons
import ClearIcon from '@material-ui/icons/Clear'

// Redux stuff
import { connect } from 'react-redux'
import { deleteRecord } from '../../redux/actions/dataActions'

export class DeleteRecordButton extends Component {
    deleteRecord = () => {
        this.props.deleteRecord(this.props.recordId);
    };

    render() {
        const deleteButton = (
            <MyButton tip='delete' onClick={this.deleteRecord}>
                <ClearIcon color='primary' />
            </MyButton>
        )
            
        return deleteButton;
    }
}

DeleteRecordButton.propTypes = {
    recordId: PropTypes.string.isRequired,
    deleteRecord: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    
})

const mapActionsToProps = {
    deleteRecord
}

export default connect(mapStateToProps, mapActionsToProps)(DeleteRecordButton)
