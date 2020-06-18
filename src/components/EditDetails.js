import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../util/MyButton';
// Redux
import { connect } from 'react-redux'
import { editUserDetails } from '../redux/actions/userActions'
// MUI stuff
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// Icons
import EditIcon from '@material-ui/icons/Edit'

const styles = (theme) => ({
    ...theme.spreadThis,
    button: {
        float: 'right'
    }
})

class EditDetails extends Component {
    state = {
        bio: '',
        location: '',
        open: false
    }
    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            location: credentials.location ? credentials.location : '',
        })
    }
    handleOpen = () => {
        this.setState({ open: true })
        this.mapUserDetailsToState(this.props.credentials);
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            location: this.state.location,
            website: this.state.website
        }
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }
    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <MyButton tip='Edit details' onClick={this.handleOpen} btnClassName={classes.button}>
                    <EditIcon color='primary' />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField name='bio' type='text' label='Bio' multiline row='3'
                                placeholder='A short bio about yourself' className={classes.textField}
                                value={this.state.bio} onChange={this.handleChange} fullWidth />
                            <TextField name='location' type='text' label='Location'
                                placeholder='Where you live' className={classes.textField}
                                value={this.state.location} onChange={this.handleChange} fullWidth />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='primary'>
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color='primary'>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

EditDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    editUserDetails: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
