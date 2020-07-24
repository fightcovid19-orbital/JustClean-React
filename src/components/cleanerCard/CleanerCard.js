import React, { Component } from 'react'
import withStyle from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
import CleanerDialog from './CleanerDialog'
import LikeButton from './LikeButton'
import UnlikeButton from './UnlikeButton'
import CommentDialog from './CommentDialog'
import ReserveButton from '../notes/ReserveButton'
import ChatDialog from '../chat/ChatDialog'

// MUI stuff
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

// Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ChatIcon from '@material-ui/icons/Chat'

// Redux
import { connect } from 'react-redux'


const style = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image: {
        width: 100,
        height: 100,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
        marginLeft: 15,
        marginTop: 15,
    },
    content: {
        paddingTop: 25,
        objectFit: 'cover'
    },
    cleanerName: {
        padding: 15,
    },
    gridCenter: {
        textAlign: 'center'
    }, 
    location: {
        marginLeft: 15
    }
}

// show image, name, location, likecount, unlikecount and hiredcount
class CleanerCard extends Component {

    render() {
        const {
            classes,
            cleaner: { imageUrl, cleanerName, likeCount, unlikeCount, hiredCount, location },
        } = this.props

        return (

            <Card className={classes.card}>
                <Grid container justify='flex-start' alignItems='center'>
                    <Grid item xs={12} sm={2} className={classes.gridCenter}>
                        <img src={imageUrl} alt="Profile" className={classes.image} />
                    </Grid>
                    <Grid item xs={12} sm={10} >
                        <CardContent className={classes.content}>
                            <Typography variant="h5" component={Link} to={`/cleaners/${cleanerName}`} color='primary' className={classes.cleanerName}>
                                {cleanerName}
                            </Typography>
                            <br />
                            <Typography variant="body1" className={classes.location}>
                                Location: {location}
                            </Typography>
                            <Grid container >
                                <Grid item lg={6} sm={12} xs={12}>
                                    <LikeButton cleanerName={cleanerName} />
                                    <span>{likeCount} Likes</span>
                                    <UnlikeButton cleanerName={cleanerName} />
                                    <span>{unlikeCount} Unlikes</span>
                                    <MyButton tip="Number of times being hired">
                                        <AccountCircleIcon color="primary" />
                                    </MyButton>
                                    <span>{hiredCount} Hired</span>
                                </Grid>
                                <Grid item lg={4} sm={8} xs={8}>
                                    <CommentDialog cleanerName={cleanerName} />
                                    <ReserveButton cleanerName={cleanerName} />
                                    <ChatDialog friendName={cleanerName}>
                                        <ChatIcon color='primary' />
                                    </ChatDialog>
                                </Grid>
                                <Grid item lg={1} sm={2} xs={2}>
                                    <CleanerDialog cleanerName={cleanerName} />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Grid>

                </Grid>

            </Card>


        )
    }
}

CleanerCard.propTypes = {
    cleaner: PropTypes.object.isRequired, // Passed from home
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})


export default connect(mapStateToProps)(withStyle(style)(CleanerCard))
