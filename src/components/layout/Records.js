import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import DeleteRecordButton from './DeleteRecordButton'

//Mui
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'

// Icon
import AssignmentIcon from '@material-ui/icons/AssignmentInd'

//Redux
import { connect } from 'react-redux'
import { getRecords } from '../../redux/actions/dataActions';


const styles = theme => ({
    image: {
        width: 100,
        height: 100,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
        margin: 15
    }
})

class Records extends Component {
    state = {
        anchorEl: null
    }

    handleOpen = (event) => {
        this.setState({ anchorEl: event.target });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    }

    onMenuOpened = () => {
        this.props.getRecords();
    }

    render() {
        const records = this.props.records;
        const anchorEl = this.state.anchorEl;
        const { classes, cleanerName } = this.props;

        let assigmentsIcon = (
            <Badge
                badgeContent={records.length}
                color="secondary">
                <AssignmentIcon />
            </Badge>
        )

        let recordsMarkup = records && records.length > 0
            ? (
                records.map(rec => {
                    const location = rec.customerLocation;
                    const customerImage = rec.customerImage;
                    const customerName = rec.customerName;
                    const recordId = cleanerName + ':' + customerName;

                    return (
                        <MenuItem key={customerName} onClick={this.handleClose}>
                            <img src={customerImage} alt="Profile Image" className={classes.image} />
                            <Typography variant="h5" color='primary'>
                                {customerName}
                            </Typography>
                            <Typography variant="body2" >
                                location: {location}
                            </Typography>
                            <DeleteRecordButton recordId={recordId} />
                        </MenuItem>
                    )
                })
            ) : (
                <MenuItem onClick={this.handleClose}>
                    You have no any record
                </MenuItem>
            )

        return (
            <Fragment>
                <Tooltip placement="top" title="Record">
                    <IconButton
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleOpen}
                    >
                        {assigmentsIcon}
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened}
                >
                    {recordsMarkup}
                </Menu>
            </Fragment>
        )
    }
}

Records.propTypes = {
    classes: PropTypes.object.isRequired,
    getRecords: PropTypes.func.isRequired,
    records: PropTypes.array.isRequired,
    cleanerName: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    records: state.user.records,
    cleanerName: state.user.credentials.cleanerName
})


export default connect(mapStateToProps, { getRecords })(withStyles(styles)(Records))