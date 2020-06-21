import React, { Component } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20
    },
    image: {
        width: 100,
        height: 100,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
        margin:15
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
};

class Comment extends Component {
    render() {
        dayjs.extend(relativeTime);
        const { classes, comment : {body, createdAt, userImage, userHandle} } = this.props;
        return (
            <Card className={classes.card}>
                <img src={userImage} title={"Profile image"} className={classes.image}/>
                <CardContent class={classes.content}>
                    <Typography varient="h5">
                        {userHandle}
                    </Typography>

                    <Typography varient="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>

                    <Typography varient="body1">
                        {body}
                    </Typography>

                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Comment)
