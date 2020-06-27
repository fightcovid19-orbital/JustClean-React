import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import EditDetails from './EditDetails'
import MyButton from '../../util/MyButton'
import DeleteCleaner from './DeleteCleaner'
import SmallLoginAndSignup from './SmallLoginAndSignup'

// Redux stuff
import { connect } from 'react-redux'
import { logoutUser, uploadCleanerImage } from '../../redux/actions/userActions'

// MUI stuff
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

// Icons
import LocationOn from '@material-ui/icons/LocationOn'
import CalendarToday from '@material-ui/icons/CalendarToday'
import EditIcon from '@material-ui/icons/Edit'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
import SatisfiedIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined'
import DissatisfiedIcon from '@material-ui/icons/SentimentDissatisfiedOutlined'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const styles = theme => ({
    ...theme.spreadThis
});

class CleanerProfile extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadCleanerImage(formData);
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
                    cleanerName,
                    createdAt,
                    imageUrl,
                    bio,
                    location,
                    likeCount,
                    unlikeCount,
                    hiredCount
                },
                authenticated
            }
        } = this.props;

        const deleteButton = <DeleteCleaner cleanerName={cleanerName} />

        let cleanerProfileMarkup = authenticated
            ? (
                <Paper className={classes.paper}>
                    {deleteButton}
                    <div className={classes.profile}>
                        <div className="image-wrapper">
                            <hr />
                            <img src={imageUrl} alt="profile" className='profile-image' />
                            <input type='file' id='imageInput' hidden='hidden' onChange={this.handleImageChange} />
                            <MyButton tip='Edit profile picture' onClick={this.handleEditPicture} btnClassName='button'>
                                <EditIcon color='primary' />
                            </MyButton>
                        </div>
                        <hr />
                        <div className="profile-details">
                            <Typography variant="h5">
                                {cleanerName}
                            </Typography>
                            <hr />
                            {bio && <Typography variant="body2"> {bio}</Typography>}
                            <hr />

                            <Fragment>
                                <LocationOn color="primary" />
                                <span>{location}</span>
                                <hr />
                            </Fragment>

                            <Fragment>
                                <CalendarToday color="primary" />
                                {' '}
                                <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                                <hr />
                            </Fragment>

                            <SatisfiedIcon color="primary" /><span>{" " + likeCount + " likes"}</span>
                            <hr />

                            <DissatisfiedIcon color="primary" /><span>{" " + unlikeCount + " unlikes"}</span>
                            <hr />

                            <AccountCircleIcon color="primary" /><span>{" " + hiredCount + " hired"}</span>

                        </div>
                        <MyButton tip='Logout' onClick={this.handleLogout} >
                            <KeyboardReturn color='primary' />
                        </MyButton>
                        <EditDetails />
                    </div>
                </Paper>
            ) : (
                <SmallLoginAndSignup />
            )

        return cleanerProfileMarkup;
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapActionsToProps = { logoutUser, uploadCleanerImage }

CleanerProfile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CleanerProfile))
