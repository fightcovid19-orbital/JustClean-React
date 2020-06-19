import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles'
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

//Mui
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

//Icon
import LocationOn from '@material-ui/icons/LocationOn';
import CalendarToday from '@material-ui/icons/CalendarToday';
import FavouriteBorder from '@material-ui/icons/FavoriteBorder';

//Redux
import { connect } from 'react-redux';

const styles = theme => ({
    paper: {
        padding: 20,
        marginRight: '20px'
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    }
});

class CleanerProfile extends Component {
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
                loading,
                authenticated
            }
        } = this.props;

        let cleanerProfileMarkup = !loading 
            ? (authenticated
                ? (
                    <Paper className={classes.paper}>
                        <div className={classes.profile}>
                            <div className="image-wrapper">
                                <img src={imageUrl} alt="profile" className='profile-image'/>
                            </div>
                        </div>
                        <hr/>
                        <div className="profile-details">
                            <Typography varient="body1">
                                {cleanerName}
                            </Typography>
                            <hr/>
                            {bio && <Typography varient="body 2"> {bio}</Typography>}
                            <hr/>
                            <Fragment>
                                <LocationOn color="primary"/> 
                                <span>{location}</span>
                                <hr/>
                            </Fragment>
                            <Fragment>
                                <CalendarToday color="primary"/>
                                {' '}
                                <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                                <hr/>
                            </Fragment>
                            <Fragment>
                                <span>{hiredCount}</span>
                                <hr/>
                            </Fragment>
                            <Fragment>
                                <FavouriteBorder color="primary"/><span>{likeCount}</span>
                                <span>{unlikeCount}</span>
                            </Fragment>
                        </div>
                    </Paper>
                ) : (
                    <Paper className={classes.paper}>
                        <Typography varient = "body2" align="center">
                            No profile found, please login again
                        </Typography>
                        <div className={classes.buttons}>
                            <Button variant='contained' color='primary' component={Link} to='/login'>
                                Login 
                            </Button>
                            <Button variant='contained' color='secondary' component={Link} to='/signup'>
                                Signup 
                            </Button>
                        </div>
                    </Paper>
                )) : (<p>loading...</p>)

        return cleanerProfileMarkup;
    }
}

const mapStateToProps = state => ({
    user: state.user
});

CleanerProfile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(CleanerProfile))
