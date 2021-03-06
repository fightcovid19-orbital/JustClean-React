import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import dayjs from 'dayjs'
import EditDetails from './EditDetails'
import MyButton from '../../util/MyButton'
import SmallLoginAndSignup from './SmallLoginAndSignup'

// Redux stuff
import { connect } from 'react-redux'
import { logoutUser, uploadCustomerImage } from '../../redux/actions/userActions'

// MUI stuff
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

// Icons
import LocationOn from '@material-ui/icons/LocationOn'
import CalendarToday from '@material-ui/icons/CalendarToday'
import EditIcon from '@material-ui/icons/Edit'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'

const styles = theme => ({
    ...theme.spreadThis
})

class CustomerProfile extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadCustomerImage(formData);
    }

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }

    handleLogout = () => {
        this.props.logoutUser();
    }

    render() {
        const {
            classes,
            user: {
                credentials: {
                    customerName,
                    createdAt,
                    imageUrl,
                    bio,
                    location,
                },
                authenticated
            }
        } = this.props;

        let profileMarkup = authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className='profile-image' />
                        <input type='file' id='imageInput' hidden='hidden' onChange={this.handleImageChange} />
                        <MyButton tip='Edit profile picture' onClick={this.handleEditPicture} btnClassName='button'>
                            <EditIcon color='primary' />
                        </MyButton>
                    </div>
                    <hr />
                    <div className="profile-details">
                        <Typography variant='h5'>
                            {customerName}
                        </Typography>
                        <hr />
                        {bio && <Typography variant='body1'>{bio}</Typography>}
                        <hr />
                        {location && (<Fragment>
                            <LocationOn color='primary' /> <span>{location}</span>
                            <hr />
                        </Fragment>)
                        }
                        <CalendarToday color='primary' />{' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>
                    <MyButton tip='Logout' onClick={this.handleLogout} >
                        <KeyboardReturn color='primary' />
                    </MyButton>
                    <EditDetails />
                </div>
            </Paper >
        ) : (
                <SmallLoginAndSignup />
            )
        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = { logoutUser, uploadCustomerImage }

CustomerProfile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadCustomerImage: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CustomerProfile))
