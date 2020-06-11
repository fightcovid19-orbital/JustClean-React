import React, { Component } from 'react'
import withStyle from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
// import dayjs from 'dayjs'
// import relativeTime from 'dayjs/plugin/relativeTime'

// MUI stuff
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const style = {
    card: {
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

class Cleaner extends Component {
    render() {

        const { classes, cleaner: { imageUrl, cleanerName, likeCount, unlikeCount, hiredCount } } = this.props
        return (
            <Card className={classes.card}>
                <CardMedia image={imageUrl} title="Profile Image" className={classes.image} />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/cleaners/${cleanerName}`} color='primary'>
                        {cleanerName}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyle(style)(Cleaner)
